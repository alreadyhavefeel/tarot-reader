"use client"; // This is a client component
import React, { useState } from 'react';
//import { Alert } from 'react-alert'
import PreReader from './PreReader';
import Browingcard from './Browingcard';

function TarotReading() {
  const [haveread, setHaveRead] = useState(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState({
    index: null,
    typeCard: null,
  });

  // Function to handle card selection to display card details
  function handleClickReader(index, type) {
    if (index === null || type === null) {
      console.error('Invalid card selection');
      alert('Please select a card');
      return;
    } else {
    setHaveRead(true)
    setSelectedCardInfo({
      index: index + 1,
      typeCard: type,
    });
    }
  }

  // Function to handle back button click to go back to card selection
  function handleClickBack() {
    setHaveRead(false)
  }

  if (haveread === false) {
    return (
      <div>
        <PreReader clickReader={handleClickReader}/>
      </div>
    );
  } else {
    return (
      <div>
        <Browingcard clickBack={handleClickBack} cardSelected={selectedCardInfo} />
      </div>
    )
  }
};

export default TarotReading;
