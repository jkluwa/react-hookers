import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {

  
  if (action.type === "USER_INPUT") {
    return { value: action.val, valid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, valid: state.value.includes("@") };
  }
  return { value: "", valid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, valid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, valid: state.value.trim().length > 6 };
  }
  return { value: "", valid: false };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    valid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    valid: null,
  });

  const { valid: emailIsValid } = emailState;
  const { valid: passwordIsValid } = passwordState;

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const checkForm = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(checkForm);
    };
  }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if(!emailIsValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }

  };

  const ctx = useContext(AuthContext);



  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          ChangeHandler={emailChangeHandler}
          validateHandler={validateEmailHandler}
          value={emailState.value}
          valid={emailState.valid}
          id="email"
        />
        <Input
          ref={passwordRef}
          ChangeHandler={passwordChangeHandler}
          validateHandler={validatePasswordHandler}
          value={passwordState.value}
          valid={passwordState.isValid}
          id="password"
        />
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
