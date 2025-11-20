const express = require("express");
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer Storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ADD PRODUCT
app.post("/products/add", upload.single("image"), async (req, res) => {
  try {
    console.log("/products/add called");
    console.log("body:", req.body);
    console.log("file:", req.file);

    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const result = await pool.query(
      "INSERT INTO products (image, name, price, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [image, name, price, description]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in /products/add:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// GET PRODUCTS
app.get("/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
  res.json(result.rows);
});

// UPDATE PRODUCT
app.put("/products/update/:id", upload.single("image"), async (req, res) => {
  try {
    console.log(`/products/update/${req.params.id} called`);
    console.log("body:", req.body);
    console.log("file:", req.file);

    const {name, price, description, oldImage } = req.body;
    const { id } = req.params;

    let image = oldImage;

    if (req.file) {
      image = req.file.filename;
    }

    await pool.query(
      "UPDATE products SET image=$1, name=$2, price=$3, description=$4 WHERE id=$5",
      [image, name, price, description, id]
    );

    res.json({ message: "Updated Successfully" });
  } catch (err) {
    console.error("Error in /products/update:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// DELETE PRODUCT
app.delete("/products/delete/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM products WHERE id=$1", [id]);

  res.json({ message: "Deleted Successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
