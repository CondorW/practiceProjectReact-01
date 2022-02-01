import { useReducer, useRef, useState } from "react";

const inputReducer = (state, action) => {
  if (action.type === "USERNAME_INPUT") {
    return { username: action.usrV, age:state.ageV  };
  } else if (action.type === "AGE_INPUT") {
    return { username: state.usrV, age: action.ageV };
  }
  return { username: '', age: 0 };
};

export default function Add(props) {
  const { onInvalidState } = props;

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [usernameState, setUsernameState] = useState("");
  // const [ageState, setAgeState] = useState("");

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    username: 'HelloThere',
    age: 0,
  });
  console.log(ageInputRef.current.value);

  const usernameChangeHandler = () => {
    dispatchInput({ type: "USERNAME_INPUT", usrV: nameInputRef.current.value });
  };
  const ageChangeHandler = () => {
    dispatchInput({ type: "AGE_INPUT", ageV: ageInputRef.current.value });
  };


  const submitHandler = (event) => {
    event.preventDefault();
    if (inputState.age <= 0) {
      onInvalidState(1);
      return;
    } else if (inputState.username.trim().length < 3) {
      onInvalidState(2);
    } else {
      const userObj = {
        id: Math.random() * 10,
        name: inputState.username,
        age: parseInt(inputState.age),
      };
      props.onDataSubmit(userObj);
      //dispatchInput({ type: "USERNAME_INPUT", val: "" });
      //dispatchInput({ type: "AGE_INPUT", val: "" });
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
            ref={ageInputRef}
          />
        </div>
        <button className="block border-2 p-2">Add new User</button>
      </form>
    </div>
  );
}
