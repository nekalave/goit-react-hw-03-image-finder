const ContactsListItem = ({ contact, handleDeleteContact }) => {
  return (
    <li>{contact.name}: {contact.number}
      <button onClick={() => handleDeleteContact(contact.id)}>delete</button>
    </li>
  );
};

export default ContactsListItem;
