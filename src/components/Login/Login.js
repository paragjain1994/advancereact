import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../context/AuthContext";

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

const Login = () => {
  const [enteredClg, setEnteredClg] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  let authctx = useContext(AuthContext);

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
    emailDispatcher({ val: event.target.value, type: "EMAIL_INPUT" });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatcher({ val: event.target.value, type: "PASSWORD_INPUT" });
  };

  const clgChangeHaldler = (event) => {
    setEnteredClg(event.target.value);
  };

  const validateEmailHandler = () => {
    emailDispatcher({ val: emailState.value, type: "EMAIL_VALID" });
  };

  const validatePasswordHandler = () => {
    passwordDispatcher({ val: passwordState.value, type: "PASSWORD_VALID" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailState.value, passwordState.value, enteredClg); // context here
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
