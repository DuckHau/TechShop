import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailProduct,
  updateProduct,
} from "../../../redux/Actions/ProductAction";
import { getCategory } from "../../../redux/Actions/CategoryAction";
import { useParams } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, products } = productDetails;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  // const [oldImages, setOldImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);
  const { categoryList } = useSelector((state) => state.categoryList);

  useEffect(() => {
    dispatch(detailProduct(slug));
    dispatch(getCategory());
  }, [dispatch, slug]);
  const handleImageChange = (e) => {
    setImages(e.target.files[0]);
    setOldImages(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages((old) => [...old, reader.result]);
      }
    };
  };

  const updatedProduct = () => {
    const formData = new FormData();
    formData.append("proImg", images);
    formData.append("name", name);
    formData.append("price", price.$numberDecimal);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);

    dispatch(updateProduct(slug, formData));
  };

  useEffect(() => {
    if (products) {
      setName(products.name);
      setPrice(products.price);
      setDescription(products.description);
      setCategory(products.category?._id);
      setStock(products.stock);
      // setOldImages(products.images);
    }
  }, [products]);

  const submitHandler = (e) => {
    e.preventDefault();
    updatedProduct();
  };
  const priceNumber = Number(products.price?.$numberDecimal);

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-md-10 mt-5">
          <>
            <div className="wrapper my-5">
              <h1 className="mb-4">Product Details</h1>

              {loading ? (
                <div
                  style={{ position: "absolute", right: "700px", top: "400px" }}
                >
                  <div className="flex justify-center items-center">
                    <MoonLoader color="#f59e0b" size={150} />
                  </div>
                </div>
              ) : error ? (
                <h1>{error}</h1>
              ) : (
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
                      value={priceNumber.toString()}
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
                    <select
                      type="text"
                      id="category_field"
                      className="form-control"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categoryList.map((categoryList) => (
                        <option key={categoryList._id} value={categoryList._id}>
                          {categoryList.name}
                        </option>
                      ))}
                    </select>
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
                    {/* display image */}
                    <div className="form-group flex">
                      {products.proImg?.map((img) => (
                        <img
                          key={img._id}
                          src={img.img}
                          alt=""
                          className="img-fluid"
                        />
                      ))}{" "}
                    </div>
                  </div>

                  {/* <div className="form-group">
                    <label>Images</label>
                    {products.proImg?.map((img) => (
                      <img
                        key={img._id}
                        src={img.img}
                        alt=""
                        className="img-fluid"
                      />
                    ))}
                  </div> */}
                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    Update
                  </button>
                </form>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
