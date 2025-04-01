import Dashboard from "./pages/Dashboard/Dashboard";
import Message from "./pages/Message/Message";

import React from "react";
import { createBrowserRouter,Route,RouterProvider } from 'react-router-dom';

const router =createBrowserRouter([
  {
    path:'/',
    Element:<Dashboard/>
  },
  {
    path:"/message",
    Element:<Message/>

  }
])
function App() {



  return (
    // <Dashboard/>
    <Message/>
  );
}

export default App;