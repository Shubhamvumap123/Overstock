const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const User = require('../models/User');
const Job = require('../models/Job');

let mongoServer;
let token;
let user;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Job.deleteMany({});

  // Register a user and get token
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Job Tester',
      email: 'jobtester@example.com',
      password: 'password123'
    });

  token = res.body.token;
  user = res.body;
});

describe('Jobs API', () => {
  const jobData = {
    company: 'Tech Corp',
    position: 'Software Engineer',
    status: 'Applied'
  };

  describe('POST /api/jobs', () => {
    it('should create a new job successfully when authenticated', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(jobData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.company).toEqual(jobData.company);
      expect(res.body.position).toEqual(jobData.position);
      expect(res.body.status).toEqual(jobData.status);
      expect(res.body.user).toEqual(user._id);
    });

    it('should not create a job without authentication', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .send(jobData);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Not authorized, no token');
    });
  });

  describe('GET /api/jobs', () => {
    it('should get all jobs for the authenticated user', async () => {
      // Create a job first
      await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(jobData);

      const res = await request(app)
        .get('/api/jobs')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
      expect(res.body[0].company).toEqual(jobData.company);
    });
  });

  describe('PUT /api/jobs/:id', () => {
    it('should update a job successfully when authenticated and authorized', async () => {
      // Create a job first
      const createRes = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(jobData);

      const jobId = createRes.body._id;
      const updatedData = { ...jobData, status: 'Interview' };

      const res = await request(app)
        .put(`/api/jobs/${jobId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData);

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('Interview');
    });

    it('should not update a job that belongs to another user', async () => {
      // Create a job for the first user
      const createRes = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(jobData);

      const jobId = createRes.body._id;

      // Register a second user
      const secondUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Hacker',
          email: 'hacker@example.com',
          password: 'password123'
        });

      const secondToken = secondUserRes.body.token;

      // Attempt to update the first user's job with the second user's token
      const res = await request(app)
        .put(`/api/jobs/${jobId}`)
        .set('Authorization', `Bearer ${secondToken}`)
        .send({ status: 'Offer' });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'User not authorized');
    });
  });

  describe('DELETE /api/jobs/:id', () => {
    it('should delete a job successfully when authenticated and authorized', async () => {
      // Create a job first
      const createRes = await request(app)
        .post('/api/jobs')
        .set('Authorization', `Bearer ${token}`)
        .send(jobData);

      const jobId = createRes.body._id;

      const res = await request(app)
        .delete(`/api/jobs/${jobId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Job removed');
    });

    it('should return 404 for a non-existent job', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/jobs/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Job not found');
    });
  });
});
