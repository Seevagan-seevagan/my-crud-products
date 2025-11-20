import axios from "axios";
import { useState, useEffect } from "react";

const ProductForm = ({ onSave, selected, notify }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        price: selected.price,
        description: selected.description,
        image: null,
      });
    } else {
      setForm({ name: "", price: "", description: "", image: null });
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);
    if (selected) fd.append("oldImage", selected.image);

    try {
      let response;

      if (selected) {
        response = await axios.put(
          `http://localhost:5000/products/update/${selected.id}`,
          fd
        );
      } else {
        
        response = await axios.post(
          "http://localhost:5000/products/add",
          fd
        );
      }

    console.log(response.data);
    onSave();

   
    if (notify) notify(selected ? "Product updated successfully." : "Product added successfully.");

    setForm({ name: "", price: "", description: "", image: null });

    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <form className="card p-3" onSubmit={handleSubmit}>
      <h4>{selected ? "Update Product" : "Add Product"}</h4>

    <input
        type="text"
        className="form-control mb-2"
        placeholder="name"
        value={form.name} 
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />


      <input
        type="number"
        className="form-control mb-2"
        placeholder="Price"
        value={form.price}  
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      ></textarea>

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        accept="image/*"
      />

      <button className="btn btn-primary">
        {selected ? "Update" : "Add Product"}
      </button>
      </form>

    </>
  );
};

export default ProductForm;
