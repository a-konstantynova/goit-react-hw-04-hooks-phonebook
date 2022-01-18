import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';
import Section from './components/Section';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';

import s from './App.module.css';

// [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formOnSubmitHandler = data => {
    contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase(),
    )
      ? alert(`${data.name} is already in contacts.`)
      : setContacts(prevState => [...prevState, data]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <Section>
        <Form onSubmit={formOnSubmitHandler} />
      </Section>
      <h2 className={s.title_contacts}>Contacts</h2>
      <Section>
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contactsList={getFilteredContact()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}

App.propTypes = {
  filter: PropTypes.string,
};
