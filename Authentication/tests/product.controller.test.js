
const productController = require('../src/controllers/product.controller');
const Product = require('../src/models/product.model');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/product.model');

describe('Product Controller', () => {
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

    describe('createProduct', () => {
        it('should create product with ONLY allowed fields (Mass Assignment Fix)', async () => {
            req.body = {
                title: 'Test Product',
                price: 100,
                price_override: 0, // Malicious field
                isAdmin: true // Malicious field
            };
            req.userID = 'user123'; // Simulated from middleware

            const mockProduct = {
                _id: 'prod123',
                title: 'Test Product',
                price: 100,
                user_id: 'user123',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            Product.create.mockResolvedValue(mockProduct);

            await productController.createProduct(req, res);

            // Expect Product.create to be called with ONLY title, price, and user_id
            expect(Product.create).toHaveBeenCalledWith({
                title: 'Test Product',
                price: 100,
                user_id: 'user123'
            });

            // Should not contain malicious fields
            const createCallArgs = Product.create.mock.calls[0][0];
            expect(createCallArgs).not.toHaveProperty('price_override');
            expect(createCallArgs).not.toHaveProperty('isAdmin');
        });

        it('should handle errors securely', async () => {
            req.body = { title: 'Test Product', price: 100 };
            req.userID = 'user123';

            const dbError = new Error('Database connection failed: Sensitive Info');
            Product.create.mockRejectedValue(dbError);

            await productController.createProduct(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Product creation failed' }));

            // Should not leak error details
            const responseData = res._getData();
            expect(responseData.message).not.toContain('Sensitive Info');
        });
    });
});
