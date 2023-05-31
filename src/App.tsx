import Header from "./components/Header/Header";
import FeaturedProducts from "./components/Featured/FeaturedProducts";
import ProductPagination from "./components/ProductPagination/ProductPagination";

const HomePage = () => {
  return (
    <div className="main">
      <Header />
      <FeaturedProducts />
      <ProductPagination />
    </div>
  );
};

export default HomePage;
