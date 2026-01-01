import React from 'react'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'

const Products = () => {
    return (
        <div>
            <h2>Products</h2>
            <button>Logout</button>

            <ProductForm />
            <ProductList />
        </div>
    )
}

export default Products
