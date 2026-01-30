
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
        it('should call .lean() for performance and return products', async () => {
             const mockProducts = [{ title: 'P1', price: 100 }, { title: 'P2', price: 200 }];

             const mockChain = {
                 lean: jest.fn().mockResolvedValue(mockProducts)
             };

             Product.find.mockReturnValue(mockChain);

             await productController.getProducts(req, res);

             expect(Product.find).toHaveBeenCalled();
             expect(mockChain.lean).toHaveBeenCalled();

             expect(res.statusCode).toBe(200);
             // Verify the data sent is the mockProducts (which comes from lean())
             expect(res._getData()).toEqual(mockProducts);
        });
    });
});
