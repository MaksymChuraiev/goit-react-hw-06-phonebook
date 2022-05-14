// import { useState, useEffect } from 'react';
import { ContactSection } from './ContactSection/ContactSection.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactTitle } from './ContactList/ContactList.styled';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFilter,
  createContacts,
  deleteContact,
  getContacts,
  getFilter,
} from 'redux/contactSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contactItems = useSelector(getContacts);
  const filterItems = useSelector(getFilter);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contactItems.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return toast.error(`${name} is already in contacts.`);
    }
    return dispatch(createContacts(newContact));
  };

  const getContactsList = () => {
    const filterValue = filterItems.toLowerCase().trim();

    return contactItems.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  const filterContact = e => {
    dispatch(addFilter(e.target.value));
  };

  const deleteContacts = id => {
    return dispatch(deleteContact(id));
  };

  return (
    <ContactSection>
      <ContactForm onSubmit={addContact} />
      <ContactTitle>Contacts</ContactTitle>
      <ContactFilter value={filterItems} onChange={filterContact} />
      <ContactList
        contacts={getContactsList}
        onDeleteContact={deleteContacts}
      ></ContactList>
      <ToastContainer />
    </ContactSection>
  );
};

// import { useState, useEffect } from 'react';

// const CONTACTS = 'contacts';

// export const App = () => {
//   const [contacts, setContacts] = useState(
//     JSON.parse(localStorage.getItem(CONTACTS))
//   );
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     localStorage.setItem(CONTACTS, JSON.stringify(contacts));
//   }, [contacts]);

//   const addContact = ({ name, number }) => {
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     if (
//       contacts.some(
//         contact => contact.name.toLowerCase() === name.toLowerCase()
//       )
//     ) {
//       return toast.error(`${name} is already in contacts.`);
//     }

//     return setContacts([newContact, ...contacts]);
//   };

//   const getContactsList = () => {
//     const filterValue = filter.toLowerCase().trim();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filterValue)
//     );
//   };

//   const filterContact = e => {
//     setFilter(e.currentTarget.value);
//   };

//   const deleteContact = id => {
//     setContacts(prevContacts =>
//       prevContacts.filter(contact => contact.id !== id)
//     );
//   };

//   return (
//     <ContactSection>
//       <ContactForm onSubmit={addContact} />
//       <ContactTitle>Contacts</ContactTitle>
//       <ContactFilter value={filter} onChange={filterContact} />
//       <ContactList
//         contacts={getContactsList}
//         onDeleteContact={deleteContact}
//       ></ContactList>
//       <ToastContainer />
//     </ContactSection>
//   );
// };
