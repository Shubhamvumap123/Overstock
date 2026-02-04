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
                user_id: 'fake_user_id', // Should be ignored and overwritten by req.userID
                isAdmin: true, // Malicious field
                randomField: 'should be ignored'
            };
            req.userID = 'valid_user_id';

            Product.create.mockResolvedValue({
                title: 'Test Product',
                price: 100,
                user_id: 'valid_user_id'
            });

            await productController.createProduct(req, res);

            expect(Product.create).toHaveBeenCalledWith({
                title: 'Test Product',
                price: 100,
                user_id: 'valid_user_id'
            });
        });

        it('should return generic error message on failure', async () => {
            req.body = { title: 'Test', price: 100 };
            req.userID = 'user_id';
            Product.create.mockRejectedValue(new Error('Database connection failed'));

            await productController.createProduct(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Product creation failed' }));
        });
    });

    describe('getProducts', () => {
        it('should return generic error message on failure', async () => {
            // Mock .lean() chain
            const mockFind = {
                lean: jest.fn().mockRejectedValue(new Error('DB Error'))
            };
            Product.find.mockReturnValue(mockFind);

            await productController.getProducts(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getData()).toEqual(expect.objectContaining({ message: 'Failed to fetch products' }));
        });

         it('should return products using lean()', async () => {
            const mockProducts = [{ title: 'P1' }, { title: 'P2' }];
            const mockFind = {
                lean: jest.fn().mockResolvedValue(mockProducts)
            };
            Product.find.mockReturnValue(mockFind);

            await productController.getProducts(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getData()).toEqual(mockProducts);
            expect(mockFind.lean).toHaveBeenCalled();
        });
    });
});
