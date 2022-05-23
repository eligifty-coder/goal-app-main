import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../store/goals/goalSlice'

const GoalItem = ({ goal , setId }) => {
   const dispatch =useDispatch()
   const handleDelete = (e) => {
      dispatch(deleteGoal(goal._id))
      e.stopPropagation()
   }
   return (
      <div className='goal' onClick={()=>setId(goal._id)} >
         <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
         </div>
         <h2>{goal.text}</h2>
         <button onClick={handleDelete} className='close' >X</button>
      </div>
   )
}

export default GoalItem