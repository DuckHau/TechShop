import image from '../../assets/EmtyCart/EmtyCart.svg'
import { MDBBtn } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
const EmptyCart = () => {
  const navigate = useNavigate()
  return (
    <div>
      <img src={image} alt='Empty Cart' className='w-1/2 mx-auto pt-10' />
      <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>
        Giỏ hàng của bạn đang không có zì.
      </h2>
      <p className='mt-4 text-2xl text-gray-500 text-center'>
        Hãy ghé ngay trang chủ để tìm được những ưu đãi hấp dẫn nhất.
      </p>
      <div className='mt-8 text-center'>
        <MDBBtn
          className='h-12 mx-auto mt-8 font-bold'
          style={{
            width: '200px',
            backgroundColor: '#4138c2',
            fontSize: '14px'
          }}
          onClick={() => navigate('/Products')}
        >
          Mua sắm ngay
        </MDBBtn>
      </div>
    </div>
  )
}

export default EmptyCart
