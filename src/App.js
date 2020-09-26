import React, { useEffect } from "react";
// import WebWorker from "./WebWorker"
// import worker from './test/git'
import logo from "./logo.svg";
import "./App.css";
import {clone, readFile, synclocal} from "./testworker";

// eslint-disable-next-line import/no-webpack-loader-syntax
// import worker from 'workerize-loader!./test/git'

// import { Worker, isMainThread, parentPort, workerData} from "worker_threads"

function App() {
  useEffect(() => {
    synclocal()
    // console.log(global)
  }, []);
  const handleOnClick=()=>{
    clone()
  }
  const handleOnClick2=()=>{
    readFile()
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleOnClick}>aaa</button>
        <button onClick={handleOnClick2}>aaa</button>
      </header>
    </div>
  );
}

export default App;
