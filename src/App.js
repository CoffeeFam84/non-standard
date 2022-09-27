import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
} from '@mui/material';



function App() {
  const [resultMessage, setResultMessage] = useState("The number of non standard lines: ");
  const [inputCode, setInputCode] = useState('');

  const handleInputChange = (event) => {
    setInputCode(event.target.value);
  }
  const onCalcClick = () => {
    const result = inputCode.split('\n').reduce(getNonStandartCount, { total: 0, isComment: false }).total;
    setResultMessage("The number of non standard lines: " + result);
  }

  const getNonStandartCount = (result, line) => {
    line = line.trim();
    let flag = true;
    if (result.isComment) {
      flag = false;
    }
    if (RegExp('/[*].*').test(line)) {
      result.isComment = true;
      flag = false;
    }
    if (RegExp('.*[*]/').test(line)) {
      result.isComment = false;
      flag = false;
    }
    if (line.length == 0) {
      flag = false;
    }
    if (line == '}') {
      flag = false;
    }
    if (RegExp('//.*').test(line)) {
      flag = false;
    }
    if (RegExp('pragma .*').test(line)) {
      flag = false;
    }
    if (RegExp('import .*@openzeppelin/').test(line)) {
      flag = false;
    }
    if (flag) {
      result.total++;
    }
    return result;
  }
  return (
    <div className="App">

      <div style={{ margin: '16px' }}>
        <TextField
          id="txtfiled-code-input"
          multiline
          rows={25}
          fullWidth
          onChange={handleInputChange}
        />
      </div>
      <div style={{ display: 'flex', margin: '25px' }}>
        <Button variant="contained" onClick={onCalcClick}>Calculate</Button>
        <div style={{ marginLeft: '25px' }}>{resultMessage}</div>
      </div>
    </div >
  );
}

export default App;
