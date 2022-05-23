import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/goals';

export const getUserGoals = async (token) => {
   const config = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
   }
   const response = await fetch(API_URL, {
      method: 'GET',
      headers: config,
   })
   return await response.json()
}

export const createUserGoal = async (goalData, token) => {
   const config = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
   }
   const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(goalData),
      headers: config,
   })
   return await response.json()

}
export const updateUserGoal = async (data, token) => {
   const config = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
   }
   const response = await fetch(`http://localhost:5000/api/v1/goals/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify({text:data.text}),
      headers: config,
   })
   return await response.json()

}


export const deleteUserGoal = async (goalId, token) => {
   const config = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`
   }
   const response = await fetch(`http://localhost:5000/api/v1/goals/${goalId}`, {
      method: 'DELETE',
      headers: config,
   })
   return await response.json()
}