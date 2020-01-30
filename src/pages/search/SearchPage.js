import React, {useState} from 'react';
import {Slider} from 'antd';
import SearchArray from './components/SearchArray';
import './style.css';

function SearchPage(props) {
  const [numTotalBars, setNumTotalBars] = useState(20);
  const sliderOnChange = e => {
    setNumTotalBars(e);
  };
  return (
    <div>
      <Slider
        onChange={sliderOnChange}
        defaultValue={numTotalBars}
        min={2}
        max={75}
        style={{width: '50%'}}
      />
      <div className="wrapper">
        <SearchArray numTotalBars={numTotalBars} />
      </div>
    </div>
  );
}

export default SearchPage;
