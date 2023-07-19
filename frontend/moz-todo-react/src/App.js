import './App.css';
import { useState } from 'react';
import React from 'react';
import OrderContainer from './OrderContainer';
import CookContainer from './CookContainer';
import AdminContainer from './AdminContainer';

function App({userID}) {
  const [cookOrOrder, setCookOrOrder] = React.useState("")
  const handleClickOrder = () => {
    setCookOrOrder("Order")
  };
  const handleClickCook = () => {
    setCookOrOrder("Cook")
  };

  const handleClickBack = () => {
    setCookOrOrder("")
  };

  return (
    <div>
    {cookOrOrder === "" ? 
    <div>
    <button onClick={handleClickOrder}>Order</button>
    <button onClick={handleClickCook}>Cook</button> 
    </div>
    : null}
    
    {cookOrOrder === "Order" ? 
    <OrderContainer/>
    : null}

    {cookOrOrder === "Cook" ? 
    <CookContainer 
    userID={userID}/>
    : null}

    {cookOrOrder !== "" ? 
    <div>
    <br></br>
    <button onClick={handleClickBack}>Return to start</button> 
    </div>
    : null}

    {userID == 2?
    <AdminContainer />
    :null}
    </div>
  );
}

export default App;
