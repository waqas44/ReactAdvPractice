import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  return ({ value: '', isValid: false })
};


const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  //This state will collect all the Info typed into email Box, And combine them. 
  const [emailIsValid, setEmailIsValid] = useState();
  //This state will check if email is valid or at the rate of @ symbol exist in email
  const [enteredPassword, setEnteredPassword] = useState('');
  // This state will keep collecting all the info type in password box
  const [passwordIsValid, setPasswordIsValid] = useState();
  //This state will check the password validity in term of password length
  const [formIsValid, setFormIsValid] = useState(false);
  //This state will check if form is valid I mean above to boxes have passed the validity


  const [emailState, emailDispatcher] = useReducer(emailReducer, { value: '', isValid: false });
  useEffect(() => {
    const idendifier = setTimeout(() => {
      console.log('Running from Setitmeout');
      setFormIsValid(
        emailState.value.includes('@') && enteredPassword.trim().length > 6
      )
    }, 1000);

    return (() => {
      clearTimeout(idendifier);
      console.log('CLEAnup from settimeout');
    }
    )

  }, [enteredEmail, enteredPassword]);


  // console.log('Running from APP');
  const emailChangeHandler = (event) => {
    //This function will execute on every key type and will set new values to email state and form valid state
    let abc = setEnteredEmail(event.target.value);
    console.log(event.target.value);

    // console.log('Running from emailChangeHandler');

    // Setformisvalid State will keep returning true or false based on values receive from props (not based on previous state) 
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);


    // console.log('Running from passwordChangeHandler');
  };

  const validateEmailHandler = () => {
    setEmailIsValid(emailState.value.includes('@'));
  };
  //Validemailhandler will execute once we leave the mouse from input field, while setemailisvalid will return true or false based on other state value after checking @ symbol

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };
  // console.log('Running from APP End');
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>


    </Card>
  );


};

export default Login;
