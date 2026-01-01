import { useRef } from 'react'
import { useProduct } from '../context/ProductContext';

const ProductForm = () => {
  const nameRef = useRef();
  const { addProduct } = useProduct()

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ title: nameRef.current.value });
    nameRef.current.value = ""
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder='Product Name' />
        <button>Add Product</button>
      </form>

    </div>
  )
}

export default ProductForm
