// import { useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
// import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
// import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Layout from "../../../components/Layout/masterLayout";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { port } from "../../../Util.js";
// import { useAuth } from "../../../context/authContext";

// const MadeWithLove = () => (
//   <Typography variant="body2" color="textSecondary" align="center">
//     {"Built with love by the "}
//     <Link color="inherit" href="https://techshop.com/">
//       TechShop
//     </Link>
//     {" team."}
//   </Typography>
// );

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//   },
//   image: {
//     backgroundImage: "url(https://source.unsplash.com/random)",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const SignIn = () => {
//   const classes = useStyles();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post(port + "/user/signin", {
//       email,
//       password,
//     });
//     if (res && res.data.success) {
//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//       setAuth({
//         ...auth,
//         user: res.data.user,
//         token: res.data.token,
//       });
//       localStorage.setItem("auth", JSON.stringify(res.data));
//       toast.success(res.data && res.data.message);
//     } else {
//       console.log(res.data.message);
//       toast.error(res.data && res.data.message);
//     }
//   };
//   return (
//     <Layout title="Đăng nhập">
//       <Grid container component="main" className={classes.root}>
//         <CssBaseline />
//         <Grid item xs={false} sm={4} md={7} className={classes.image} />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <div className={classes.paper}>
//             <Avatar className={classes.avatar}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <form className={classes.form} onSubmit={handleSubmit} noValidate>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="email"
//                 autoFocus
//               />
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Mật khẩu"
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete="current-password"
//               />
//               {/* <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               /> */}
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//               >
//                 Đăng nhập
//               </Button>
//               <Box container>
//                 <Grid item>
//                   <Link href="/forgot-password" variant="body2">
//                     Quên mật khẩu?
//                   </Link>
//                 </Grid>
//                 <Grid item md>
//                   <Link href="/signup" variant="body2">
//                     {"Chưa có tài khoản? Đăng ký ngay!"}
//                   </Link>
//                 </Grid>
//               </Box>
//               <Box mt={5}>
//                 <MadeWithLove />
//               </Box>
//             </form>
//           </div>
//         </Grid>
//       </Grid>
//     </Layout>
//   );
// };

// export default SignIn;

import "./styleLogin.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, login } from "../../../redux/Actions/UserAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      alert("Đăng nhập thành công.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      // toast.success("Đăng nhập thành công.");
    } else if (error) {
      // toast.error(error);
      alert("Đăng nhập thất bại.");
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    dispatch(login(email, password));
  };

  return (
    <MDBContainer className="my-5" style={{ maxWidth: "1357px" }}>
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6" center>
            <MDBCardBody className="d-flex flex-column">
              <form onSubmit={submitHandler}>
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0">TechShop</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Đăng nhập
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  name="email"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-danger">{error}</p>}

                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  name="password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {error && <p className="text-danger">{error}</p>}

                <MDBBtn
                  className="mb-4 px-9"
                  size="lg"
                  color="dark grey"
                  style={{
                    width: "100%",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    transition: "all 0.2s ease-in-out",
                  }}
                  type="submit"
                >
                  Đăng nhập
                </MDBBtn>
              </form>

              <a className="small text-muted" href="#!">
                Quên mật khẩu?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Không có tài khoản?{" "}
                <a href="/signup" style={{ color: "#393f81" }}>
                  Đăng ký ngay!
                </a>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignIn;
