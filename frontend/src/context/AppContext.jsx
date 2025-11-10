import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, products, blogs } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();
const currency = import.meta.env.VITE_CURRENCy;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState([]);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) {
        setUser(true);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-admin");
      if (data.success) {
        setAdmin(true);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategoriesData(data.categories);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/all");
      if (data.success) {
        setProductsData(data.products);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchBlogs = async () => {
    setBlogsData(blogs);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const newCart = structuredClone(prev);
      const existingProduct = newCart.find((item) => item._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        newCart.push({ ...product, quantity: 1 });
      }
      toast.success("Product added to cart");
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    // setCart((prev) => {
    //   const newCart = structuredClone(prev);
    //   const existingProduct = newCart.find((item) => item._id === id);
    //   if (existingProduct.quantity === 1) {
    //     return newCart.filter((item) => item._id !== id);
    //   } else {
    //     existingProduct.quantity -= 1;
    //   }
    //   toast.success("Product removed to cart");
    //   return newCart;
    // });
    setCart((prev) => {
      const newCart = prev.filter((item) => item._id !== id);
      // toast.success("Product successfully removed from cart");
      return newCart;
    });
  };

  const addToFavorite = (product) => {
    setFavorite((prev) => {
      const newFavs = structuredClone(prev);
      if (!newFavs.find((item) => item._id === product._id)) {
        newFavs.push(product);
        // toast.success("Product added to favorite");
      } else {
        toast.error("Product already added to favorite");
      }
      return newFavs;
    });
  };

  const removeFromFavorite = (id) => {
    setFavorite((prev) => {
      const newFavs = prev.filter((item) => item._id !== id);
      // toast.success("Product removed from favorite");
      return newFavs;
    });
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.offerPrice * item.quantity,
      0
    );
  };

  const increaseQuantity = (id) => {
    setCart((prev) => {
      const newCart = structuredClone(prev);
      const product = newCart.find((item) => item._id === id);
      if (product) {
        product.quantity += 1;
      }
      return newCart;
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prev) => {
      const newCart = structuredClone(prev);
      const product = newCart.find((item) => item._id === id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      return newCart;
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchBlogs();
    checkAuth();
    checkAdmin();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    categoriesData,
    setCategoriesData, // (optional, if you want to modify it elsewhere)
    fetchCategories,
    addToCart,
    cart,
    axios,
    favorite,
    removeFromCart,
    addToFavorite,
    removeFromFavorite,
    productsData,
    currency,
    getCartTotal,
    blogsData,
    loading,
    increaseQuantity,
    decreaseQuantity,
    setLoading,
    admin,
    setAdmin,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
