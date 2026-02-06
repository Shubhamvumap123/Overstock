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
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getProducts', () => {
        it('should fetch products using Product.find().lean()', async () => {
            const mockProducts = [
                { title: 'Product 1', price: 100 },
                { title: 'Product 2', price: 200 }
            ];

            // Mock Product.find to return a chainable object with lean()
            const mockLean = jest.fn().mockResolvedValue(mockProducts);
            Product.find.mockReturnValue({
                lean: mockLean
            });

            await productController.getProducts(req, res);

            expect(Product.find).toHaveBeenCalledTimes(1);
            expect(mockLean).toHaveBeenCalledTimes(1);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toEqual(mockProducts);
        });
    });
});
