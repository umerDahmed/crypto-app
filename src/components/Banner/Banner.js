//first we added styles because the banner is all about styles 
// 1 > we customized the background...using makestyles from the material-ui
// 2 > we added container to the div because container will give it height and size and container is responsive

import { Container, makeStyles , Typography} from '@material-ui/core'
import React from 'react'
import Corousel from './Corousel';
const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage:"url(./asdf.jpg)",
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around"
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
}))

const Banner = () => {
    const classes = useStyles() ;
  return (
    <div className={classes.banner}>
       <Container className={classes.bannerContent}>
        
        
        
       <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Secular One",
            }}
          >
            CRYPTO-CART
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Secular One",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        </Container> 
        <Corousel/>
    </div>
  )
}

export default Banner