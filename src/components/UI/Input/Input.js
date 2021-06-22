import React, { useRef, useImperativeHandle } from "react";

import classes from "./classes.module.css";

const Input = React.forwardRef((props, ref) => {
  const activate = () => {
    inputRef.current.focus();
  };
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => {
    return {
    focus: activate,
  };
});

  return (
    <div
      className={`${classes.control} ${
        props.valid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.id}</label>
      <input
        ref={inputRef}
        type={props.id}
        id={props.id}
        value={props.value}
        onChange={props.ChangeHandler}
        onBlur={props.validateHandler}
      />
    </div>
  );
});

export default Input;
