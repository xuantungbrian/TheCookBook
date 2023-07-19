import './App.css';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';

function RecipeContainer({userID}) {
const [option, setOption] = React.useState("")
const [result, setResult] = React.useState(null)
const columns = ["Difficulty", "Fat", "Protein"]
const [checkedState, setCheckedState] = useState(
  new Array(columns.length).fill(false)
);

  const handleClickOption = (inputOption) => {
    setOption(inputOption)
    if(inputOption == 3) {
      axios.post(`//localhost:3000/api/Recipe/highCalories`, {
        columns: generateString()
      })
      .then((res) => {
        console.log(res.data)
        alert("Recipes successfully retrieved")
        setResult(res.data)
      })
      .catch(err => {
        // console.log(err)
        alert("Something unexpected happened")
      }
      )
    }
    if(inputOption == 2) {
      axios.post(`//localhost:3000/api/Recipe/project`, {
        columns: generateString()
      })
      .then((res) => {
        console.log(res.data)
        alert("Recipes successfully retrieved")
        setResult(res.data)
      })
      .catch(err => {
        // console.log(err)
        alert("Something unexpected happened")
      }
      )
    }
    if(inputOption == 1) {
      axios.post(`//localhost:3000/api/Recipe/haveall`, {
        columns: generateString(),
        ID: userID
      })
      .then((res) => {
        alert("Recipes successfully retrieved")
        console.log(res.data)
        setResult(res.data)
      })
      .catch(err => {
        // console.log(err)
        alert("Something unexpected happened")
      }
      )
    }
    
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }

  const generateString = () => {
    let string = "Name, Calories,"
    if(checkedState[0])
      string += "Difficulty,"
    if(checkedState[1])
      string += "Fat,"
    if(checkedState[2])
      string += "Protein,"
    string = string.substring(0, string.length-1)
    return string
  }

  return (
    <div>
      {result? null
      :<div>
      <p>What recipe information do you want to see?</p>
      <input type="checkbox" id="column" name="column" value="Difficulty" checked={checkedState[0]}
                      onChange={() => handleOnChange(0)} />Difficulty
      <input type="checkbox" id="column" name="column" value="Fat" checked={checkedState[1]}
                      onChange={() => handleOnChange(1)}/>Fat
      <input type="checkbox" id="column" name="column" value="Protein" checked={checkedState[2]}
                      onChange={() => handleOnChange(2)} />Protein
  
      <p>What recipes are you looking for?</p>
      <button onClick={() => handleClickOption(1)}>I have all the ingredients</button> 
      <button onClick={() => handleClickOption(2)}>All recipes</button> 
      <button onClick={() => handleClickOption(3)}>High calorie ({'>'}200) </button>
      </div>}
      
    {result?
    result.length == 0 ?
    <p>You cannot make any recipe with your ingredients. Try other options.</p>
    :
    result.map( (data) =>
    <ul>
      <li>
      {data.Name}
        <ul>
          <li>
            Calories: {data.Calories}
          </li>
          {data.Difficulty? 
          <li>
          Difficulty: {data.Difficulty}
        </li>
          :null}
          
          {data.Fat? 
          <li>
          Fat(g): {data.Fat}
        </li>
          :null}
          {data.Protein? 
          <li>
          Protein(g): {data.Protein}
        </li>
          :null}
        </ul>
      </li>
    </ul>
    )
    :null}
    {result !== null?
    <button onClick={() => setResult(null)}>Search other recipes</button>
    :null}
    
    </div>
  );
}

export default RecipeContainer;