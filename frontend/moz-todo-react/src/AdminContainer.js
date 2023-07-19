import './App.css';
import { useState, useRef } from 'react';
import React from 'react';
import axios from 'axios';

function AdminContainer() {
const [option, setOption] = React.useState("")
const [branches, setBranches] = React.useState(null)
const [branchOption, setBranchOption] = React.useState(null)
const [oldBranch, setOldBranch] = React.useState(null)
const [newValue, setnewValue] = React.useState(null)
const [eateries, setEateries] = React.useState(null)
const [masterResult, setMasterResult] = React.useState(null)
const inputRef = useRef(null)
const inputRef1 = useRef(null)
const inputRef2= useRef(null)
const inputRef3 = useRef(null)
const [inventories, setInventories] = React.useState(null)
  const handleClickOption = (inputOption) => {
    setOption(inputOption)
  };

  const getEateries = () => {
    handleClickOption("DeleteEatery")
    axios.get(`//localhost:3000/api/eatery/branch/all`, {
      })
      .then((res) => {
        console.log(res.data);
        setEateries(res.data)
      })
      .catch(err => {
        // console.log(err)
        alert("Error getting branches")
      }
      )
  };

  const deleteEatery = (inputEatname) => {
    // handleClickOption("DeleteEatery2")
    axios.delete(`//localhost:3000/api/eatery`, {data: {
      EatName: inputEatname
      }})
      .then((res) => {
        console.log(res.data);
        getEateries();
        alert("Eatery successfully deleted")
      })
      .catch(err => {
        // console.log(err)
        alert("Error deleting eatery")
      }
      )
  };

  const updateBranches = () => {
    handleClickOption("BranchUpdate")
    axios.get(`//localhost:3000/api/eatery/branch/all`, {
      })
      .then((res) => {
        console.log(res.data);
        setBranches(res.data)
      })
      .catch(err => {
        // console.log(err)
        alert("Error getting branches")
      }
      )
  };

  const updateBranch = (data) => {
    handleClickOption("BranchUpdateChoose")
    setOldBranch(data)
  };

  const chooseUpdateOption = (opt) => {
    handleClickOption("BranchUpdateChoose2")
    setBranchOption(opt)
  };

  const changeValue = (val) => {
    console.log(val)
    if (val.includes(";")) {
      alert("Invalid character ';' in your input")
      return
    }
    axios.post(`//localhost:3000/api/eatery/branch/update`+branchOption, {
        NewValue: val,
        EatName: oldBranch.EatName,
        PostalCode:oldBranch.PostalCode,
        Street:oldBranch.Street,
        UnitNumber:oldBranch.UnitNumber
      })
      .then((res) => {
        console.log(res.data);
        setOption("BranchUpdate")
        updateBranches()
        alert("Branch successfully updated")
      })
      .catch(err => {
        // console.log(err)
        alert("Error updating this branch, try again")
      }
      )
  };

  const getUsersInventory = () => {
    axios.get(`//localhost:3000/api/ingredient/number`, {
      })
      .then((res) => {
        console.log(res.data);
        setOption("Inventories")
        alert("Inventories successfully retrieved")
        setInventories(res.data)
      })
      .catch(err => {
        // console.log(err)
        alert("Error updating this branch, try again")
      }
      )
  };

  const masterQuery = (table,column,condition) => {
    if (table.includes(";") || column.includes(";") || condition.includes(";")) {
      alert("Invalid character ';' in your input")
      return
    }
    axios.post(`//localhost:3000/api/master`, {
      Table: table,
      Columns: column,
      Condition: condition
      })
      .then((res) => {
        console.log(res.data);
        alert("Query Successful")
        setOption("masterResult")
        setMasterResult(res.data)
      })
      .catch(err => {
        // console.log(err)
        alert("Error with query, check your input")
      }
      )
  };

  return (
    <div>
    <p>-------------------------------</p>
    <p>This is the Admin interface</p>
    {option === ""?
    <div>
    <button onClick={() => updateBranches()}>Update branch locations</button> 
    <button onClick={() => getUsersInventory()}>See users inventory count</button>
    <button onClick={() => getEateries()}>Delete an eatery</button>  
    <button onClick={() => setOption("Master")}>Master query</button> 
    </div>
    :null}
    

    {option === "BranchUpdate"?
    <div>
    <p>Which branch do you want to update?</p>
    {branches ?
        branches.map( (data) => 
        <button onClick={() => updateBranch(data)}>
            {data.EatName},{data.Street} {data.UnitNumber}
        </button> 
        )
        :null
    }
    </div>
    :null}

    {option === "BranchUpdateChoose"?
    <div>
    <p>Which attribute do you want to update?</p>
    <button onClick={() => chooseUpdateOption("Street")}>Street</button>
    <button onClick={() => chooseUpdateOption("UnitNumber")}>UnitNumber</button>
    </div>
    :null}

    {option === "BranchUpdateChoose2"?
    <div>
    <p>Insert new value</p>

    <input
          type="text"
          id="newValue"
          name="newValue"
          ref={inputRef}
        />
    <button onClick={() => changeValue(inputRef.current.value)}>Submit</button>
    </div>
    :null}

    {option === "Inventories"?
    <div>
    {inventories ?
        inventories.map( (data) => <li>User {data.ID} has {data['COUNT(*)']} ingredients.</li>
        )
        :null
    }
    </div>
    :null
    }

  {option === "DeleteEatery"?
    <div>
      <p>Which eatery do you want to delete?</p>
    {eateries ?
        eateries.map( (data) => 
        <button onClick={() => deleteEatery(data.EatName)}>
        {data.EatName}
    </button> 
        )
        :null
    }
    </div>
    :null
    }

{option === "Master"?
    <div>
    <p>Master Query</p>
    <p>Insert table name</p>
    <input
          type="text"
          id="tn"
          name="tn"
          ref={inputRef1}
        />
    <p>Insert column names (comma separated)</p>
    <input
          type="text"
          id="col"
          name="col"
          ref={inputRef2}
        />
        <p>Insert condition</p>
    <input
          type="text"
          id="con"
          name="con"
          ref={inputRef3}
        />
        <br></br>
    <button onClick={() => masterQuery(inputRef1.current.value, inputRef2.current.value
      ,inputRef3.current.value)}>Query</button>
    </div>
    :null}

{option === "masterResult"?
    <div>
      <p>Result from query:</p>
    {masterResult ?
        masterResult.map( (data) => 
        JSON.stringify(data)
        )
        :null
    }
    <br></br>
    <button onClick={() => handleClickOption("Master")}>Make another query.</button>
    </div>
    :null
    }

    {option !== ""?
    <div>
        <p> </p>
    <button onClick={() => handleClickOption("")}>back</button>
    </div>
    :null
    }
    </div>
    
  );
}

export default AdminContainer;