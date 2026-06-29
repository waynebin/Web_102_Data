import React from 'react'
import {useState, useEffect} from 'react'
import CoinInfo from './Components/CoinInfo'


import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setList] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const[filteredResults,setFilteredResults] = useState([])
  useEffect(() => {

        const fetchAllCoinData=async() =>{
          const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1",
          {
            headers: {
              "x-cg-demo-api-key": API_KEY,
            },
          }
        )
        const data = await response.json()
        setList(data)
      }

      fetchAllCoinData().catch((error) => {
        console.error("Error fetching coin data:", error)
      })
  }, [])
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
     if (searchValue !== "") {
      const filteredData = list.filter(coin =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
          )
        setFilteredResults(filteredData)
      } else {
        setFilteredResults(list)
      }

    }

  return (
          <>
            <div className="whole-page">  
                 <h1>My Crypto Hustle List</h1>
                 {/* Search Bar */}
                 <input 
                 type="text"
                 placeholder="Search for a coin..."
                 onChange={(inputString) => searchItems(inputString.target.value)}
                  />
                  <button>Search</button>

                  <ul>
                    {filteredResults.length > 0 ? filteredResults.map(coin => (
                      <CoinInfo
                        key={coin.id}
                        id={coin.id}
                        image={coin.image}
                        name={coin.name}
                        symbol={coin.symbol}
                        prices={coin.current_price}
                      />
                    ))
                    : list ? list.map(coin => (
                      <CoinInfo
                        key={coin.id}
                        id={coin.id}
                        image={coin.image}
                        name={coin.name}
                        symbol={coin.symbol}
                        price={coin.current_price}
                      />
                    )) : null}
                  </ul>
            </div>
          
          </>
  )
}

export default App;
