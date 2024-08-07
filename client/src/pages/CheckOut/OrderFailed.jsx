import { Link } from "react-router-dom";

const OrderFailed = () => {
  return (
    <div className="container text-center">
      <h2 className="mt-5">Order failed!</h2>
      <p className="lead">Sorry, there was an error processing your order.</p>
      <Link to="/" className="btn btn-primary mt-5">
        Return Home
      </Link>
    </div>
  );
};

export default OrderFailed;
