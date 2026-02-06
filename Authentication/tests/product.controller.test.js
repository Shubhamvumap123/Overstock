
const productController = require('../src/controllers/product.controller');
const Product = require('../src/models/product.model');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/product.model');
jest.mock('../src/middlewares/authenticate', () => (req, res, next) => next());

describe('Product Controller', () => {
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

    describe('getProducts', () => {
        it('should return products using .lean() for performance', async () => {
            const mockProducts = [
                { title: 'Chair', price: 100 },
                { title: 'Table', price: 200 }
            ];

            // Mock Product.find().lean() chain
            const mockLean = jest.fn().mockResolvedValue(mockProducts);
            Product.find.mockReturnValue({
                lean: mockLean
            });

            await productController.getProducts(req, res);

            // Verify .lean() was called
            expect(Product.find).toHaveBeenCalled();
            expect(mockLean).toHaveBeenCalled();

            // Verify response
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toEqual(mockProducts);
        });

        it('should handle errors gracefully', async () => {
            const errorMessage = 'Database error';

             // Mock Product.find().lean() chain to throw
             const mockLean = jest.fn().mockRejectedValue(new Error(errorMessage));
             Product.find.mockReturnValue({
                 lean: mockLean
             });

            await productController.getProducts(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual(expect.objectContaining({ message: errorMessage }));
        });
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            req.body = { title: 'New Chair', price: 150 };
            req.userID = 'user123';

            const mockProduct = { _id: 'prod1', ...req.body, user_id: req.userID };
            Product.create.mockResolvedValue(mockProduct);

            await productController.createProduct(req, res);

            expect(Product.create).toHaveBeenCalledWith(expect.objectContaining({
                title: 'New Chair',
                price: 150,
                user_id: 'user123'
            }));
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toEqual(mockProduct);
        });
    });
});
