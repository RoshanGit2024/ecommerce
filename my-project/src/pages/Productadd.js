import React, { useState } from 'react'
import axios from 'axios'

function Productadd() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
  
        const result= await axios.post(
          'http://localhost:8000/api/v1/products',
          formData,
        {
          headers:{"content-Type":"multipart/form-data"}
        }
      );
    }
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6">
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
      <input
        id="image"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        required
        className="text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Add Product
    </button>
  </form>
  )
}

export default Productadd
