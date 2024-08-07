import PropTypes from "prop-types"; // Import PropTypes
const getOrderStatusText = (orderStatus) => {
  switch (orderStatus) {
    case "ordered":
      return "Đã đặt hàng";
    case "delivered":
      return "Hoàn thành";
    case "canceled":
      return "Đã huỷ";
    default:
      return "Đang xử lý";
  }
};

const getOrderStatusColor = (orderStatus) => {
  switch (orderStatus) {
    case "ordered":
      return "bg-red-700";
    case "delivered":
      return "bg-green-700";
    case "canceled":
      return "bg-gray-700";
    default:
      return "bg-yellow-700";
  }
};
const OrderStatusBadge = ({ order }) => {
  const orderStatusText = getOrderStatusText(order.orderStatus);
  const orderStatusColor = getOrderStatusColor(order.orderStatus);

  return (
    <div className="flex items-center">
      <div
        className={`inline-block w-4 h-4 mr-2 rounded-full ${orderStatusColor}`}
      />
      {orderStatusText}
    </div>
  );
};

OrderStatusBadge.propTypes = {
  order: PropTypes.object.isRequired, // Add 'order' prop to props validation
};

export default OrderStatusBadge;
