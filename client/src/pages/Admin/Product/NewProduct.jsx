import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../redux/Actions/ProductAction";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState({ $numberDecimal: 0 });
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const createNewProduct = () => {
    const formData = new FormData();
    formData.append("proImg", images);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    dispatch(createProduct(formData));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createNewProduct();
    setTimeout(() => {
      navigate("/admin/product");
    });
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-md-10 mt-5">
          <>
            <div className="wrapper my-5">
              <h1 className="mb-4">Add New Product</h1>

              <form onSubmit={submitHandler} noValidate>
                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <input
                    type="text"
                    id="category_field"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Hình ảnh</label>
                  <input type="file" onChange={handleImageChange} />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Add Product
                </button>
              </form>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
