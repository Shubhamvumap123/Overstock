
const authController = require('../src/controllers/auth.controller');
const User = require('../src/models/user.model');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/user.model');
jest.mock('jsonwebtoken');

describe('Auth Controller - Password Validation', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('register', () => {
        beforeEach(() => {
             // Default mock behavior for successful user creation if validation passes
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                _id: '123',
                email: 'test@example.com',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            jwt.sign.mockReturnValue('token');
        });

        it('should fail if password is less than 8 characters', async () => {
            req.body = { email: 'test@example.com', password: 'Short1!' };
            await authController.register(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: expect.stringContaining('Password must be at least 8 characters') }));
        });

        it('should fail if password misses uppercase', async () => {
            req.body = { email: 'test@example.com', password: 'lowercase1!' };
            await authController.register(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: expect.stringContaining('one uppercase') }));
        });

        it('should fail if password misses lowercase', async () => {
            req.body = { email: 'test@example.com', password: 'UPPERCASE1!' };
            await authController.register(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: expect.stringContaining('one lowercase') }));
        });

        it('should fail if password misses number', async () => {
            req.body = { email: 'test@example.com', password: 'NoNumber!' };
            await authController.register(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: expect.stringContaining('one number') }));
        });

        it('should fail if password misses special character', async () => {
            req.body = { email: 'test@example.com', password: 'NoSpecialChar1' };
            await authController.register(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: expect.stringContaining('one special character') }));
        });

        it('should succeed with a strong password', async () => {
            req.body = { email: 'test@example.com', password: 'StrongPassword1!' };
            await authController.register(req, res);
            expect(res.statusCode).toBe(200);
            expect(User.create).toHaveBeenCalled();
        });
    });
});
