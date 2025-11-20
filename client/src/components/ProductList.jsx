import axios from "axios";
import '../App.css';

const ProductList = ({ products, onEdit, onDelete }) => {

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/delete/${id}`);
    onDelete();
  };

  return (
    <div className="row mt-4 product-list">
      {products.map((p) => (
        <div className="col-md-4" key={p.id}>
          <div className="card p-2 mb-3 bg-info shadow-lg">
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt=""
              height="200"
            />
            <h2>{p.name}</h2>
            <h5>₹ {p.price}</h5>
            <p>{p.description}</p>

            <button className="btn btn-warning mb-2" onClick={() => onEdit(p)}>
              Edit
            </button>

            <button className="btn btn-danger" onClick={() => deleteProduct(p.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
