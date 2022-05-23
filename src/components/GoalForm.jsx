import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGoal, updateGoal } from '../store/goals/goalSlice'

const GoalForm = ({ id, setId}) => {
   const { goals } = useSelector((state) => state.goals)
   const singleGoal = goals.find(goal => goal._id === id)
   const [text, setText] = useState('')
   useEffect(() => {
      setText(id?singleGoal.text:'')
   }, [id, singleGoal])
   const dispatch = useDispatch()

   const submitForm = (e) => {
      e.preventDefault()
      if (id) {
         dispatch(updateGoal({text, id}))
      } else {
         dispatch(createGoal({ text }))
      }
      setText('')
      setId('')
   }
   return (
      <section className="form">
         <form onSubmit={submitForm} >
            <div className="form-group">
               <label htmlFor="text">Goal</label>
               <input
                  type="text"
                  name="text"
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
               />
            </div>
            <div className="form-group">
               <button className='btn btn-block' type='submit' >Add Goal</button>
            </div>
         </form>
      </section>
   )
}

export default GoalForm