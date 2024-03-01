import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Test = () => {
    
      const notify = () => toast("form successfully submited",{position:"top-center"});
  return (
    <div>
      <button onClick={notify}>login</button>
      <ToastContainer />
    </div>
  )
}

export default Test;
