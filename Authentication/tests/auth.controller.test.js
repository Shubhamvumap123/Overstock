const httpMocks = require('node-mocks-http');

// Mock bcrypt and mongoose before requiring models/controllers
jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn()
}));

jest.mock('mongoose', () => {
    const mSchema = class Schema {
        constructor() {}
        pre() {}
        methods = {}
    };
    return {
        Schema: mSchema,
        model: jest.fn(),
        connect: jest.fn()
    };
});

jest.mock('../src/models/user.model', () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));

const { register, login } = require('../src/controllers/auth.controller');
const User = require('../src/models/user.model');

// Mock jwt to avoid process.env.SECRET_KEY issues
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mock_token')
}));

describe('Auth Controller Security Verification', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should PREVENT mass assignment', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'password123',
                isAdmin: true // Malicious field
            };

            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                _id: 'user_id',
                email: 'test@example.com',
                password: 'hashed_password',
                isAdmin: false // DB would just store what we tell it, but we check call arguments
            });

            await register(req, res);

            // Verify User.create called ONLY with email and password
            expect(User.create).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
            // Verify malicious field was NOT passed
            expect(User.create.mock.calls[0][0]).not.toHaveProperty('isAdmin');
        });

        it('should NOT expose password hash in response', async () => {
             req.body = {
                email: 'test@example.com',
                password: 'password123'
            };

            const mockUser = {
                _id: 'user_id',
                email: 'test@example.com',
                password: 'hashed_password'
            };

            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(mockUser);

            await register(req, res);

            const data = res._getData();
            // Verify Password Not Exposed
            expect(data.user).not.toHaveProperty('password');
            expect(data.user).toHaveProperty('email', 'test@example.com');
        });
    });

    describe('login', () => {
        it('should use generic error message for invalid email', async () => {
            req.body = { email: 'nonexistent@example.com', password: 'password' };
            User.findOne.mockResolvedValue(null);

            await login(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData().message).toBe("Invalid email or password");
        });

         it('should use generic error message for invalid password', async () => {
            req.body = { email: 'exists@example.com', password: 'wrongpassword' };
            const mockUser = {
                checkPassword: jest.fn().mockResolvedValue(false)
            };
            User.findOne.mockResolvedValue(mockUser);

            await login(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData().message).toBe("Invalid email or password");
        });

        it('should NOT expose password hash in response upon success', async () => {
             req.body = { email: 'exists@example.com', password: 'correctpassword' };
            const mockUser = {
                _id: 'user_id',
                email: 'exists@example.com',
                password: 'hashed_password',
                checkPassword: jest.fn().mockResolvedValue(true)
            };
            User.findOne.mockResolvedValue(mockUser);

            await login(req, res);

             const data = res._getData();
            // Verify Password Not Exposed
            expect(data.user).not.toHaveProperty('password');
            expect(data.user).toHaveProperty('email', 'exists@example.com');
        });
    });
});
