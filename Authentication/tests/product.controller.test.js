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
    });

    describe('getProducts', () => {
        it('should return all products using lean() for performance', async () => {
            const mockProducts = [
                { title: 'Product 1', price: 100 },
                { title: 'Product 2', price: 200 }
            ];

            // Mock Product.find to return an object with a lean method
            const mockFind = {
                lean: jest.fn().mockResolvedValue(mockProducts)
            };
            Product.find.mockReturnValue(mockFind);

            await productController.getProducts(req, res);

            expect(Product.find).toHaveBeenCalled();
            expect(mockFind.lean).toHaveBeenCalled();
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toEqual(mockProducts);
        });

        it('should handle errors', async () => {
            const errorMessage = 'Database error';
            // Even when erroring, it might try to call lean, so we mock it to reject
             const mockFind = {
                lean: jest.fn().mockRejectedValue(new Error(errorMessage))
            };
            Product.find.mockReturnValue(mockFind);

            await productController.getProducts(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getData()).toEqual({ message: errorMessage });
        });
    });
});
