import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contactsList, onRemoveContact }) => {
  return (
    <ul>
      {contactsList.map(({ name, number, id }) => (
        <li key={id}>
          <p className={css.text_contact}>
            {name}: {number}{' '}
            <button onClick={() => onRemoveContact(id)}>Delete</button>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
