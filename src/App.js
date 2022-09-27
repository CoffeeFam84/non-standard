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
    const result = inputCode.split('\n').reduce(getNonStandartCount, 0)
    setResultMessage("The number of non standard lines: " + result);
  }

  const getNonStandartCount = (total, line) => {
    line = line.trim();
    if (line.length == 0) {
      return total;
    }
    if (line == '}') {
      return total;
    }
    if (RegExp('//.*').test(line)) {
      return total;
    }
    if (RegExp('pragma .*').test(line)) {
      return total;
    }
    if (RegExp('import .*@openzeppelin/').test(line)) {
      return total;
    }
    return total + 1;
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
