import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, PlusCircle } from "lucide-react";
import { useProudctStore } from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  // const loading = false;

  const { createProduct, loading } = useProudctStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitted Product:", newProduct);
  try {
    await createProduct(newProduct);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
  } catch (error) {
    console.log(error);
  } 
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-400">
        Create a new Product
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
            className="mt-1 block w-full bg-gray-700 border text-white border-gray-600 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Product Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Product Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            required
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
          ></textarea>
        </div>

        {/* Product Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Product Category
          </label>
          <select
            name="category"
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
            className="mt-1 block w-full bg-gray-700 border text-white border-gray-600 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Product Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Product Price
          </label>
          <input
            type="number"
            name="price"
            min={0}
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
            className="mt-1 block w-full bg-gray-700 border text-white border-gray-600 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Product Image */}
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleChangeImage}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-gray-400">Image uploaded </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="p-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
