import {useEffect,useState, useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'
import {getGoals, reset} from '../store/goals/goalSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {
   const { user, } = useSelector((state) => state.auth)
   const { goals , isError, isLoading, message} = useSelector((state) => state.goals)
   const dispatch = useDispatch()
   const [id, setId] = useState('')

   const navigate = useNavigate()
   const gettingGoals = useCallback(() => {
      dispatch(getGoals())
   },[dispatch])
   useEffect(() => {
      if (isError) {
         console.log(message)
      }

      if (!user) {
         navigate('/login')
      }

      

      return () => {
         dispatch(reset())
      }
   }, [user, navigate, isError, message, dispatch,])


   useEffect(() => { 
      gettingGoals()
   }, [gettingGoals, user,])

   if (isLoading) {
      return <Spinner />
   }


   return (
      <>
         <section className='heading' >
            <h1>Welcome {user && user.name}</h1>
            <p>Goals Dashboard</p>
         </section>
         <GoalForm id={id} setId={setId} />
         <section className="content">
            {goals.length > 0 ? (<div className='goals'> 
               {goals.map(goal => {
                  return <GoalItem key={goal._id} goal={goal} setId={ setId}/>
               })}
            </div>) : (<h3>You have not set any goals</h3>) }
         </section>
      </>
   )
}

export default Dashboard