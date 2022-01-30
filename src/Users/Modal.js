import { Fragment } from "react";
import reactDom from "react-dom";

export default function Modal(props) {
  const { onInvalidState, errMsg } = props;
  const invalidStateHandler = () => {
    onInvalidState(0);
  };
  const Backrop = (props) => {
    return (
      <div
        onClick={invalidStateHandler}
        className="w-full h-full bg-gray-800 fixed bg-opacity-75"
      ></div>
    );
  };
  const ErrorModal = (props) => {
    return (
      <div className=" z-10 fixed w-full left-1/3 top-1/3 h-auto">
        <div className="bg-gray-100 z-10 w-1/3 rounded h-40 flex flex-col">
          <div className="bg-red-600 font-black">
            <h1>Invalid Input</h1>
          </div>
          <div className="mt-2 text-2xl">
            <p>{errMsg}</p>
          </div>
          <div className="ml-2 mt-16 bg-red-500 w-20 rounded pl-2">
            <button onClick={invalidStateHandler} className="inline-block">
              Alrighty
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {reactDom.createPortal(
        <Backrop />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <ErrorModal></ErrorModal>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
}
