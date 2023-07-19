import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContactData = data => {
    const isContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isContact) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    const newContacts = {
      id: nanoid(),
      ...data,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  onRemoveContact = contactId => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].filter(
        contact => contact.id !== contactId
      ),
    }));
  };

  componentDidMount() {
    const stringFieldContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringFieldContacts) ?? [];

    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringFieldContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringFieldContacts);
    }
  }

  render() {
    const { filter } = this.state;

    return (
      <div>
        React homework template
        <h1>Phonebook</h1>
        <ContactForm addContactData={this.addContactData} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contactsList={this.getFilterContacts()}
          onRemoveContact={this.onRemoveContact}
        />
      </div>
    );
  }
}

export default App;
