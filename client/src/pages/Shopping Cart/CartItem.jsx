import PropTypes from "prop-types";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.cartItem.quantity);
  const { _id, name, price, img } = props.cartItem;

  const increaseQty = () => {
    setQuantity(quantity + 1);
    props.increaseQty(_id, quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
    props.decreaseQty(_id, quantity - 1);
  };
  const priceNumber = Number(price.$numberDecimal);
  const value = priceNumber * 1000000;
  const formattedValue = value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const numericValue = parseInt(formattedValue.replace(/[^\d]/g, ""));
  const totalPrice = numericValue * quantity;
  const formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-b border-gray-200"
      >
        <li key={_id} className="flex py-6 sm:py-10">
          <div className="flex-shrink-0">
            <img
              src={img}
              alt=""
              className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <a
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      href="#"
                      className="font-medium  text-gray-700 hover:text-gray-800"
                    >
                      {name}
                    </a>
                  </h3>
                </div>
                <p
                  style={{ fontSize: "18px" }}
                  className="mt-1 text-sm font-medium text-gray-900"
                >
                  {formattedValue}
                </p>
              </div>
              {props.showButtons && (
                <div className="flex">
                  <IndeterminateCheckBoxIcon
                    sx={{
                      height: "60px",
                      width: "60px",
                      marginTop: "30px",
                      marginLeft: "25px",
                      color: "#4138c2",
                    }}
                    id="decrease-quantity"
                    color="blue"
                    variant="contained"
                    className=" hover:text-gray-400 rounded-none h-5 w5"
                    aria-hidden="true"
                    onClick={decreaseQty}
                  />

                  <div
                    className="relative w-14 text-center "
                    style={{ top: "38px" }}
                  >
                    <TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      inputProps={{
                        style: {
                          height: "10px",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "500",
                        },
                      }}
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      variant="filled"
                      name="quantity"
                      value={quantity}
                      className="border border-gray-300 rounded-lg text-center font-semibold"
                    />
                  </div>

                  <AddBoxIcon
                    sx={{
                      height: "60px",
                      width: "60px",
                      marginTop: "30px",
                      marginRight: "25px",
                      color: "#4138c2",
                    }}
                    id="increase-quantity"
                    variant="contained"
                    className=" hover:text-gray-400"
                    onClick={increaseQty}
                  />

                  <div className="absolute top-36 left-0">
                    <DeleteIcon
                      sx={{ height: "40px", width: "40px", color: "red" }}
                      id="delete-item"
                      variant="contained"
                      className=" hover:text-gray-400"
                      onClick={() => props.onRemoveCartItem(_id)}
                    />
                  </div>
                </div>
              )}
              {/* Tổng tiền 1 sp */}
              <div
                style={{ fontSize: "22px" }}
                className="relative left-64 top-10 text-right text-sm font-medium text-gray-900"
              >
                {formattedTotalPrice}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.shape({ $numberDecimal: PropTypes.string }).isRequired,
    img: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  increaseQty: PropTypes.func.isRequired,
  decreaseQty: PropTypes.func.isRequired,
};

export default CartItem;
