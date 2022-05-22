import { useState, useEffect } from 'react'
import { FaSignInAlt} from 'react-icons/fa'
const Login = () => {
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
   const onsubmitHanlder = (e) => {
      e.preventDefault()
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