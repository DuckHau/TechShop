import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateUser, detailUser } from '../../../redux/Actions/UserAction'
import { useParams, useNavigate } from 'react-router-dom'
import MoonLoader from 'react-spinners/MoonLoader'

const UpdateUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  // const [images, setImages] = useState([]);
  // const [oldImages, setOldImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    dispatch(detailUser(id))
  }, [dispatch, id])

  const updatedUser = () => {
    const updatedUser = {
      firstname,
      lastname,
      password,
      email,
      role
    }
    dispatch(updateUser(id, updatedUser))
    navigate('/admin/user') // Navigate to the productList page after updating
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname)
      setLastName(user.lastname)
      setPassword(user.password)
      setEmail(user.email)
      setRole(user.role)
      // setOldImages(products.images);
    }
  }, [user])

  const submitHandler = (e) => {
    e.preventDefault()
    updatedUser()
  }

  return (
    <>
      <div className='row mt-5'>
        <div className='col-12 col-md-10 mt-5'>
          <>
            <div className='wrapper my-5'>
              <h1 className='mb-4'>User Details</h1>

              {loading ? (
                <div
                  style={{ position: 'absolute', right: '700px', top: '400px' }}
                >
                  <div className='flex justify-center items-center'>
                    <MoonLoader color='#f59e0b' size={150} />
                  </div>
                </div>
              ) : error ? (
                <h1>{error}</h1>
              ) : (
                <form onSubmit={submitHandler} noValidate>
                  <div className='form-group'>
                    <label htmlFor='firstname_field'>Tên đầu</label>
                    <input
                      type='text'
                      id='firstname_field'
                      className='form-control'
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='lastname_field'>Tên cuối</label>
                    <input
                      type='text'
                      id='lastname_field'
                      className='form-control'
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password_field'>Mật khẩu</label>
                    <input
                      type='text'
                      id='password_field'
                      className='form-control'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='email_field'>Email</label>
                    <input
                      type='text'
                      id='email_field'
                      className='form-control'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='role_field'>Chức năng</label>
                    <select
                      className='form-control'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value='admin'>Admin</option>
                      <option value='user'>User</option>
                    </select>
                  </div>

                  {/* <div className="form-group">
                    <label>Images</label>
                    {products.proImg?.map((img) => (
                      <img
                        key={img._id}
                        src={img.img}
                        alt=""
                        className="img-fluid"
                      />
                    ))}
                  </div> */}
                  <button
                    id='login_button'
                    type='submit'
                    className='btn btn-block py-3'
                  >
                    Update
                  </button>
                </form>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default UpdateUser
