
// Mock bcrypt before any requires
jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn()
}));

// Mock mongoose user model
jest.mock('../src/models/user.model');
jest.mock('jsonwebtoken');

const { register } = require('../src/controllers/auth.controller');
const User = require('../src/models/user.model');
const jwt = require('jsonwebtoken');


describe('Auth Controller - Register', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        User.findOne.mockResolvedValue(null); // User does not exist
        User.create.mockResolvedValue({ _id: '123', email: 'test@example.com' });
        jwt.sign.mockReturnValue('fake-token');
        jest.clearAllMocks();
    });

    test('should reject weak password', async () => {
        req.body = {
            email: 'test@example.com',
            password: '123'
        };

        await register(req, res);

        expect(User.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
             message: expect.stringContaining('Password must be at least 8 characters long')
        }));
    });

    test('should create user with strong password', async () => {
        req.body = {
            email: 'test@example.com',
            password: 'StrongPassword1!'
        };

        await register(req, res);

        expect(User.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(jwt.sign).toHaveBeenCalled();
    });

    test('should prevent mass assignment', async () => {
        req.body = {
            email: 'test@example.com',
            password: 'StrongPassword1!',
            isAdmin: true, // Attempting mass assignment
            role: 'admin'
        };

        await register(req, res);

        expect(User.create).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'StrongPassword1!'
        });
        // Verify no other fields were passed
        const args = User.create.mock.calls[0][0];
        expect(args).not.toHaveProperty('isAdmin');
        expect(args).not.toHaveProperty('role');
    });
});
