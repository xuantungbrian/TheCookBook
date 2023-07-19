import './App.css';
import { useState } from 'react';
import React from 'react';
import IngredientContainer from './IngredientContainer';
import EquipmentContainer from './EquipmentContainer';
import RecipeContainer from './RecipeContainer';

function CookContainer({userID}) {
const [option, setOption] = React.useState("")

  const handleClickOption = (inputOption) => {
    setOption(inputOption)
  };

  return (
    <div>
    {option === "" ? 
    <div>
        <p>Select an option</p>
        <button onClick={() => handleClickOption("Ingredient")}>Ingredient</button> 
        {/* <button onClick={() => handleClickOption("Equipment")}>Equipment</button>  */}
        <button onClick={() => handleClickOption("Recipe")}>Recipe</button>
    </div>
    :null}
    
    {option === "Ingredient" ? <IngredientContainer userID={userID}/>: null}
    {/* {option === "Equipment" ? <EquipmentContainer userID={userID}/>: null} */}
    {option === "Recipe" ? <RecipeContainer userID={userID}/>: null}

    {option !== "" ? 
    <div>

    <p> </p>
    <button onClick={() => handleClickOption("")}>Back</button>
    </div>
    : null}
    </div>
  );
}

export default CookContainer;