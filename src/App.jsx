import React, { useEffect, useState } from 'react'
import { rain, plant1, plant2, plant3, plant4, tooMuchWater, greatJob, tryAgain } from './images/images';
import './styles.css'


export default function App() {
  // start the game with a clean state
  const [count, setCount] = useState(0);
  const [lastClick, setLastClick] = useState(0);
  const [clickSpeed, setClickSpeed] = useState(0);
  const [overWatered, setOverWatered] = useState(false)
  
  // array of images to display according to click count
  const plants = {
    0: plant1,
    1: plant2,
    2: plant3,
    3: plant4,
    4: greatJob,
    5: tooMuchWater,
  };

  useEffect(() => {
    // This code will run any time after clickSpeed value is updated
    if (clickSpeed < 1000) {
      // overWatered is set to true of user clicks too quickly
      setOverWatered(true);
      setCount(5);
    }
    else if (count < 4) {
      // count less than four means the plant still has room to grow, so keep incrementing count
      setOverWatered(false);
      setCount(count + 1);
    }
    else {
      // reset back to start
      setOverWatered(false);
      setCount(0)
    }
  }, [clickSpeed]);

  const waterThePlant = () => {
    // calculate time between clicks in miliseconds
    const now = Date.now();
    setClickSpeed(now - lastClick);
    setLastClick(now);
  };
  
  return (
    <div className="app">
      <h2 className="appHeader">Water the plant to make it grow... but don't water too quickly or you'll have to start over!</h2>
      <div className="game">
        <button className="water-button"
        onClick={() => waterThePlant()}
        style={{
          backgroundImage: `url(${overWatered ? tryAgain : rain})`,
          backgroundSize: 'cover',
          width: '300px',
          height: '300px',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
      </button>
      <img className="myPlant" src={plants[count]} alt="Plant" 
      style={{
        width: '300px',
        height: '300px',
        objectFit: 'cover',
      
      }}
    />
      </div>
    </div>
  );
}
