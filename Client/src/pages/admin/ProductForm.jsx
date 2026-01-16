import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  getProductById,
  getCategories,
} from "../../services/api";
import Loading from "../../components/Loading";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    categoryId: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setFormData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="input-field"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:bg-gray-400"
          >
            {loading ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
