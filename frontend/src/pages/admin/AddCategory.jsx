import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { Upload, Trash2 } from "lucide-react";

const AddCategory = () => {
  const { loading, navigate, setLoading, axios } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData({ ...formData, image: selectedFile });
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/category/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/categories");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({ name: "", image: null });
    setFile(null);
    setPreview(null);
    toast.success("Form cleared");
  };

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5"
      >
        {preview && <img src={preview} alt="Preview" className="w-1/2 rounded-md" />}

        {/* Category Name */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Category Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        {/* Category Image */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Image
          </label>

          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            required
          />

          {/* Custom upload area */}
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition"
          >
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">
              {file ? file.name : "Click to upload image"}
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-md cursor-pointer hover:bg-primary/90"
          >
            {loading ? "Loading..." : "Add Category"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 text-red-600 border border-red-500 px-4 py-3 rounded-md hover:bg-red-50 transition"
          >
            <Trash2 size={18} />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
