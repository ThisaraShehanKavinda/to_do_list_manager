import React from "react";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";           
import { store } from './store/store';
              

function App() {
  return (
    <div className="App">
      <Provider store={store}>                    
        <Header />
        <TodoList />
      </Provider>
    </div>
  );
}

export default App;
