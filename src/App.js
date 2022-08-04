import React, { useState, useEffect } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';

const buttons = [
  { label: 'name', icon: <FaUser /> },
  { label: 'email', icon: <FaEnvelopeOpen /> },
  { label: 'age', icon: <FaCalendarTimes /> },
  { label: 'street', icon: <FaMap /> },
  { label: 'phone', icon: <FaPhone /> },
  { label: 'password', icon: <FaLock /> },
];

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const fetchPerson = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const { results } = data;
      // console.log(results[0]);
      const {
        dob: { age },
        email,
        location: {
          street: { name: streetName, number },
        },
        login: { password, uuid: id },
        name: { first, last },
        phone,
        picture: { large: image },
      } = results[0];

      const name = `${first} ${last}`;
      const street = `${number} ${streetName}`;

      const personDetails = {
        age,
        email,
        id,
        image,
        name,
        phone,
        password,
        street,
      };

      setPerson(personDetails);
      setTitle('name');
      setValue(name);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  const handleValue = (e) => {
    const dataLabel = e.currentTarget.getAttribute('data-label');
    setTitle(dataLabel);
    setValue(person[dataLabel]);

    // alternate approach
    //  if (e.target.classList.contains('icon')) {
    //    const newValue = e.target.dataset.label;
    //    setTitle(newValue);
    //    setValue(person[newValue]);
    //  }
  };

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>My {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            {person &&
              buttons.map((btn) => {
                const { label, icon } = btn;
                return (
                  <button
                    key={label}
                    className='icon'
                    data-label={label}
                    onMouseOver={handleValue}
                  >
                    {icon}
                  </button>
                );
              })}
          </div>
          <button className='btn' type='button' onClick={fetchPerson}>
            {isLoading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
