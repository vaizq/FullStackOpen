import { useState } from 'react'


const Filter = ({value, handleChange}) => (
  <div>Filter <input value={value} onChange={handleChange}/></div>
)


const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, name, number}) => (
  <>
    <form onSubmit={handleSubmit}>
      <div>name: <input value={name} onChange={handleNameChange}/></div>
      <div>number: <input value={number} onChange={handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)


const Contacts = ({persons}) => (
  <>
  {persons.map((person) => 
    <p key={person.name}>{person.name} {person.number}</p>
  )}
  </>
)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: '0469696969'},
    { name: 'Lauri Tikka',number: '0453448999'},
    { name: 'Akseli Kukkonen',number: '0469777777'},
    { name: 'Väinö Heijari',number: '0469494949'},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.map((p) => p.name).includes(newName)) {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    else {
      alert(`Person ${newName} is already in the phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  const filterPersons = () => {
    return persons.filter((person) => person.name.toLowerCase().startsWith(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={updateFilter} />

      <h2>Add new contact</h2>
      <PersonForm 
        handleSubmit={addPerson} 
        handleNameChange={updateName} 
        handleNumberChange={updateNumber}
        name={newName}
        number={newNumber}
      />

      <h2>Contacts</h2>
      <Contacts persons={filterPersons()} />
    </div>
  )

}

export default App