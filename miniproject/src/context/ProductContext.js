import { createContext, useContext, useState } from "react";
import api from "../api/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    //GET DATA;
    const getData = async () => {
        const data = await api.get('/posts');
        setProducts(data.data.slice(1, 10))
    }

    //CREATE
    const addProduct = async (product) => {
        const res = await api.post("/posts", product);
        setProducts((prev) => [{ ...res.data, id: Date.now() }, ...prev]);
    };

    //UPDATE
    const updateProduct = async (id, data) => {
        await api.put(`/posts/${id}`, data);
        setProducts(products.map((p) => (p.id === id ? { ...p, ...data } : p)));
    };

    // DELETE
    const deleteProduct = async (id) => {
        await api.delete(`/posts/${id}`);
        setProducts(products.filter(p => p.id !== id))
    }

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            deleteProduct,
            updateProduct,
            getData
        }}>
            {children}
        </ProductContext.Provider>
    )
};


export const useProduct = () => useContext(ProductContext);