
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
        // Mock console.error to avoid cluttering test output
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const weakPasswords = [
        { pass: 'short', msg: 'min length' },
        { pass: 'alllowercase1!', msg: 'uppercase' },
        { pass: 'ALLUPPERCASE1!', msg: 'lowercase' },
        { pass: 'NoNumber!', msg: 'number' },
        { pass: 'NoSpecialChar1', msg: 'special char' }
    ];

    weakPasswords.forEach(({ pass, msg }) => {
        it(`should reject password that fails ${msg} check`, async () => {
            req.body = {
                email: 'test@example.com',
                password: pass
            };

            User.findOne.mockResolvedValue(null); // User does not exist

            await authController.register(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({
                message: expect.stringContaining('Password must contain')
            }));

            // Ensure User.create was NOT called
            expect(User.create).not.toHaveBeenCalled();
        });
    });

    it('should accept a strong password', async () => {
        req.body = {
            email: 'test@example.com',
            password: 'StrongPassword123!'
        };

        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            _id: '123',
            email: 'test@example.com',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        jwt.sign.mockReturnValue('token');

        await authController.register(req, res);

        expect(res.statusCode).toBe(200);
        expect(User.create).toHaveBeenCalled();
    });
});
