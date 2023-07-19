import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

function IngredientContainer({userID}) {
const [option, setOption] = React.useState("")
const [inventory, setInventory] = React.useState(null)
const [allIngredients, setAllIngredients] = React.useState(null)

useEffect(() => {
  updateInventory()
}, []);

const updateInventory = () => {
  axios.post(`//localhost:3000/api/possess`, {
    ID: userID
    })
    .then((res) => {
      // console.log(res.data);
      setInventory(res.data);
    })
    .catch(err => {
      // console.log(err)
      alert("Something unexpected happened")
    }
    )
};

  const handleClickOption = (inputOption) => {
    setOption(inputOption)
    if (inputOption === "Add") {
      axios.get(`//localhost:3000/api/ingredient`, {
    })
    .then((res) => {
      console.log(res.data);
      setAllIngredients(res.data);
    })
    .catch(err => {
      // console.log(err)
      alert("Something unexpected happened")
    }
    )
    }
    if (inputOption === "Recommend") {
      axios.get(`//localhost:3000/api/ingredient/mostused`, {
    })
    .then((res) => {
      alert("We recommend stocking up on "+ res.data[0].IngName + " , it is used in "+ res.data[0]['COUNT(*)'] + " recipes!")
      setOption("")
    })
    .catch(err => {
      // console.log(err)
      alert("Something unexpected happened")
    }
    )
    }
  };

  const removeIngredient = (toDelete) => {
    setOption("")
    axios.delete(`//localhost:3000/api/possess`, { data: {
      ID: userID,
      IngName: toDelete
    }
      })
      .then((res) => {
        // console.log(res.data);
        alert("Ingredient successfully removed from your inventory")
        updateInventory();
      })
      .catch(err => {
        // console.log(err)
        alert("Something unexpected happened")
      }
      )
      
  };

  const addIngredient = (toAdd) => {
    setOption("")
    axios.post(`//localhost:3000/api/possess/add`, {
      ID: userID,
      IngName: toAdd
      })
      .then((res) => {
        // console.log(res.data);
        alert("Ingredient successfully added to your inventory")
        updateInventory();
      })
      .catch(err => {
        // console.log(err)
        alert("You already have that ingredient in your inventory")
      }
      )
      
  };

  return (
    <div>
    <p>Your ingredients:</p>
    {inventory ?
    inventory.map( (data) => 
    <li>{data.IngName}
    </li>
    )
    :null
    }
    <p>Select an option:</p>
    <button onClick={() => handleClickOption("Add")}>Add Ingredient</button> 
    <button onClick={() => handleClickOption("Remove")}>Remove Ingredient</button>
    <button onClick={() => handleClickOption("Recommend")}>Get recommendation</button>


    {option === "Remove" ?
    <div>
    <p>Choose ingredient to remove:</p>
    {inventory ?
      inventory.map( (data) => 
      <button onClick={() => removeIngredient(data.IngName)}>{data.IngName}</button> 
      )
      :null
      }
    </div>
    :null}

  {option === "Add" ?
    <div>
    <p>Choose ingredient to add:</p>
    {allIngredients ?
      allIngredients.map( (data) => 
      <button onClick={() => addIngredient(data.Name)}>{data.Name}</button> 
      )
      :null
      }
    </div>
    :null}
    
    </div>


  );
}

export default IngredientContainer;