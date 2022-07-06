import React, { useState } from 'react';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

function Form({ onSubmit }) {
  const [params, setParams] = useState({ name: '', number: '' });

  const nameId = nanoid(10);

  const handleInputChange = e => {
    setParams({ ...params, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = params;

    onSubmit({ id: nanoid(5), name, number });
    reset();
  };

  const reset = () => {
    setParams({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label htmlFor={nameId} className={s.label}>
        {' '}
        Name
        <input
          className={s.input}
          onChange={handleInputChange}
          id={nameId}
          value={params.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        Number
        <input
          className={s.input}
          onChange={handleInputChange}
          value={params.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={s.btnSubmit} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
