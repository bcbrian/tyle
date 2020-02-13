import React, { useState, useReducer, useContext } from "react";
import "./styles.css";

const Context = React.createContext();

// /state/actions.js
export const CHANGE = "CHANGE";

// /state/initState.js
const initialState = {
  numbers: ["rebeccapurple", "white", "white", "rebeccapurple"]
};

// /state/reducer.js
function reducer(state, action) {
  switch (action.type) {
    case CHANGE:
      // Where is i?
      const i = action.payload;
      const newNumbers = [...state.numbers];
      const number = state.numbers[i];
      newNumbers[i] = number === "white" ? "rebeccapurple" : "white";
      return { numbers: newNumbers };
    default:
      throw new Error();
  }
}

function Tile({ number, i }) {
  const { state, dispatch } = useContext(Context);
  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: number,
        position: "absolute",
        top: i < 2 ? 0 : 100,
        left: i % 2 === 0 ? 100 : 0
      }}
      onClick={() => dispatch({ type: CHANGE, payload: i })}
    />
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="App">
        {state.numbers.map((number, i) => (
          <Tile i={i} number={number} />
        ))}
      </div>
    </Context.Provider>
  );
}
