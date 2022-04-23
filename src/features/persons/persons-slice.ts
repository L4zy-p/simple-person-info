import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person } from '../../types'

interface PersonsState {
  data: Person[]
}

const initialState: PersonsState = {
  data: []
}

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson(state, action: PayloadAction<Person>) {
      state.data.push(action.payload)
    },
    deletePerson(state, action: PayloadAction<string>){
      state.data = state.data.filter((data) => data.id !== action.payload)
    },
    editPerson(state, action: PayloadAction<Person>) {
      const index = state.data.findIndex((data) => data.id === action.payload.id)
      let newVal = [...state.data]
      newVal[index] = {...action.payload}
      state.data = newVal
    },
    deletePersonSelected(state, action: PayloadAction<string[]>){
      state.data = state.data.filter((data) => !action.payload.includes(data?.id || ''))
    },
  }
})

export const { addPerson, deletePerson, editPerson, deletePersonSelected } = personsSlice.actions
export default personsSlice.reducer