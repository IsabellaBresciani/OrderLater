const productService = require('../services/productService'); 

class ProductController {

    constructor(productService) {
        this.productService = productService;
    }

    getAllProducts = async (request, response) => {

        const products = await this.productService.getProducts();

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Products successfully retrieved',
                products: products
            });
    }

    getProductById = async (request, response) => {
        const { id } = request.params;
        
        const product = await this.productService.getProductById(id);

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Product successfully retrieved',
                products: product
            });
    }

    getProductBySku = async (request, response) => {
        const { sku } = request.params;
        
        const product = await this.productService.getProductBySku(sku);

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Product successfully retrieved',
                products: product
            });
    }

    createProduct = async (request, response) => {
        const data = request.body;

        await this.productService.createProduct(data);
        
        return response
            .status(201)
            .json({ 
                status: 'Success',
                message: 'Product successfully created'
            });
    }

    updateProduct = async (request, response) => {
        const { id } = request.params;
        const data = request.body;

        await this.productService.updateProduct(id, data);
        
        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Product successfully updated'
            });
    }

    deleteProduct = async (request, response) => {
        const { id } = request.params;

        await this.productService.deleteProduct(id);

        return response
            .status(204)
            .json({ 
                status: 'Success',
                message: 'Product successfully deleted'
            });
    }
}

module.exports = new ProductController(productService);