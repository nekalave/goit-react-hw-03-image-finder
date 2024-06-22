import ContactsListItem from './ContactsListItem/ContactsListItem';

const ContactsList = ({ contacts, handleDeleteContact }) => {
  return(
    <ul>
      {contacts.map(contact =>(
        <ContactsListItem key={contact.id} contact={contact} handleDeleteContact={handleDeleteContact}/>
      ))}
    </ul>
  )
}

export default ContactsList
