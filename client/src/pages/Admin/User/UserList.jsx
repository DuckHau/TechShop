import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import './Modal.css'

// import MetaData from "../../../components/Layout/MetaData";
// import Loader from "../../../components/Layout/Loader";
// import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { listUser, deleteUser } from '../../../redux/Actions/UserAction'

const UserList = () => {
  // Modal để hiển thị thông báo xoá
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState(null)

  const openConfirmModal = (id) => {
    setUserIdToDelete(id)
    setShowConfirmModal(true)
  }

  const closeConfirmModal = () => {
    setUserIdToDelete(null)
    setShowConfirmModal(false)
  }

  // Navigate
  const navigate = useNavigate()
  // Phân trang
  // Thêm state cho phân trang
  const [activePage, setActivePage] = useState(1)
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const dispatch = useDispatch()

  const { loading, error, users } = useSelector((state) => state.userList)

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
    closeConfirmModal() // Đóng modal sau khi xoá
    window.location.reload()
  }
  console.log(users)
  useEffect(() => {
    dispatch(listUser())
  }, [dispatch])
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Tên',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Giá',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Số lượng tồn',
          field: 'stock',
          sort: 'asc'
        },
        {
          label: 'Thao tác',
          field: 'actions'
        }
      ],
      rows: [] // Khởi tạo một mảng trống cho các hàng
    }

    if (user) {
      user.forEach((user) => {
        data.rows.push({
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          password: user.password,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link
                to={`/admin/update-user/${user._id}`}
                className='btn btn-primary py-1 px-2'
              >
                <i className='fa fa-pencil' />
              </Link>
              <button
                className='btn btn-danger py-1 px-2 ml-2'
                onClick={() => deleteUserHandler(user._id)}
              >
                <i className='fa fa-trash' />
              </button>
            </>
          )
        })
      })
    }

    return data
  }

  console.log('Users:', users)
  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 pt-5 m-2'>
        <div className='px-4 mx-auto max-w-screen-2xl lg:px-12'>
          <div className='relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg'>
            <div className='flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4'>
              <div className='flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3'>
                <button
                  onClick={() => navigate('/admin/create-user')}
                  type='button'
                  className='flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 4.5v15m7.5-7.5h-15'
                    />
                  </svg>
                  Thêm người dùng
                </button>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='p-4'>
                      <div className='flex items-center'>
                        <input
                          id='checkbox-all'
                          type='checkbox'
                          className='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label htmlFor='checkbox-all' className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </th>

                    <th scope='col' className='px-4 py-3'>
                      ID{' '}
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Tên đầu
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Tên cuối
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Email
                    </th>
                    <th scope='col' className='px-4 py-3'>
                      Chức năng
                    </th>
                    <th scope='col' className='px-4 py-3 w-25'>
                      Hành động
                    </th>
                  </tr>
                </thead>

                {/* Mapping data */}
                {users?.user
                  ?.slice((activePage - 1) * 5, activePage * 5)
                  .map((user) => (
                    <tbody key={user._id}>
                      {/* key={user._id}  copy xuống dưới tr */}
                      <tr
                        key={user._id}
                        className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        <td className='w-4 px-4 py-3'>
                          <div className='flex items-center'>
                            <input
                              id='checkbox-table-search-1'
                              type='checkbox'
                              onClick='event.stopPropagation()'
                              className='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />
                            <label
                              htmlFor='checkbox-table-search-1'
                              className='sr-only'
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th
                          scope='row'
                          className='flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          {user._id}
                        </th>
                        <td className='px-4 py-2'>
                          <span className='bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300'>
                            {user.firstname}
                          </span>
                        </td>
                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          <div className='flex items-center'>
                            {user.lastname}
                          </div>
                        </td>
                        {/* Saleday data */}
                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          {user.email}
                        </td>
                        {/* Sales/ month  */}
                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          {user.role}
                        </td>
                        {/* Hành động  */}
                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          <>
                            <Link
                              to={`/admin/update-user/${user._id}`}
                              className='btn btn-primary py-1 px-2'
                            >
                              <i className='fa fa-pencil' />
                            </Link>
                            <button
                              className='btn btn-danger py-1 px-2 ml-2'
                              onClick={() => openConfirmModal(user._id)}
                            >
                              <i className='fa fa-trash' />
                            </button>
                          </>
                        </td>
                      </tr>
                      {/* Modal xác nhận xoá sản phẩm */}
                      <div
                        className={`modal ${
                          showConfirmModal ? 'active' : 'hidden'
                        }`}
                      >
                        <div className='modal-content'>
                          <p>Bạn có chắc chắn muốn xoá người dùng này?</p>
                          <div
                            className='flex mt-4'
                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                          >
                            <button
                              onClick={() => {
                                deleteUserHandler(userIdToDelete)
                                closeConfirmModal()
                              }}
                              className='bg-red-500 text-white px-4 py-2 mr-2 rounded-md'
                            >
                              Xoá
                            </button>
                            <button
                              onClick={closeConfirmModal}
                              className='bg-gray-300 text-gray-800 px-4 py-2 rounded-md'
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    </tbody>
                  ))}
              </table>
            </div>
            {/* Thêm thanh phân trang */}
            <Pagination
              activePage={activePage}
              itemsCountPerPage={5}
              totalItemsCount={users?.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemclassName='page-item'
              linkclassName='page-link'
            />
            {/* <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
					<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
						Showing
						<span className="font-semibold text-gray-900 dark:text-white">1-10</span>
						of
						<span className="font-semibold text-gray-900 dark:text-white">1000</span>
					</span>

					<ul className="inline-flex items-stretch -space-x-px">
						<li>
							<a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
								<span className="sr-only">Previous</span>
								<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
							</a>
						</li>
						<li>
							<a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
						</li>
						<li>
							<a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
						</li>
						<li>
							<a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
						</li>
						<li>
							<a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
						</li>
						<li>
							<a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
						</li>
						<li>
							<a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
								<span className="sr-only">Next</span>
								<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
								</svg>
							</a>
						</li>
					</ul>
				</nav> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default UserList
