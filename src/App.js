import React from 'react';
import NavbarRoute from './Components/NavbarRoute';
import NavbarLinks from './Components/NavbarLinks';
import "./App.css";
import GlobalContext from './Components/Context/GlobalContext';
const App = () => {


  return (
    <div>
      <GlobalContext>
        <NavbarLinks />
        <NavbarRoute />
      </GlobalContext>
    </div>
  )
}
export default App;


