import { useReducer, useRef, useState } from "react";

const initialState = { username: "", age: "" };

const inputReducer = (state, action) => {
  switch (action.type) {
    case "USRCHANGE":
      return {username: action.payload.username, age:state.age};
    case "AGECHANGE":
      return { username:state.username,age:action.payload.age};
    case "RESET":
      return {username:"",age:""};

    default:
      throw new Error();
  }
};

export default function Add(props) {
  const { onInvalidState } = props;

  const nameInputRef = useRef();
  const ageInputRef = useRef();


  const [state, dispatchInput] = useReducer(inputReducer, initialState);

  const usernameChangeHandler = () => {
    dispatchInput({
      type: "USRCHANGE",
      payload: { username: nameInputRef.current.value, age: state.age },
    });
  };
  const ageChangeHandler = () => {
    dispatchInput({
      type: "AGECHANGE",
      payload: { username: state.username, age: ageInputRef.current.value },
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (state.age <= 0) {
      onInvalidState(1);
      return;
    } else if (state.username.trim().length < 3) {
      onInvalidState(2);
    } else {
      const userObj = {
        id: Math.random() * 10,
        name: state.username,
        age: parseInt(state.age),
      };
      props.onDataSubmit(userObj);
      dispatchInput({type:"RESET"});
    }
  };

  return (
    <div className="bg-slate-300 flex border-solid border-2 border-black rounded-md w-1/3 justify-center my-2 mx-2">
      <form action="submit" onSubmit={submitHandler}>
        <div>
          <label htmlFor="usernameInput">Username</label>
          <input
            onChange={usernameChangeHandler}
            className="block py-1 my-2 rounded"
            id="usernameInput"
            type="text"
            value={state.username}
            ref={nameInputRef}
          />
        </div>
        <div>
          <label htmlFor="ageInput">Age (Years)</label>
          <input
            onChange={ageChangeHandler}
            className="block py-1 my-2 rounded"
            id="ageInput"
            type="number"
            value={state.age}
            ref={ageInputRef}
          />
        </div>
        <button className="block border-2 p-2">Add new User</button>
      </form>
    </div>
  );
}
