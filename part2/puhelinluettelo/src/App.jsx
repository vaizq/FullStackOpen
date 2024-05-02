import { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/contacts'

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

const Contact = ({person, handleErase}) => (
    <div>
      <p style={{display: 'inline'}}>{person.name} {person.number}</p>
      <button onClick={() => { 
        if (window.confirm(`Delete ${person.name}?`)) {
          handleErase(person.id)
        }
      }}>delete</button>
    </div>
)

const Contacts = ({persons, handleErase}) => (
  <>
    {persons.map((person) =>  (
          <Contact key={person.name} person={person} handleErase={handleErase} />
      )
    )}
  </>
)


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => setPersons(contacts))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const contact = {name: newName, number: newNumber}

    if (!persons.map((p) => p.name).includes(newName)) {
      contactService
        .create(contact)
        .then(contact => setPersons(persons.concat(contact)))
    }
    else {
      if (window.confirm(`Are you sure you want to modify ${contact.name}`)) {
        contact.id = persons.find(p => p.name === contact.name).id
        contactService
          .update(contact)
          .then(contact => setPersons(persons.map(p => p.name !== contact.name ? p : contact)))
      }
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

  const handleErase = (id) => {
    contactService
      .erase(id)
      .then(contact => setPersons(persons.filter(p => p.id !== contact.id)))
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
      <Contacts persons={filterPersons()} handleErase={handleErase} />
    </div>
  )

}

export default App