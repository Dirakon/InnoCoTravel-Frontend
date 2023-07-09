import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import { Tab } from '@mui/material';
import imgUrl from './img/LOGO(resize).svg'
import imgUrlWhite from './img/LOGO(resize)_white.svg'
import {FlagLocaleSelector} from "./App.tsx";
import {getDefaultDarkMode} from "./TelegramUtils.ts";



function TopAppBar(props : {
  locale: "en" | "ru",
  setLocale: (newValue: "en" | "ru") => void,
  applyHome: () => void,
  applyMyTrip: () => void,
}){

  const prefersDarkMode = getDefaultDarkMode();
  const [value,setValue] = React.useState();

  return (
    <AppBar position='fixed'>
      <Container >
        <Toolbar disableGutters>
        <Box sx={{ height: 64 }}>
          <img src={prefersDarkMode? imgUrlWhite : imgUrl} alt={"InnoCoGo"}/>
        </Box>

          <Tabs textColor='inherit' value={value} onChange={() => setValue(value)} indicatorColor='primary'>
            <Tab label="HOME"  onClick={props.applyHome} />
            <Tab label="MY TRIPS"  onClick={props.applyMyTrip} />
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <FlagLocaleSelector locale={props.locale} setLocale={props.setLocale}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
  // TODO: fix fixed placement https://mui.com/material-ui/react-app-bar/#fixed-placement (move this appbar to top)
}
export default TopAppBar;