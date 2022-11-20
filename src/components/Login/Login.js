import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

function emailReducer(state, action) {
  switch (action.type) {
    case "EMAIL_INPUT":
      return { value: action.val, isValid: undefined };
    case "EMAIL_VALID":
      return { value: state.value, isValid: state.value.includes("@") };
  }
}

function passwordReducer(state, action) {
  switch (action.type) {
    case "PASSWORD_INPUT":
      return { value: action.val, isValid: undefined };
    case "PASSWORD_VALID":
      return { value: state.value, isValid: state.value.trim().length > 6 };
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  //  const [emailIsValid, setEmailIsValid] = useState();
  //  const [enteredPassword, setEnteredPassword] = useState('');
  //  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredClg, setEnteredClg] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  let [emailState, emailDispatcher] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  let [passwordState, passwordDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  useEffect(() => {
    let value = setTimeout(() => {
      console.log("validating form input...");
      setFormIsValid(
        emailState.value.includes("@") && passwordState.value.trim().length > 6
      );
    }, 1000);

    return () => {
      console.log("cleanup function executed");
      clearTimeout(value);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    emailDispatcher({ val: event.target.value, type: "EMAIL_INPUT" }); // this object will be assigned to action parameter of emailReducer function

    // setFormIsValid(
    //   emailState.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatcher({ val: event.target.value, type: "PASSWORD_INPUT" });

    // setFormIsValid(
    //   emailState.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const clgChangeHaldler = (event) => {
    setEnteredClg(event.target.value);
  };

  const validateEmailHandler = () => {
    //  setEmailIsValid(emailState.value.includes('@'));
    emailDispatcher({ val: emailState.value, type: "EMAIL_VALID" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatcher({ val: passwordState.value, type: "PASSWORD_VALID" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredClg); // passing credentials to parent comp App.js
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={`${classes.control} `}>
          <label htmlFor="clg">College name</label>
          <input
            type="text"
            id="clg"
            value={enteredClg}
            onChange={clgChangeHaldler}
            required
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
