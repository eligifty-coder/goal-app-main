import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../store/auth/authSlice'

const Login = () => {
   const dispatch = useDispatch()
   const { user, isSuccess, isError, isLoading, message } = useSelector(state => state.auth)
   const navigate = useNavigate()

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })
   const { email, password} = formData
   const onChange = (e) => {
      setFormData(prevState => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }
   useEffect(() => {
      if (isSuccess || user) {
         navigate('/')
      }
      if (isError) {
         toast.error(message)
      }
      dispatch(reset())

   }, [isError, isSuccess, user, dispatch, navigate, message])

   const onsubmitHanlder = (e) => {
      e.preventDefault()
      const userData = { email, password }
      dispatch(login(userData))
   }

   if (isLoading) {
      return <Spinner />
   }
   return (
      <>
         <section className='heading' >
            <h1>
               <FaSignInAlt /> Login
            </h1>
            <p>Login and start setting goals</p>
         </section>
         <section className="form">
            <form onSubmit={onsubmitHanlder} >
               <div className="form-group">
                  <input type="email"
                     id='email'
                     className='form-control'
                     name='email'
                     value={email}
                     placeholder='Enter your email'
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input type="password"
                     id='password'
                     className='form-control'
                     name='password'
                     value={password}
                     placeholder='Enter your password'
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <button type="submit" className="btn btn-block">SUbmit</button>
               </div>
            </form>
         </section>
      </>
   )
}

export default Login