import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/ProductContext'

const ProductList = () => {
    const { products,deleteProduct, updateProduct , getData} = useProduct();
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState("")


    console.log("products", products);
    

    useEffect(() => {
        getData()
    }, [])

    return (
        <ul>
            {
                products.map(product => (
                    <li key={product.id}>
                        {
                            editId === product.id ? (
                                <>
                                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />

                                    <button onClick={() => {
                                        updateProduct(product.id, { title: editValue });
                                        setEditId(null)
                                    }}>Save</button>
                                </>
                            ) : (
                                <>
                                    {product.title}
                                    <button onClick={() => {
                                        setEditId(product.id);
                                        setEditValue(product.title)
                                    }}>Edit</button>
                                </>
                            )
                        }
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
    )
}

export default ProductList
