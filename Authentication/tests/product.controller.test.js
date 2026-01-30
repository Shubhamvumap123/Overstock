
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
                isVerified: true, // Malicious field
                owner: 'hacker' // Malicious field
            };
            req.userID = 'user123';

            const mockProduct = {
                _id: 'prod123',
                title: 'Test Product',
                price: 100,
                user_id: 'user123'
            };
            Product.create.mockResolvedValue(mockProduct);

            await productController.createProduct(req, res);

            // Expect Product.create to be called with ONLY title, price and user_id
            expect(Product.create).toHaveBeenCalledWith({
                title: 'Test Product',
                price: 100,
                user_id: 'user123'
            });

            // Should not contain malicious fields
            const createCallArgs = Product.create.mock.calls[0][0];
            expect(createCallArgs).not.toHaveProperty('isVerified');
            expect(createCallArgs).not.toHaveProperty('owner');
        });

        it('should return GENERIC error when creation fails (Error Leaking Fix)', async () => {
             req.body = {
                title: 'Test Product',
                price: 100
            };
            req.userID = 'user123';

            const dbError = new Error('Database connection failed: duplicate key error');
            Product.create.mockRejectedValue(dbError);

            await productController.createProduct(req, res);

            // We expect 500 for server errors, avoiding 400 which implies user error
            expect(res.statusCode).toBe(500);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Product creation failed' }));

            // Should NOT return the raw error message
             expect(JSON.stringify(res._getData())).not.toContain('Database connection failed');
        });
    });

    describe('getProducts', () => {
        it('should return GENERIC error when fetching fails (Error Leaking Fix)', async () => {
            const dbError = new Error('Database connection failed: timeout');
            Product.find.mockRejectedValue(dbError);

            await productController.getProducts(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Could not fetch products' }));

             // Should NOT return the raw error message
             expect(JSON.stringify(res._getData())).not.toContain('Database connection failed');
        });
    });
});
