import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme, makeStyles } from '@material-ui/core'
import {Typography} from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '@material-ui/lab'

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false) ;
    const {currency , symbol} = CryptoState() ;
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const useStyles = makeStyles({
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Secular One",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "#FFFFFF",
        },
      },
    });
    const nav = useNavigate() ;
    const classes = useStyles();

    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    };
    function numberWithCommas(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }

    const darkTheme = createTheme({
        palette:{
          primary:{
            main:'#FFFFFF',
          },
          type:"dark",
        }
      });


    const fetchCoins = async()=>{
        setLoading(true) ;
        const {data} = await axios.get(CoinList(currency));
        setCoins(data) ;
        setLoading(false) ;
    }
    console.log(coins);
    useEffect(() => {
        fetchCoins() ;
    }, [currency]);
    
  return (
      <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign:"center"}}>
        <Typography variant='h4' style={{margin:25 , fontFamily:"Secular One"}}>
            CrptoCurrency Prices By Market Cap
        </Typography>
        <TextField
            label="Search For a Crypto Currency"
            variant='outlined'
            style={{marginBottom:20 , width:"100%" }}
            onChange={(e)=>setSearch(e.target.value)}
        />
        <TableContainer>
          {
            loading?(<LinearProgress variant="determinate"  style={{backgroundColor:"#FFFFFF)"}} />)
            :(<>
            <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#FFFFFF" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#FFFFFF" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Secular One",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 20, (page - 1) * 20 + 20)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => nav(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

            </> )
          }
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length /20).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
      </ThemeProvider>
  )
}

export default CoinsTable