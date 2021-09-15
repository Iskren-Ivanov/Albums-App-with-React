import { useRef } from 'react';

import * as EmailValidator from 'email-validator';

const ValidatedInputs = (type, enteredValue, confirmPassword) => {
  let counterRenders = useRef(0);
  console.log('Renders VALIDATE-INPUT', counterRenders.current++);
  let err = null;
  const value = enteredValue.trim();
  switch (type) {
    case 'email':
      if (!value) {
        err = { type: 'email', text: 'Email is required!' };
      } else if (!EmailValidator.validate(value)) {
        err = { type: 'email', text: 'Invalid email address!' };
      }
      break;
    case 'password':
      const passwordRegex = /(?=.*[0-9])/;
      if (!value) {
        err = { type: 'password', text: 'Password is required!' };
      } else if (value.length < 8) {
        err = { type: 'password', text: 'Password must be 8 characters long!' };
      } else if (!passwordRegex.test(value)) {
        err = {
          type: 'password',
          text: 'Invalida password. Must contain one number!',
        };
      }
      break;
    case 'confirmPassword':
      const password = value;
      if (confirmPassword !== password) {
        err = {
          type: 'password and confirm password',
          text: 'Passwords are not the same!',
        };
      }
      break;
  }
  return err;
};

export default ValidatedInputs;
