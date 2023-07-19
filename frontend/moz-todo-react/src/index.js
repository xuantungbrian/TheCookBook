import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { useState, useEffect} from 'react';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

let currentID = null;

const Search = () => {
  const [askForID, setAskForID] = React.useState(true)
  const AskID = () => {
    const [userID, setuserID] = useState('');
    const [updated, setUpdated] = useState(userID);
    

    const handleChange = (event) => {
      setuserID(event.target.value);
    };
  
    const handleClick = () => {
      if (userID.includes(";")) {
        alert("Invalid character ';' in your input")
        return
      }
      axios.post(`//localhost:3000/api/users`, { 
          ID: userID
      })
      .then((res) => {
        alert("Welcome back " + res.data[0].Name)
        setUpdated(userID);
        currentID = userID;
        setAskForID(false);
      })
      .catch(err => {
        console.log(err)
        alert("Invalid ID, try again.")
      }
      )
    };

    const handleClickLogOut = () => {
      setUpdated("");
      setAskForID(true);
    };
  
    if (askForID)
    return (
      <div>
        <p> Insert ID: </p>
        <input
          type="text"
          id="userID"
          name="userID"
          onChange={handleChange}
          value={userID}
        />
        
        <button onClick={handleClick}>Enter</button>
      </div>
    )
    else return (
      <div>
          <p>Welcome back, what would you like to do?</p>
        
        
        <button onClick={handleClickLogOut}>Log out</button>
        <p></p>
      </div>
    )
    
  }

  return (
    <div>
      <AskID />
      {!askForID? <App 
      userID={currentID}/> : null }
    </div>
  )
}

root.render(<Search />)