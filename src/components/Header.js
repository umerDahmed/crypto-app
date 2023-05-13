import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../images/cryptocurrency.png'
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles(()=>({
  title : {
    flex:1,
    color:'#FFFFFF',
    fontFamily: "Secular One",
    fontWeight:"bold",
    cursor:'pointer',
    variant: 'h5'
  },

}))
const darkTheme = createTheme({
  palette:{
    primary:{
      main:'#FFFFFF',
    },
    type:"dark",
  }
});
const Header = () => {
  const {currency , setCurrency } = CryptoState();
  const classes = useStyles() ;
  const nav = useNavigate() ;
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
        
          <Toolbar>
          
            <Typography className={classes.title} onClick={()=>nav("/") } >CRYPTO-CART</Typography>

            <Select variant='outlined' style={
              {
                width:100,
                height:40,
                marginRight:15,
              }
            }
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}> 
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem  value='INR'>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>

  )
}
export default Header