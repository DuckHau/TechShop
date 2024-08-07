import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCategory,
  detailCategory,
} from "../../../redux/Actions/CategoryAction";
import { useParams, useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const detailsCategory = useSelector((state) => state.detailsCategory);
  const { loading, error, category } = detailsCategory;

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(detailCategory(id));
  }, [dispatch, id]);

  const updatedCategory = () => {
    const updatedCategory = {
      name,
    };
    const rs = dispatch(updateCategory(id, updatedCategory));
    if (rs) {
      alert("Cập nhật danh mục thành công!!!");
      // Navigate to the productList page after updating
      setTimeout(() => {
        navigate("/admin/category");
      }, 1000);
    }
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    updatedCategory();
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-md-10 mt-5">
          <>
            <div className="wrapper my-5">
              <h1 className="mb-4">Chỉnh sửa danh mục</h1>

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
                    <label htmlFor="firstname_field">Tên danh mục</label>
                    <input
                      type="text"
                      id="firstname_field"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    Cập nhật
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

export default UpdateCategory;
