import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material'
import CustomInput from './components/custom-input/custom-input'

function App() {

  const handleInputChange = () => {
      return "";
  }

  return (
    <>
      <Grid>
        <CustomInput
          name="search"
          placeholder="test"
          onChange={handleInputChange}
          value={"test"}
          // bgWhite
          // hasStartSearchIcon={props.hasStartSearchIcon}
          // startSearchIconOnRight={props.startSearchIconOnRight}
        />
      </Grid>
    </>
  );
}

export default App
