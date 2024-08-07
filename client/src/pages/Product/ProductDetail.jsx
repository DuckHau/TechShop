import { useEffect, useState } from "react";
import { Disclosure, Tab } from "@headlessui/react";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../../redux/Actions/ProductAction";
import MoonLoader from "react-spinners/MoonLoader";
import { MDBBtn } from "mdb-react-ui-kit";
import { addToCart } from "../../redux/Actions/CartAction";
import toast from "react-hot-toast";
import axios from "axios";
import { port } from "../../Utils/Util";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 2,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 3,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 4,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};
// const relatedProducts = [
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 2,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 3,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 4,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   // More products...
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, products } = productDetails;

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);

  const getRelatedProducts = async (currentProductCategory) => {
    // Fetch all products
    const response = await axios.get(`${port}/product/admin`);
    const allProducts = Object.values(response.data.data);

    // Filter out products that match the current product's category
    const relatedProducts = allProducts.filter(
      (product) => product.category?._id === currentProductCategory
    );

    return relatedProducts;
  };

  const handleSeeMore = () => {
    if (displayCount >= relatedProducts.length) {
      navigate("/Products");
    } else {
      setDisplayCount(displayCount + 4);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (products) {
        // Only run if products is defined
        const currentProductCategory = products.category?._id;
        const data = await getRelatedProducts(currentProductCategory);
        setRelatedProducts(data);
      }
    };

    fetchData();
  }, [products]);

  useEffect(() => {
    dispatch(detailProduct(slug));
  }, [dispatch, slug]);

  // Chỉnh giá theo VND
  let priceNumber, value, formattedValue;
  if (products && products.price) {
    priceNumber = parseFloat(products.price.$numberDecimal);
    value = priceNumber * 1000000;
    formattedValue = value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <div>
      {loading ? (
        <div style={{ position: "absolute", right: "700px", top: "400px" }}>
          <div className="flex justify-center items-center">
            <MoonLoader color="#f59e0b" size={150} />
          </div>
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="bg-white">
          <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              {/* Product */}
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                {/* Image gallery */}
                <Tab.Group as="div" className="flex flex-col-reverse">
                  {/* Image selector */}
                  <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                      {products.proImg?.map((img) => (
                        <Tab
                          key={img._id}
                          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img
                                  src={img.img}
                                  alt=""
                                  className="h-full w-full object-cover object-center"
                                />
                              </span>
                              <span
                                className={classNames(
                                  selected
                                    ? "ring-indigo-500"
                                    : "ring-transparent",
                                  "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>

                  <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                    {products.proImg?.map((img) => (
                      <Tab.Panel key={img._id}>
                        <img
                          src={img.img}
                          alt=""
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                        />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {products.name}
                  </h1>
                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-gray-900">
                      {/* {products.price && products.price.$numberDecimal
                        ? parseFloat(products.price.$numberDecimal).toFixed(3)
                        : ""}
                      .000đ */}
                      {formattedValue}
                      {/* <span className="font-medium text-gray-500">VNĐ</span> */}
                    </p>
                  </div>
                  {/* Reviews */}
                  <div className="mt-3">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.rating > rating
                                ? "text-indigo-500"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{product.rating} out of 5 stars</p>
                    </div>
                  </div>
                  <div className="mt-6 gap-2">
                    <h3 className="sr-only">Description</h3>
                    <div
                      className="space-y-6 text-base text-black font-medium"
                      style={{ fontSize: "18px" }}
                    >
                      <div>✔ Bảo hành chính hãng 12 tháng. </div>
                      <div>✔ Hỗ trợ đổi mới trong 7 ngày.</div>
                      <div> ✔ Windows bản quyền tích hợp. </div>
                      <div> ✔ Miễn phí giao hàng toàn quốc.</div>
                    </div>

                    <div
                      className="space-y-6 text-base text-gray-700"
                      dangerouslySetInnerHTML={{ __html: products.description }}
                    />
                  </div>
                  {/* //stock check */}
                  <form className="mt-6">
                    <div className="mt-10 flex">
                      {products.stock > 0 ? (
                        <MDBBtn
                          name="Mua"
                          type="button"
                          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                          onClick={() => {
                            const { _id, name, price } = products;
                            const img = products.proImg[0]?.img;
                            const rs = dispatch(
                              addToCart({ _id, name, price, img })
                            );
                            if (rs) {
                              // toast.success("Đã thêm vào giỏ hàng");
                              alert("Đã thêm vào giỏ hàng.");
                            } else {
                              // toast.error("Lỗi!!!");
                              alert("Có lỗi xảy ra, vui lòng thử lại");
                            }
                          }}
                        >
                          Mua
                        </MDBBtn>
                      ) : (
                        <div className="mt-6">
                          <h3 className="sr-only">Quantity</h3>
                          <p
                            id="outStock"
                            className="
                        text-2xl font-semibold"
                            style={{ color: "#FF0000" }}
                          >
                            Hết hàng
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <HeartIcon
                          className="h-6 w-6 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Add to favorites</span>
                      </button>
                    </div>
                  </form>
                  <section aria-labelledby="details-heading" className="mt-12">
                    <h2 id="details-heading" className="sr-only">
                      Additional details
                    </h2>

                    <div className="divide-y divide-gray-200 border-t">
                      {product.details.map((detail) => (
                        <Disclosure as="div" key={detail.name}>
                          {({ open }) => (
                            <>
                              <h3>
                                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                  <span
                                    className={classNames(
                                      open
                                        ? "text-indigo-600"
                                        : "text-gray-900",
                                      "text-sm font-medium"
                                    )}
                                    style={{ fontSize: "18px" }}
                                  >
                                    Cấu hình
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel
                                as="div"
                                className="prose prose-sm pb-6"
                              >
                                <ul role="list">
                                  <span className="bold">CPU:</span>{" "}
                                  {products.richdescription?.cpu}
                                </ul>
                                <ul role="list">
                                  <span className="bold">RAM: </span>{" "}
                                  {products.richdescription?.ram}
                                </ul>
                                <ul role="list">
                                  <span className="bold">VGA:</span>{" "}
                                  {products.richdescription?.vga}
                                </ul>
                                <ul role="list">
                                  <span className="bold"> Ổ cứng: </span>
                                  {products.richdescription?.ssd}
                                </ul>
                                <ul role="list">
                                  <span className="bold">Màn hình:</span>
                                  {products.richdescription?.display}
                                </ul>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <section
                aria-labelledby="related-heading"
                className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
              >
                <h2
                  id="related-heading"
                  className="text-xl font-bold text-gray-900"
                >
                  Sản phẩm liên quan:
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                  {relatedProducts.slice(0, displayCount).map((product) => (
                    <div
                      key={product._id}
                      className="group relative

                      "
                      onClick={() => navigate(`/products/${product.slug}`)}
                    >
                      <div className="relative">
                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                          <img
                            src={product.proImg[0]?.img}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="relative mt-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h3>
                        </div>
                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                          <p className="relative text-lg font-semibold text-white">
                            {formattedValue}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <MDBBtn
                          onClick={() => {
                            const { _id, name, price } = product;
                            const img = product.proImg[0]?.img;
                            const rs = dispatch(
                              addToCart({ _id, name, price, img })
                            );
                            if (rs) {
                              toast.success("Đã thêm vào giỏ hàng");
                            } else {
                              toast.error("Lỗi!!!");
                            }
                          }}
                          className="flex max-w-xs flex-1 items-center justify-center rounded-md
                          border border-transparent bg-indigo-600 py-3 px-8 text-base
                          font-medium text-white hover:bg-indigo-700 focus:outline-none
                           focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                           focus:ring-offset-gray-50 sm:w-full sm:h-10"
                          color="white"
                          style={{
                            color: "white",
                            backgroundColor: "#4138c2",
                            fontSize: "15px",
                          }}
                        >
                          Thêm vào giỏ hàng
                          <span className="sr-only">, {product.name}</span>
                        </MDBBtn>
                      </div>
                    </div>
                  ))}
                  <a
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={handleSeeMore}
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    Xem thêm...
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
