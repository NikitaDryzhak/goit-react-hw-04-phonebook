import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  const formSubmitHandle = contact => {
    contacts.some(({ name }) => name === contact.name)
      ? Notiflix.Notify.warning(`${contact.name} is already in contacts`)
      : setContacts([contact, contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () =>
    contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filtered = visibleContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandle} />
      <h1>Contacts</h1>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filtered} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
