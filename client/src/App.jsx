import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Navbar from "./components/Navbar";
import SuccessModal from "./components/SuccessModal";
import Home from "./components/Home";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);


  return (
    <>
       <Navbar />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <div className="container mt-4">
                <ProductForm onSave={loadProducts} selected={selected} setSelected={setSelected} notify={(msg) => { setModalMessage(msg); setShowModal(true); }} />
              </div>
            }
          />
          <Route
            path="/product-list"
            element={
              <div className="container mt-4">
                <ProductList products={products} onEdit={(product) => { setSelected(product); navigate("/products"); }} onDelete={() => { loadProducts(); setModalMessage("Product deleted successfully."); setShowModal(true); }} notify={(msg) => { setModalMessage(msg); setShowModal(true); }} />
              </div>
            }
          />
        </Routes>
      <SuccessModal show={showModal} message={modalMessage} onClose={() => setShowModal(false)} />
    </>
  );
};

export default App;
