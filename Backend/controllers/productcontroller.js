const productModel = require('../models/productmodel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')
const cartModel = require('../models/cartModel')

//get products API = api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
    const resPerPage = 3

    let buildQuery = () => {
        return new APIFeatures(productModel.find(), req.query).search().filter()
    }

    const filterProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await productModel.countDocuments({})
    let productsCount = totalProductsCount;

    if (filterProductsCount !== totalProductsCount) {
        productsCount = filterProductsCount
    }

    const products = await buildQuery().paginate(resPerPage).query;
    //await new Promise(resolve => setTimeout(resolve,3000))
    //return next(new ErrorHandler('Unable to send products',400))
    res.json({
        success: 'true',
        count: productsCount,
        resPerPage,
        products
    })
})

//get single products API = api/v1/products/:id
exports.getSingleProducts = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id).populate('reviews.user', 'name email avatar')

    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }

    res.json({
        success: true,
        product
    })
})

//related products - /api/v1/products/:id/related
exports.relatedProducts = catchAsyncError(async (req, res, next) => {
    const allProducts = await productModel.find()
    const productId = req.params.id;
    const products = allProducts.find(p => p._id.equals(productId))
    const relatedProducts = allProducts.filter(p => p.category === products.category && p._id !== products._id)
    res.json({
        relatedProducts
    })
})


//create product - /api/v1/products/new
exports.postProducts = catchAsyncError(async (req, res, next) => {
    let images = []
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    if (req.files.length > 0) {
        req.files.forEach(file => {
            let url = `${BASE_URL}/uploads/products/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;

    req.body.user = req.user.id
    const product = await productModel.create(req.body)
    await product.save();
    res.json({
        success: true,
        message: "product added successfully",
        product
    })
});

//update product -api/v1/product/:id

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    //uploading images

    let images = []
    //if images not cleared we keep existing images
    if (req.body.imagesCleared === 'false') {
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    if (req.files.length > 0) {
        req.files.forEach(file => {
            let url = `${BASE_URL}/uploads/products/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "product not found"
        })
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runvalidators: true
    })

    await cartModel.updateMany(
        { 'items.product': req.params.id },
        {
            $set: {
                'items.$[elem].name': product.name,
                'items.$[elem].price': product.price,
                'items.$[elem].stock': product.stock,
                'items.$[elem].image': product.images[0].image,
            }
        },
        {
            arrayFilters: [{ 'elem.product': req.params.id }]
        }
    )


    res.status(200).json({
        success: true,
        product
    })
})

//Delete product - api/v1/products/:id
exports.deleteProduct = async (req, res, next) => {
    const product = await productModel.findByIdAndDelete(req.params.id )

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "product not found"
        });
    }

    await cartModel.updateMany(
        { 'items.product': req.params.id },
        { $pull: { items: { product: req.params.id } } }
    );
    res.status(200).json({
        success: true,
        message: "product deleted"
    })
}

//create Review -api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment
    }
    const product = await productModel.findById(productId);
    //finding user already has reviewed
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() == req.user.id.toString()
    })
    //updating the review
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() == req.user.id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        //creating the review
        product.reviews.push(review);
        product.numberOfreviews = product.reviews.length;
    }

    const calculateAverageRating = (reviews) => {
        if (product.reviews.length === 0) return 0; // No reviews, return 0

        const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / product.reviews.length;

        return averageRating;
    };
    //find the average of the product reviews
    product.ratings = calculateAverageRating(product.reviews)

    product.ratings = Math.min(Math.max(product.ratings, 1), 5);
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })
})

//Get reviews -api/v1/reviews?id={productId}

exports.getReviews = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.id).populate('reviews.user', 'name email avatar')

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


//Delete reviews - api/v1/review

exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.query.productId)

    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString()
    });

    //number of reviews
    const numberOfreviews = reviews.length;

    //finding the average with the filtered reviews
    ratings = reviews.reduce((acc, review) => {
        return review.rating + acc
    }, 0) / product.reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings;

    //save in the product document
    await productModel.findByIdAndUpdate(req.query.productId, {
        reviews,
        numberOfreviews,
        ratings
    })

    res.status(200).json({
        success: true
    })
});


//Get admin products - api/v1/admin/products

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await productModel.find()
    res.status(200).send({
        success: true,
        products
    })
})

