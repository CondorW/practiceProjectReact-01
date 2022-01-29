import { useState } from "react";

export default function Add(props) {
  const {onInvalidState} = props;

  const [usernameState, setUsernameState] = useState("");
  const [ageState, setAgeState] = useState("");

  const usernameChangeHandler = (event) => {
    setUsernameState(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setAgeState(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(ageState <= 0){
      onInvalidState(1);
      return;
    }
    else if(usernameState.trim().length < 3){
      onInvalidState(2)
    }
    else{
      const userObj = {
        id: (Math.random())*10,
        name: usernameState,
        age: parseInt(ageState),
      };
      props.onDataSubmit(userObj);  
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
          />
        </div>
        <div>
          <label htmlFor="ageInput">Age (Years)</label>
          <input
            onChange={ageChangeHandler}
            className="block py-1 my-2 rounded"
            id="ageInput"
            type="number"
          />
        </div>
        <button className="block border-2 p-2">Add new User</button>
      </form>
    </div>
  );
}