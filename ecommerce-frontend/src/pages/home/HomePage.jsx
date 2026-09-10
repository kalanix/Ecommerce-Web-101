import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./homepage.css";
import ProductGrid from "../../components/ProductGrid";

function HomePage({ cart, loadCart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const featchProduct = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    featchProduct();
  }, []);

  // fetch('http://localhost:3000/api/products')
  // .then(res=>res.json())
  // .then(data=>console.log(data))
  // .catch(err=>console.error(err))

  return (
    <>
      <title>Homepage</title>

      <Header cart={cart}></Header>
      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}

export default HomePage;
