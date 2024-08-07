import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "../../redux/Actions/CartAction";
import { createOrder } from "../../redux/Actions/OrderAction";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import toast from "react-hot-toast";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];
const paymentMethods = [
  { id: "COD", title: "COD" },
  { id: "VNPAY", title: "VNPAY" },
  { id: "PayOS", title: "PayOS" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CheckOut = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const orderState = useSelector((state) => state.newOrder);
  const { loading, order, error } = orderState;

  const totalPrice = Object.values(cartItems).reduce(
    (total, item) =>
      total + item.price.$numberDecimal * item.quantity * 1000000,
    0
  );

  const formattedValue = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const removeCartItemHandler = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  const cartItemsArray = Object.values(cartItems);

  const submitOrder = (event) => {
    event.preventDefault();
    const reformattedCartItems = cartItemsArray.map((item) => ({
      productId: item._id,
      payablePrice: Number(item.price.$numberDecimal),
      purchasedQty: item.quantity,
    }));

    try {
      const rs = dispatch(createOrder(reformattedCartItems, totalPrice));
      if (rs) {
        toast.success("Đặt hàng thành công");
        setTimeout(() => {
          navigate("/order-success");
        }, 1000);
      } else {
        toast.error("Đặt hàng thất bại");
        setTimeout(() => {
          navigate("/order-failed");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  let action = "";
  if (selectedPaymentMethod === "VNPAY") {
    action = "http://localhost:8080/order/create_payment_url";
  } else if (selectedPaymentMethod === "PayOS") {
    action = "http://localhost:8080/order/create-payment-link";
  }

  let method = "";
  if (selectedPaymentMethod === "VNPAY" || selectedPaymentMethod === "PayOS") {
    method = "POST";
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          action={action}
          method={method}
          onSubmit={submitOrder}
        >
          <div>
            {/* <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    // id="email-address"
                    // name="email-address"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div> */}

            {/* <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      // id="first-name"
                      // name="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      // id="last-name"
                      // name="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      // name="address"
                      // id="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      // name="city"
                      // id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      // name="region"
                      // id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      // name="phone"
                      // id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Delivery method
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      <input
                        id={paymentMethod.id}
                        // name="payment-type"
                        type="radio"
                        defaultChecked={paymentMethodIdx === 0}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={() =>
                          setSelectedPaymentMethod(paymentMethod.id)
                        }
                      />
                      <label htmlFor={paymentMethod.id}>
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              {selectedPaymentMethod === "COD" && (
                <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                  <div className="col-span-4"></div>
                </div>
              )}
              {/* VNPAY form */}
              {selectedPaymentMethod === "VNPAY" && (
                // <form
                //   className="pt-3"
                //   id="createOrder"
                //   action="http://localhost:8080/order/create_payment_url"
                //   method="POST"
                //
                <>
                  <div className="form-group">
                    <input
                      className="form-control"
                      id="amount"
                      name="orderId"
                      value={Math.random().toString(36).substring(2)}
                      type="hidden"
                    />
                  </div>
                  <div className="mt-1">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                    >
                      Số tiền
                    </label>
                    <input
                      style={{ color: "black", fontWeight: "400" }}
                      id="amount"
                      name="amount"
                      placeholder="Số tiền"
                      className="block w-52 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={parseInt(formattedValue.replace(/[^\d]/g, ""), 10)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="payment-method"
                      className="block text-sm font-medium text-gray-700"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginTop: "10px",
                        fontSize: "17px",
                      }}
                    >
                      Chọn Phương thức thanh toán:
                    </label>
                    <div className="controls grid">
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="bankCode"
                          id="defaultPaymentMethod"
                          value=""
                          defaultChecked
                        />{" "}
                        Cổng thanh toán VNPAYQR
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="bankCode"
                          id="vnpayqrPaymentMethod"
                          value="VNPAYQR"
                        />{" "}
                        Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="bankCode"
                          id="vnbankPaymentMethod"
                          value="VNBANK"
                        />{" "}
                        Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="bankCode"
                          id="intcardPaymentMethod"
                          value="INTCARD"
                        />{" "}
                        Thanh toán qua thẻ quốc tế
                      </label>
                    </div>
                  </div>

                  <div className="form-group hidden">
                    <label>Ngôn ngữ</label>
                    <div className="controls">
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="language"
                          id="vnLanguage"
                          value="vn"
                          defaultChecked
                        />{" "}
                        Tiếng việt
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="language"
                          id="enLanguage"
                          value="en"
                        />{" "}
                        Tiếng anh
                      </label>
                    </div>
                  </div>

                  {/* <MDBBtn
                    color="primary"
                    style={{
                      marginTop: "15px",
                      color: "white",
                      backgroundColor: "#4138c2",
                    }}
                    className="btn btn-default"
                    id="btnPopup"
                    type="submit"
                  >
                    Thanh toán
                  </MDBBtn> */}
                  {/* </form> */}
                </>
              )}
              {/* PayOS form */}
              {selectedPaymentMethod === "PayOS" && (
                <>
                  {" "}
                  <label
                    className="block text-sm font-medium text-gray-700"
                    name="payablePrice"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
                  >
                    Số tiền
                  </label>
                  <input
                    style={{ color: "black", fontWeight: "400" }}
                    id="amount"
                    name="amount"
                    placeholder="Số tiền"
                    className="block w-52 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={parseInt(formattedValue.replace(/[^\d]/g, ""), 10)}
                    readOnly
                  />
                </>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul
                role="list"
                className="divide-y divide-gray-200"
                name="cartItems"
              >
                {Object.keys(cartItems).map((key) => (
                  <li key={key} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={cartItems[key].img}
                        alt={cartItems[key].imageAlt}
                        className="h-24 w-24 rounded-md object-cover object-center"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={cartItems.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {cartItems[key].name}
                            </a>
                          </h4>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            onClick={() => removeCartItemHandler(key)}
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {cartItems[key].price.$numberDecimal}
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <p
                            id="quantity"
                            name="quantity"
                            className="text-sm font-medium text-gray-900"
                          >
                            Số lượng: {cartItems[key].quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formattedValue}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd
                    className="text-base font-medium text-gray-900"
                    name="totalPrice"
                    id="totalPrice"
                  >
                    {formattedValue}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <MDBBtn
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Xác nhận đặt hàng
                </MDBBtn>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
