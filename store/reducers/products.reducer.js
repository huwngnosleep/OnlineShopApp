import PRODUCTS from '../../data/dummy-data'
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/products.action';
import Product from '../../models/product'

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(product => product.ownerId === 'u1')
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((product) => product.id !== action.productId),
                availableProducts: state.availableProducts.filter((product) => product.id !== action.productId),
            }

        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex((product) =>
                product.id === action.productId
            )
            const updatedProduct = new Product(
                action.productId,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
            )
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProduct
            const availableProductIndex = state.userProducts.findIndex((product) =>
                product.id === action.productId
            )
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProductIndex] = updatedProduct
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id, 
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }
    }

    return state
}