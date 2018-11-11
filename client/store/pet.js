import axios from 'axios'
import history from '../history'

//action types

const GET_PETS = 'GET_PETS'
const DELETE_PET = 'DELETE_USER'
const ADD_PET = 'ADD_PET'
const EDIT_PET = 'EDIT_PET'

//action creators

const getPets = pets => ({type: GET_PETS, pets})
const deletePet = () => ({type: DELETE_PET})
const addPet = pet => ({ type: ADD_PET, pet})
const editPet = (petId, updatedPet) => ({type: EDIT_PET, petId, updatedPet})

//thunk creator

export const fetchPets = () => {
  return async dispatch => {
    const {data: pets} = await axios.get('/api/pets')
    dispatch(getPets(pets))
  }
}

export const postPet = pet => {
  return async dispatch => {
    const {data} = await axios.post('/api/pets', pet)
    dispatch(addPet(data))
  }
}

export const changePetById = (petId, updatedPet) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/pets/${petId}`, updatedPet)
    dispatch(editPet(data))
  }
}

export const destroy = petId => {
  return async dispatch => {
    await axios.delete(`/api/pets/${petId}`)
    dispatch(deletePet(petId))
  }
}

//reducer

const petReducer = (petList = [], action) => {
  switch (action.type) {
    case GET_PETS:
      return action.pets
    case ADD_PET:
      return [...petList, action.pet]
    case DELETE_PET: {
      const filteredList = petList.filter(pet => {
        return pet.id !== action.deletedId
      })
      return filteredList
    }
    case EDIT_PET: {
      const updatedList = petList.map(pet => {
        if (pet.id !== action.editedId) return action.updatedPet
      })
      return updatedList
    }
    default:
      return petList
  }
}

export default petReducer
