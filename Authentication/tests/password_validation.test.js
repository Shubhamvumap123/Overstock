
const authController = require('../src/controllers/auth.controller');
const User = require('../src/models/user.model');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/user.model');
jest.mock('jsonwebtoken');

describe('Auth Controller - Password Policy', () => {
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
        it('should REJECT weak passwords (too short)', async () => {
            req.body = {
                email: 'weak@example.com',
                password: 'short'
            };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({
                message: expect.stringMatching(/password/i)
            }));
            expect(User.create).not.toHaveBeenCalled();
        });

        it('should REJECT passwords without uppercase letters', async () => {
            req.body = {
                email: 'weak@example.com',
                password: 'password123!'
            };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({
                message: expect.stringMatching(/password/i)
            }));
            expect(User.create).not.toHaveBeenCalled();
        });

        it('should REJECT passwords without numbers', async () => {
            req.body = {
                email: 'weak@example.com',
                password: 'Password!'
            };
            User.findOne.mockResolvedValue(null);

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({
                message: expect.stringMatching(/password/i)
            }));
            expect(User.create).not.toHaveBeenCalled();
        });

        it('should ACCEPT strong passwords', async () => {
            req.body = {
                email: 'strong@example.com',
                password: 'StrongPassword123!'
            };
            User.findOne.mockResolvedValue(null);

            const mockUser = {
                _id: '123',
                email: 'strong@example.com',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            User.create.mockResolvedValue(mockUser);
            jwt.sign.mockReturnValue('token');

            await authController.register(req, res);

            expect(res.statusCode).toBe(200);
            expect(User.create).toHaveBeenCalled();
        });
    });
});
