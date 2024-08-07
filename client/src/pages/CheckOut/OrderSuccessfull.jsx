import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RESET_CART } from '../../redux/Constants/CartConstant'

const OrderSuccessful = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: RESET_CART })
  }, [dispatch])
  return (
    <div className='container text-center'>
      <h2 className='mt-5'>Order Successful!</h2>
      <p className='lead'>
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link to='/' className='btn btn-primary mt-5'>
        Return Home
      </Link>
    </div>
  )
}

export default OrderSuccessful
