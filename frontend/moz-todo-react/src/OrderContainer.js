import './App.css';
import { useState,useEffect } from 'react';
import React from 'react';
import axios from 'axios';

function OrderContainer() {
    const [kind, setKind] = React.useState("")
    const [culture, setCulture] = React.useState("")
    const [result, setResult] = React.useState(null)
    const [eatery, setEatery] = React.useState(null)
    const [branchResult, setBranchResult] = React.useState(null)
  
  const handleClickKind = (inputKind) => {
    setKind(inputKind)
  };

  const handleClickCulture = (inputCulture) => {
    setCulture(inputCulture)
  };

  const handleClickReset = () => {
    handleClickCulture("")
    handleClickKind("")
    setResult(null)
    setBranchResult(null)
  };

  const updateResult = () => {
    axios.post(`//localhost:3000/api/eatery`, {
          Culture: culture,
          FoodType: kind
      })
      .then((res) => {
        console.log(res.data);
        alert("Eateries retrieved successfully")
        setResult(res.data);
      })
      .catch(err => {
        console.log(err)
        alert("Something unexpected happened")
      }
      )
  };

  const updateBranchResult = (inputEatName) => {
    axios.post(`//localhost:3000/api/eatery/branch`, {
          EatName: inputEatName,
      })
      .then((res) => {
        console.log(res.data);
        setEatery(inputEatName)
        setBranchResult(res.data);
        alert("Branches retrieved successfully")
      })
      .catch(err => {
        console.log(err)
        alert("Something unexpected happened")
      }
      )
  };

  return (
    <div>


    {kind === "" ? 
    <div>
        <p>What kind of eatery?</p>
        <button onClick={() => handleClickKind("Traditional Restaurant")}>Traditional Restaurant</button> 
        <button onClick={() => handleClickKind("Fast food")}>Fast food</button> 
        <button onClick={() => handleClickKind("Coffee")}>Coffee</button> 
    </div>
    :null}
    {kind !== "" && culture === ""?
    <div>
        <p>What kind of food?</p>
        <button onClick={() => handleClickCulture("Indian")}>Indian</button> 
        <button onClick={() => handleClickCulture("Western")}>Western</button> 
        <button onClick={() => handleClickCulture("French")}>French</button> 
    </div>
    :null
    }
    {kind !== "" && culture !== "" ?
    <div>
        <p>Selected {kind} and {culture}</p>
        <button onClick={updateResult}>Search</button>
        <button onClick={handleClickReset}> Reset </button>
    </div>
    :null}
    {result ? 
    result.length == 0?
    <p>No results, try searching with other criterias</p>:
    <p>Results:</p>
    :null}
      {result ? 
      result.map( (data) => 
      <li>
      <button onClick={() => updateBranchResult(data.Name)}>{data.Name}</button> 
      </li>
      )
      :null }
    
    {branchResult ?
    <p> Here are the directions for all {eatery} branches</p>
    :null}

    {branchResult ?
    branchResult.map( (data) => 
    <li>
    {data.Street} {data.UnitNumber}
    </li>
    )
    :null
    }
    </div>
  );
}

export default OrderContainer;