// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Layout from "../../../components/Layout/masterLayout";
// import { port } from "../../../Util.js";

// const MadeWithLove = () => {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Built with love by the "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Material-UI
//       </Link>
//       {" team."}
//     </Typography>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   "@global": {
//     body: {
//       backgroundColor: theme.palette.common.white,
//     },
//   },
//   paper: {
//     marginTop: theme.spacing(8),
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
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const SignUp = () => {
//   const classes = useStyles();
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   //Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post(port + "/user/signup", {
//       firstname,
//       lastname,
//       email,
//       password,
//     });
//     if (res && res.data.success) {
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//       toast.success(res.data && res.data.message);
//     } else {
//       console.log(res.data.message);
//       toast.error(res.data.message);
//     }
//   };
//   return (
//     <Layout title={"Đăng ký"}>
//       <Container component="main" maxWidth="xs" title="Đăng ký">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <form className={classes.form} onSubmit={handleSubmit} noValidate>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="fname"
//                   name="firstName"
//                   variant="outlined"
//                   value={firstname}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   value={lastname}
//                   onChange={(e) => setLastName(e.target.value)}
//                   name="lastName"
//                   autoComplete="lname"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="current-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox value="allowExtraEmails" color="primary" />
//                   }
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign Up
//             </Button>
//             <Grid container justify="flex-end">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//         <Box mt={5}>
//           <MadeWithLove />
//         </Box>
//       </Container>
//     </Layout>
//   );
// };

// export default SignUp;

import "./styleReg.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signup } from "../../../redux/Actions/UserAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
      // toast.success("Đăng ký thành công.");
      alert("Đăng ký thành công.");
      console.log("Sign up success");
    } else if (error) {
      // toast.error(error);
      alert("Đăng ký thất bại.");
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ firstname, lastname, email, password }));
  };
  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="g-0 align-items-center">
        <MDBCol col="6">
          <MDBCard
            className="my-5 cascading-right"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Đăng ký</h2>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name"
                      value={firstname}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      id="form1"
                      type="text"
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name
                      required"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      id="form2"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  id="form3"
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="form4"
                  type="password"
                />
                {/* Nhớ mật khẩu */}
                {/* <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Nhớ mật khẩu"
                />
              </div> */}
                <MDBBtn
                  type="submit"
                  id="dkBtn"
                  className="w-100 mb-4"
                  size="md"
                >
                  Đăng ký
                </MDBBtn>
              </form>
              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col="6">
          <img
            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
            className="w-100 rounded-4 shadow-4"
            alt=""
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;
