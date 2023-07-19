import './App.css';
import { useState } from 'react';
import React from 'react';

function EquipmentContainer() {
const [option, setOption] = React.useState("")

  const handleClickOption = (inputOption) => {
    setOption(inputOption)
  };

  return (
    <div>
    <p>Select an option</p>
    <button onClick={() => handleClickOption("Check")}>Check Equipments</button> 
    <button onClick={() => handleClickOption("Add")}>Add Equipment</button> 
    <button onClick={() => handleClickOption("Remove")}>Remove Equipment</button>
    <button onClick={() => handleClickOption("Update")}>Update Equipment</button>
    </div>
  );
}

export default EquipmentContainer;