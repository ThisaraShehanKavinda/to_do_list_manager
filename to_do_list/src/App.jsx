import React from "react";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import Header from "./components/Header/Header"
import { TodoProvider } from "./hooks/TodoContext";

function App() {
  return (
    <div className="App">
        <TodoProvider>
      <Header />
      <TodoList />
    </TodoProvider>
    </div>
  );
}

export default App;
