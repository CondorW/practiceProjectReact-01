import { useState } from "react/cjs/react.development";
import Add from "./Users/Add";
import Users from "./Users/Users";
import Modal from "./Users/Modal";
import { Fragment } from "react/cjs/react.development";

function App() {
  const [dataState, setDataState] = useState([
    { age: 1, id: 4, name: "Spingebill" },
  ]);
  const [validState, setValidState] = useState(0);
  const usrError = "Your username is to short";
  const ageError = "Please enter a real age";

  const dataHandler = (data) => {
    console.log(data);
    setDataState([...dataState, data]);
    console.log(dataState);
  };

  return (
    <Fragment>
      {validState == 2 ? (
        <Modal onInvalidState={setValidState} errMsg={usrError}></Modal>
      ) : null}
      {validState == 1 ? (
        <Modal onInvalidState={setValidState} errMsg={ageError}></Modal>
      ) : null}
      <div className="flex justify-center">
        <Add onDataSubmit={dataHandler} onInvalidState={setValidState}></Add>
      </div>
      <div className="flex justify-center my-8">
        <Users userData={dataState}></Users>
      </div>
    </Fragment>
  );
}

export default App;
