const authController = require('../src/controllers/auth.controller');
const User = require('../src/models/user.model');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/user.model');
jest.mock('jsonwebtoken');

describe('Auth Controller - Validation', () => {
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

    describe('register validation', () => {
        it('should return error for invalid email format', async () => {
            req.body = { email: 'invalid-email', password: 'Password1!' };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Invalid email format' }));
        });

        it('should return error for password too short', async () => {
            req.body = { email: 'test@example.com', password: 'Pass1!' }; // 6 chars
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Password must be at least 8 characters long' }));
        });

        it('should return error for password missing uppercase', async () => {
            req.body = { email: 'test@example.com', password: 'password1!' };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Password must contain at least one uppercase letter' }));
        });

        it('should return error for password missing lowercase', async () => {
            req.body = { email: 'test@example.com', password: 'PASSWORD1!' };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Password must contain at least one lowercase letter' }));
        });

        it('should return error for password missing number', async () => {
            req.body = { email: 'test@example.com', password: 'Password!' };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Password must contain at least one number' }));
        });

        it('should return error for password missing special char', async () => {
            req.body = { email: 'test@example.com', password: 'Password1' };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Password must contain at least one special character' }));
        });

        it('should register successfully with valid email and strong password', async () => {
             req.body = { email: 'test@example.com', password: 'Password1!' };
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

            expect(res.statusCode).toBe(200);
        });
    });
});
