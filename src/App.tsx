import { useState } from 'react'
import { useAppSelector } from './app/hook'
import { PersonForm, Table } from './components'
import { Person } from './types'
import logo from './server.png'

function App() {
  const persons = useAppSelector((state) => state.persons.data)
  const [defaultValues, setDefaultValues] = useState<Person>()
  
  const getPersonById = (id: string) => {
    const data = persons.find((p) => p.id === id)
    setDefaultValues(data)
  }

  return (
    <div className='app'>
      <div className='header'>
        <img src={logo} alt=''/>
        <span className='text'>PersonalDB</span>
      </div>
      <PersonForm defaultValues={defaultValues} setDefaultValues={setDefaultValues}/>
      <br/>
      <Table edit={getPersonById}/>
      <br/>
    </div>
  )
}

export default App
