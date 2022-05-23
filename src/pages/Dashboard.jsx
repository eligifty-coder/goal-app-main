import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Dashboard() {
   const { user, } = useSelector((state) => state.auth)
   const navigate = useNavigate()
      useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user, navigate])

   return (
      <div>Dashboard</div>
   )
}

export default Dashboard