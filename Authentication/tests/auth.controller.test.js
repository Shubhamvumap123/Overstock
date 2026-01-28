
const authController = require('../src/controllers/auth.controller');
const User = require('../src/models/user.model');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/user.model');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
        // Mock console.error to avoid cluttering test output
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('register', () => {
        it('should create user with ONLY allowed fields (Mass Assignment Fix)', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'password123',
                isAdmin: true, // Malicious field
                role: 'superuser' // Malicious field
            };

            User.findOne.mockResolvedValue(null);
            const mockUser = {
                _id: '123',
                email: 'test@example.com',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            User.create.mockResolvedValue(mockUser);
            jwt.sign.mockReturnValue('token');

            await authController.register(req, res);

            // Expect User.create to be called with ONLY email and password
            expect(User.create).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });

            // Should not contain malicious fields
            const createCallArgs = User.create.mock.calls[0][0];
            expect(createCallArgs).not.toHaveProperty('isAdmin');
            expect(createCallArgs).not.toHaveProperty('role');
        });
    });

    describe('login', () => {
        it('should return GENERIC error for non-existent user (Enumeration Fix)', async () => {
            req.body = { email: 'nonexistent@example.com', password: 'password' };
            User.findOne.mockResolvedValue(null);

            await authController.login(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Invalid email or password' }));
        });

        it('should return GENERIC error for wrong password (Enumeration Fix)', async () => {
            req.body = { email: 'existing@example.com', password: 'wrongpassword' };
            const mockUser = {
                checkPassword: jest.fn().mockResolvedValue(false)
            };
            User.findOne.mockResolvedValue(mockUser);

            await authController.login(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Invalid email or password' }));
        });
    });
});
