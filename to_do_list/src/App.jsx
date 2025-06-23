import React from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import Header from "./components/Header/Header"

function App() {
  return (
    <div className="App">
      <Header/>
      
      <TodoList />
    </div>
  );
}

export default App;
