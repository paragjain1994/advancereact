import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../context/AuthContext";
import Input from "../Input/Input";

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

  const emailRef=useRef();
  const pswRef=useRef();

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
    if(formIsValid){
      authctx.onLogin(emailState.value, passwordState.value, enteredClg); // context here
    }
    else if(!emailState.isValid){
      emailRef.current.onfocus();
    }
    else{
      pswRef.current.onfocus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          ref={emailRef}
          value={emailState.value}
          isValid={emailState.isValid}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
        >E-mail</Input>

        <Input
          type="password"
          id="password"
          ref={pswRef}
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
        >Password</Input>

        <div className={`${classes.control} `}>
          <label htmlFor="clg">College name</label>
          <input
            type="text"
            id="clg"
            value={enteredClg}
            onChange={clgChangeHaldler}
           
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
