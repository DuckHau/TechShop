import { Link } from 'react-router-dom'
import MetaData from '../../../components/Layout/MetaData'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import './style.css'

const Profile = () => {
  const auth = useSelector((state) => state.auth)

  return (
    <>
      <MetaData title='Your Profile' />

      <h2
        className='mt-5 ml-5'
        style={{
          fontWeight: 'bolder',
          fontSize: '3rem',
          textAlign: 'center'
        }}
      >
        My Profile
      </h2>
      <div className='row justify-content-around mt-5 user-info'>
        <div className='col-12 col-md-3'>
          <figure className='avatar avatar-profile'>
            <img className='rounded-circle img-fluid' src='' alt='' />
          </figure>
          <Link
            to='/me/update'
            id='edit_profile'
            className='btn btn-primary btn-block my-5'
          >
            Edit Profile
          </Link>
        </div>
        {auth?.user?.user
          ? (
            <div className='col-12 col-md-5' style={{ columnGap: '1rem' }}>
              <h4
                className='info'
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.3rem'
                }}
              >
                Full Name
              </h4>
              <p>
                {auth.user.user.firstname} {auth.user.user.lastname}
              </p>

              <h4
                className='info'
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.3rem'
                }}
              >
                Email Address
              </h4>
              <p>{auth.user.user.email}</p>
              <h4
                className='info'
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.3rem'
                }}
              >
                Joined On
              </h4>
              <p>{String(auth.user.user.createdAt).substring(0, 10)}</p>

              {auth.user.role !== 'admin' && (
                <Link to='/orders/me' className='btn btn-danger btn-block mt-5'>
                  My Orders
                </Link>
              )}

              <Link
                to='/password/update'
                className='btn btn-primary btn-block mt-3'
              >
                Change Password
              </Link>
            </div>
            )
          : (
            <p>Loading...</p>
            )}
      </div>
    </>
  )
}

export default Profile
