import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography
} from 'mdb-react-ui-kit'
import './MyOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { MyOrderAction, deleteOrder } from '../../../redux/Actions/OrderAction'
import toast from 'react-hot-toast'

const MyOrder = () => {
  const dispatch = useDispatch()
  const myOrder = useSelector((state) => state.myOrder)
  const { loading, error, orders } = myOrder
  useEffect(() => {
    dispatch(MyOrderAction())
  }, [dispatch])

  const handleDelete = (id) => {
    if (orders.map((order) => order?.orderStatus === 'delivered')) {
      toast.error('Đơn hàng đã hoàn thành không thể hủy!!!')
      return
    }
    dispatch(deleteOrder(id))
      .then(() => {
        // Handle the success case if the delete is successful
        console.log('Order deleted successfully')
        toast.success('Đơn hàng đã được xóa!!!')
      })
      .catch((error) => {
        // Handle the error case if the delete fails
        toast.error('Đã xảy ra lỗi khi xóa đơn hàng!!!')
        console.error('Failed to delete order:', error)
      })
  }

  return (
    <section className='vh-100 gradient-custom-2'>
      <MDBContainer className='py-5 h-100'>
        <MDBRow className='justify-content-center align-items-center h-100 grid-cols-7'>
          {orders?.length === 0
            ? (
              <div className='text-center'>
                <h1>Chưa có đơn hàng nào</h1>
              </div>
              )
            : null}
          {orders?.map((order) => {
            const priceNumber = parseFloat(order?.totalPrice?.$numberDecimal)
            const formattedValue = Number(priceNumber).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })
            return (
              <MDBCol md='10' lg='8' xl='6' key={order?._id}>
                <MDBCard
                  className='card-stepper'
                  style={{ borderRadius: '16px' }}
                >
                  <MDBCardHeader className='p-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div>
                        <p className='text-muted mb-2'>
                          {' '}
                          Mã đơn hàng:{' '}
                          <span className='fw-bold text-body'>
                            {order?._id}
                          </span>
                        </p>
                        <p className='text-muted mb-0'>
                          {' '}
                          Đặt ngày:{' '}
                          <span className='fw-bold text-body'>
                            {new Date(order?.createdAt).toLocaleDateString()}
                          </span>{' '}
                        </p>
                      </div>
                      <div>
                        <MDBTypography tag='h6' className='mb-0'>
                          {' '}
                          <a href='#'>Xem chi tiết</a>{' '}
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCardHeader>
                  <MDBCardBody className='p-4'>
                    <div className='d-flex flex-row mb-4 pb-2'>
                      <div className='flex-fill'>
                        <MDBTypography tag='h5' className='bold'>
                          {order?.items?.map((item) => (
                            <div
                              key={item.productId}
                              className='font-bold text-gray-800'
                            >
                              <p>{item.productId?.name}</p>
                            </div>
                          ))}
                        </MDBTypography>
                        <p className='text-muted'>
                          {' '}
                          Số lượng: {order?.items?.length}
                        </p>
                        <MDBTypography tag='h4' className='mb-3'>
                          {' '}
                          {formattedValue}{' '}
                          <span className='small text-muted'>
                            {' '}
                            via ({order?.paymentType}){' '}
                          </span>
                        </MDBTypography>
                        <p className='text-muted'>
                          Thời gian tra cứu:{' '}
                          <span className='text-body'>
                            {new Date().toLocaleTimeString().substring(0, 4)}
                            {'    '}
                            {new Date().toLocaleDateString().substring(0, 10)}
                          </span>
                        </p>
                      </div>
                      <div>
                        <MDBCardImage
                          fluid
                          className='align-self-center'
                          src={order?.items?.[0]?.productId?.proImg?.[0]?.img}
                          width='250'
                        />
                      </div>
                    </div>

                    <ul
                      id='progressbar-1'
                      className='mx-0 mt-0 mb-5 px-0 pt-0 pb-4'
                    >
                      <li
                        className={`step0 ${
                          order.orderStatus === 'ordered' ||
                          order.orderStatus === 'processing' ||
                          order.orderStatus === 'delivered'
                            ? 'active'
                            : ''
                        }`}
                        id='step1'
                      >
                        <span style={{ marginLeft: '22px', marginTop: '12px' }}>
                          Đã đặt
                        </span>
                      </li>
                      <li
                        className={`step0 ${
                          order.orderStatus === 'processing' ||
                          order.orderStatus === 'delivered'
                            ? 'active'
                            : ''
                        } text-center`}
                        id='step2'
                      >
                        <span>Đang xử lý</span>
                      </li>
                      <li
                        className={`step0 ${
                          order.orderStatus === 'delivered' ? 'active' : ''
                        } text-muted text-end`}
                        id='step3'
                      >
                        <span style={{ marginRight: '22px' }}>Hoàn thành</span>
                      </li>
                    </ul>
                  </MDBCardBody>
                  <MDBCardFooter className='p-4'>
                    <div className='d-flex justify-content-between'>
                      <MDBTypography tag='h5' className='fw-normal mb-0'>
                        <a href='#!'>Tra cứu</a>
                      </MDBTypography>
                      <div className='border-start h-100' />
                      {order?.orderStatus === 'delivered'
                        ? null
                        : (
                          <MDBTypography tag='h5' className='fw-normal mb-0'>
                            <div
                              type='button'
                              onClick={() => handleDelete(order._id)}
                              style={{ cursor: 'pointer' }}
                            >
                              Hủy
                            </div>
                          </MDBTypography>
                          )}

                      <div className='border-start h-100' />

                      <div className='border-start h-100' />
                      <MDBTypography tag='h5' className='fw-normal mb-0'>
                        <a href='#!' className='text-muted'>
                          <MDBIcon fas icon='ellipsis-v' />
                        </a>
                      </MDBTypography>
                    </div>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            )
          })}
        </MDBRow>
      </MDBContainer>
    </section>
  )
}

export default MyOrder
