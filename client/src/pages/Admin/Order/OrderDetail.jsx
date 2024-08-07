import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  deleteOrder,
  fetchDetailsOrders,
  updateOrder
} from '../../../redux/Actions/OrderAction'
import MoonLoader from 'react-spinners/MoonLoader'
import toast from 'react-hot-toast'

const OrderDetail = () => {
  const { id } = useParams()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus)
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchDetailsOrders(id))
  }, [dispatch, id])
  useEffect(() => {
    setOrderStatus(order?.orderStatus)
  }, [order])
  const handleChange = (event) => {
    if (orderStatus === 'delivered') {
      toast.error('Đơn hàng đã được hoàn thành!!!')
      return
    }
    const newOrderStatus = event.target.value

    setOrderStatus(newOrderStatus)
    // Send a request to your API to update the order status here
    dispatch(updateOrder(id, newOrderStatus))
      .then(() => {
        // Handle the success case if the update is successful
        console.log('Order status updated successfully')
      })
      .catch((error) => {
        // Handle the error case if the update fails
        console.error('Failed to update order status:', error)
      })
  }

  const handleDelete = () => {
    // Send a request to your API to delete the order here
    dispatch(deleteOrder(id))
      .then(() => {
        // Handle the success case if the delete is successful
        console.log('Order deleted successfully')
        toast.success('Đơn hàng đã được xóa!!!')
        setIsModalOpen(false)
      })
      .catch((error) => {
        // Handle the error case if the delete fails
        toast.error('Đã xảy ra lỗi khi xóa đơn hàng!!!')
        console.error('Failed to delete order:', error)
      })
  }

  const priceNumber = parseFloat(order?.totalPrice?.$numberDecimal)
  const formattedValue = Number(priceNumber).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })

  return (
    <div>
      {loading ? (
        <div style={{ position: 'absolute', right: '700px', top: '400px' }}>
          <div className='flex justify-center items-center'>
            <MoonLoader color='#f59e0b' size={150} />
          </div>
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <section className='bg-white dark:bg-gray-900'>
          <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
            <h1 className='mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white'>
              Chi tiết đơn hàng
            </h1>
            <p className='mb-4 text-lg font-bold leading-none text-gray-900 md:text-2xl dark:text-white'>
              Ngày đặt :{' '}
              {order?.createdAt &&
                new Date(order?.createdAt).toLocaleDateString()}
            </p>
            <ul className='mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white'>
              Khách hàng :
              <div className='ml-4 flex gap-3'>
                <li style={{ fontSize: '20px' }}>
                  Tên:{' '}
                  <span className='font-normal'>
                    {order?.user?.firstname} {order?.user?.lastname}
                  </span>
                </li>
                <li style={{ fontSize: '20px' }}>
                  {' '}
                  Email:{' '}
                  <span className='font-normal'> {order?.user?.email}</span>
                </li>
                {/* <li className="ml-4" style={{ fontSize: "20px" }}>
            {" "}
            Địa chỉ:{" "}
            <span className="font-normal"> {order?.user?.address}</span>
          </li> */}
              </div>
            </ul>
            <dl>
              <dt className='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
                Chi tiết đơn hàng
              </dt>
              <dd className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400'>
                {order?.items?.map((item) => (
                  <div
                    key={item.productId}
                    className='ml-4 font-bold text-gray-500'
                  >
                    <p>
                      Sản phẩm:{' '}
                      <span className='text-gray-900'>
                        {item.productId.name}
                      </span>
                    </p>
                    <p>
                      Số lượng:{' '}
                      <span className='text-gray-900'>
                        {' '}
                        {item.purchasedQty}
                      </span>
                    </p>
                    <p>
                      Giá:{' '}
                      <span className='text-gray-900'>{formattedValue}</span>
                    </p>
                  </div>
                ))}
              </dd>
            </dl>
            <dl className='flex items-center space-x-6'>
              <div>
                <dt className='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>
                  Tình trạng
                </dt>
                <dd className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400'>
                  <select
                    value={orderStatus}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                  >
                    <option value='ordered'>Đã đặt hàng</option>
                    <option value='processing'>Đang xử lý</option>
                    <option value='delivered'>Hoàn thành</option>
                    <option value='cancelled'>Đã hủy</option>
                  </select>
                </dd>
              </div>
            </dl>
            <div className='flex items-center space-x-4'>
              <button
                type='button'
                className='text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                <svg
                  aria-hidden='true'
                  className='mr-1 -ml-1 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                  <path
                    fillRule='evenodd'
                    d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                    clipRule='evenodd'
                  />
                </svg>
                Edit
              </button>
              <button
                type='button'
                id='deleteButton'
                data-modal-target='deleteModal'
                data-modal-toggle='deleteModal'
                onClick={handleDelete}
                className='inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
              >
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 mr-1.5 -ml-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                Delete
              </button>
              {isModalOpen && (
                <div
                  id='deleteModal'
                  tabIndex='-1'
                  aria-hidden='true'
                  className='hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full'
                >
                  <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
                    {/* <!-- Modal content --> */}
                    <div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
                      <button
                        type='button'
                        className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                        data-modal-toggle='deleteModal'
                      >
                        <svg
                          aria-hidden='true'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span className='sr-only'>Close modal</span>
                      </button>
                      <svg
                        className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <p className='mb-4 text-gray-500 dark:text-gray-300'>
                        Are you sure you want to delete this item?
                      </p>
                      <div className='flex justify-center items-center space-x-4'>
                        <button
                          data-modal-toggle='deleteModal'
                          type='button'
                          onClick={handleClose}
                          className='py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                        >
                          No, cancel
                        </button>
                        <button
                          type='submit'
                          className='py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* <!-- Main modal --> */}
    </div>
  )
}

export default OrderDetail
