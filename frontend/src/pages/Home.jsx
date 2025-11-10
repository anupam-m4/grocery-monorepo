import Blogs from "../components/Blogs.jsx";
import Brands from "../components/Brands.jsx";
import CallToAction from "../components/CallToAction.jsx";
import Category from "../components/Category.jsx";
import Hero from "../components/Hero.jsx";
import NewsLetter from "../components/NewsLetter.jsx";
import Products from "../components/Products.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Products />
      <CallToAction />
      <Blogs />
      <Brands />
      <NewsLetter />
    </div>
  );
};
export default Home;