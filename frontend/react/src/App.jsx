import { useState } from 'react'
import Home from './pages/home/home'
import { useSelector } from 'react-redux';
import { useCheckAuthQuery } from "./store/api";
import { selectAuthStatus } from "./store/user-slicer";

function App() {
  const isAuth = useSelector(selectAuthStatus);
  const { isLoading } = useCheckAuthQuery();

  return (
    <div id="#app">
      <Home />
    </div>
  )
}

export default App
