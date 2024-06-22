import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './PhonebookPage/ContactForm/ContactForm';
import ContactsList from './PhonebookPage/ContactsList/ContactsList';
import Filter from './PhonebookPage/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const duplicateContact = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (duplicateContact) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { name, number, id: nanoid() }],
      }));
    }
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <Section title='Phonebook'>
          <ContactForm handleSubmit={this.handleSubmit} />
        </Section>
        <Section title='Contacts'>
          <Filter filter={filter} handleChange={this.handleChange} />
          <ContactsList contacts={filteredContacts} handleDeleteContact={this.handleDeleteContact} />
        </Section>
      </>
    );
  }
}

export default App;
