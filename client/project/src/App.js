import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Switch } from "react-router-dom"
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from "./components/Error"
import Logout from "./components/Logout"

import {initialstate , reducer} from "../src/reducer/UseReducer"
import "./index.css"

//1.contectAPI
export const UserContext = createContext()

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>

     

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/logout">
        <Logout />
      </Route>

      <Route>
        <Error />
      </Route>
    </Switch>
  )
}

function App() {

  const [state,dispatch] = useReducer(reducer,initialstate)

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
