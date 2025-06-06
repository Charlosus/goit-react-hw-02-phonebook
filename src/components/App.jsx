import { useEffect, useState } from 'react';
import { Section } from './Section';
import { PhonebookInput } from './PhonebookInput';
import { nanoid } from 'nanoid';

export const App = () => {
  const [state, setState] = useState(() => {
    const saved = sessionStorage.getItem('contactsState');
    return saved
      ? JSON.parse(saved)
      : {
          contacts: [],
          name: '',
          number: '',
        };
  });
  useEffect(() => {
    sessionStorage.setItem('contactsState', JSON.stringify(state));
  }, [state]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newContact = {
      id: nanoid(),
      name: state.name,
      number: state.number,
    };
    setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  return (
    <div>
      <Section title="Phonebook">
        <PhonebookInput
          name={state.name}
          number={state.number}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Section>
      <Section title="Contacts">
        <ul>
          {state.contacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};
