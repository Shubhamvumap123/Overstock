const { getProducts } = require("../src/controllers/product.controller");
const Product = require("../src/models/product.model");
const httpMocks = require("node-mocks-http");

jest.mock("../src/models/product.model");

describe("Product Controller - getProducts", () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it("should return 200 and all products", async () => {
    const mockProducts = [
      { title: "Product 1", price: 100 },
      { title: "Product 2", price: 200 },
    ];

    const mockLean = jest.fn().mockResolvedValue(mockProducts);
    Product.find.mockReturnValue({ lean: mockLean });

    await getProducts(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual(mockProducts);
    expect(Product.find).toHaveBeenCalled();
    expect(mockLean).toHaveBeenCalled();
  });

  it("should return 400 when error occurs", async () => {
     const mockLean = jest.fn().mockRejectedValue(new Error("Database error"));
     Product.find.mockReturnValue({ lean: mockLean });

     await getProducts(req, res);

     expect(res.statusCode).toBe(400);
     expect(res._getData()).toEqual({message: "Database error"});
  });
});
