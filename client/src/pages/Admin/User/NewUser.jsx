import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/Actions/UserAction";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const createNewUser = () => {
    const newUser = {
      firstname,
      lastname,
      password,
      email,
      role,
    };
    var disPatch = dispatch(createUser(newUser));
    if (disPatch) {
      alert("Them nguoi dung thanh cong");
      setTimeout(() => navigate("/admin/user"), 1000);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createNewUser();
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 col-md-10 mt-5">
          <>
            <div className="wrapper my-5">
              <h1 className="mb-4">Thêm người dùng mới</h1>

              <form onSubmit={submitHandler} noValidate>
                <div className="form-group">
                  <label htmlFor="firstname_field">Tên đầu</label>
                  <input
                    type="text"
                    id="firstname_field"
                    className="form-control"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname_field">Tên cuối</label>
                  <input
                    type="text"
                    id="lastname_field"
                    className="form-control"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Mật khẩu</label>
                  <input
                    type="text"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="text"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Chức năng</label>
                  <select
                    className="form-control"
                    id="role_field"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="role">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Thêm người dùng
                </button>
              </form>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default NewUser;
