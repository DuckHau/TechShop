import "./Home.css";
import { Zoom } from "react-slideshow-image";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import ReactStarts from "react-rating-stars-component";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/Actions/ProductAction";
import { useEffect } from "react";

// import Sidebar from "../Header/Sidebar";

const images = ["images/Sale1.jpg", "images/Sale2.jpg"];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const handleClick = (productSlug) => {
    navigate(`/Products/${productSlug}`);
  };

  const handleLinkClick = (category) => {
    // Optionally, dispatch the action right away if needed
    dispatch(listProduct({ category: category }));

    // Navigate to the products page with the category query param
    // navigate(`/product-category/${category}`);
  };

  useEffect(() => {
    dispatch(listProduct("", 1, 4, 0, "", "")); // replace 10 with your desired number of results per page
  }, [dispatch]);

  return (
    <>
      {/* <Sidebar> */}
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative p-3">
                <div
                  className="img-fluid rounded-3"
                  onClick={() => {
                    dispatch(listProduct("", 1, 12, 0, "", ""));
                    navigate("/Products");
                  }}
                >
                  <Zoom scale={0.4} duration={1200}>
                    {images.map((each, index) => (
                      <img
                        key={index}
                        style={{ width: "100%", borderRadius: "15px" }}
                        src={each}
                      />
                    ))}
                  </Zoom>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="small-banner position-relative p-3">
                  <img
                    src="images/catbanner-01.jpg "
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>LapTops Max</h5>
                    <p className="price">Từ 22.499.000 </p>
                    <p className="price">đến 28.499.000</p>
                  </div>
                </div>
                <div className="small-banner position-relative p-3">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>Mua Bàn Phím</h5>
                    <p className="price">Từ 2.499.000 </p>
                    <p className="price">đến 5.499.000</p>
                  </div>
                </div>
                <div className="small-banner position-relative p-3">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>Mua Màn hình</h5>
                    <p className="price">Từ 5.499.000</p>
                    <p className="price"> đến 8.499.000 </p>
                  </div>
                </div>
                <div className="small-banner position-relative p-3">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>Mua Chuột</h5>
                    <p className="price">Từ 1.499.000</p>
                    <p className="price"> đến 2.499.000 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="servies d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Miễn phí Ship</h6>
                    <p className="mb-0">Cho các đơn hàng trong 5km</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Ưu đãi bất ngờ hàng ngày</h6>
                    <p className="mb-0">Tiết kiệm tới 25%</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Hỗ trợ 24/7</h6>
                    <p className="mb-0">Luôn sẵn sàng hỗ trợ</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Giá cả phải chăng</h6>
                    <p className="mb-0">Nhận giá trực tiếp tại xưởng</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Thanh toán an toàn</h6>
                    <p className="mb-0">Thanh toán được bảo vệ 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marque-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/lenovo.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/acer.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/asus.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/gigabyte.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/corsair.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/razer.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/hp.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/logitech.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 ">
        <div className="categories">
          <div className="container-xxl">
            <Link
              className="box"
              onClick={() => {
                dispatch(
                  listProduct("", 1, 12, 0, "6552ee08ea3b4606a040af7a", "")
                );
              }}
              to={"/Products"}
            >
              <div className="img_box">
                <img
                  src="images/Gigabyte_aorus_17_ehxepu.png"
                  alt="Laptop"
                ></img>

                <div className="detail">
                  <p>Laptop</p>
                </div>
              </div>
            </Link>
            <Link
              className="box"
              onClick={() => {
                dispatch(
                  listProduct("", 1, 12, 0, "6552ee08ea3b4606a040af7c", "")
                );
              }}
              to={"/Products"}
            >
              <div className="img_box">
                <img src="images/banphim.png" alt="Banphim"></img>
                <div className="detail">
                  <p>Bàn phím</p>
                </div>
              </div>
            </Link>
            <Link
              className="box"
              onClick={() => {
                dispatch(
                  listProduct("", 1, 12, 0, "6552ee08ea3b4606a040af7d", "")
                );
              }}
              to={"/Products"}
            >
              <div className="img_box">
                <img src="images/manhinh.png" alt="Manhinh"></img>
                <div className="detail">
                  <p>Màn Hình</p>
                </div>
              </div>
            </Link>
            <Link
              className="box"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("6552ee08ea3b4606a040af7b");
              }}
              to={"/product-category/6552ee08ea3b4606a040af7b"}
            >
              <div className="img_box">
                <img src="images/chuot1.png" alt="Chuot"></img>
                <div className="detail">
                  <p>Chuột</p>
                </div>
              </div>
            </Link>
            {/* <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                            <Link className="d-flex gap-30 align-items-center">
                            <div>
                            <h6>Cameras</h6>
                            <p>10 Items</p>
                            </div>
                            <img src="images/camera.jpg"
                            alt= "camera" />
                            </Link>
                            <Link className="d-flex gap-30 align-items-center">
                            <div>
                            <h6>Cameras</h6>
                            <p>10 Items</p>
                            </div>
                            <img src="images/camera.jpg"
                            alt= "camera" />
                            </Link>
                            <Link className="d-flex gap-30 align-items-center">
                            <div>
                            <h6>Cameras</h6>
                            <p>10 Items</p>
                            </div>
                            <img src="images/camera.jpg"
                            alt= "camera" />
                            </Link>
                            <Link className="d-flex gap-30 align-items-center">
                            <div>
                            <h6>Cameras</h6>
                            <p>10 Items</p>
                            </div>
                            <img src="images/camera.jpg"
                            alt= "camera" />
                            </Link>
                            </div> */}
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Laptop</h3>
            </div>

            {products.map((product) => {
              const priceNumber = parseFloat(product.price.$numberDecimal);
              const value = priceNumber * 1000000;
              const formattedValue = value.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              });
              return (
                <div className="col-3" key={product._id}>
                  <div
                    className="product-card position-relative lg:h-full"
                    onClick={() => handleClick(product.slug)}
                  >
                    <div className="wishlist-icon position-absolute">
                      <Link>
                        <img src="images/wish.svg" alt="wishlist" />
                      </Link>
                    </div>
                    <div className="product-image">
                      <img
                        src={product.proImg[0]?.img}
                        className="img-fluid"
                        alt="product image"
                      />
                      <img
                        src={product.proImg[1]?.img}
                        className="img-lfuid"
                        alt="product image"
                      />
                    </div>
                    <div className="product-details">
                      <h6
                        className="brand font-medium"
                        style={{ fontSize: "17px" }}
                      >
                        {product.name}
                      </h6>
                      <h5 className="product-title">{product.description}</h5>
                      <ReactStarts
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="price"> {formattedValue}</p>
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                        <Link>
                          <img src="images/prodcompare.svg" alt="compare" />
                        </Link>
                        <Link>
                          <img src="images/view.svg" alt="view" />
                        </Link>
                        <Link>
                          <img src="images/add-cart.svg" alt="addcart" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* </Sidebar> */}
    </>
  );
};

export default Home;
