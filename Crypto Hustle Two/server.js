import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = 3001

app.use(cors())

// Mock data for demonstration when API is rate-limited
const mockData = {
  btc: {
    priceData: {
      usd: 62725,
      usd_market_cap: 1234567890000,
      usd_24h_vol: 42567890000,
      usd_24h_change: 5.47
    },
    detailData: {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: {
        large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
      },
      description: {
        en: 'Bitcoin is the first successful internet money based on peer-to-peer technology.'
      },
      categories: ['Cryptocurrency'],
      links: {
        homepage: ['https://bitcoin.org/'],
        whitepaper: 'https://bitcoin.org/bitcoin.pdf'
      }
    }
  },
  eth: {
    priceData: {
      usd: 1780.15,
      usd_market_cap: 213567890000,
      usd_24h_vol: 12567890000,
      usd_24h_change: 3.21
    },
    detailData: {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: {
        large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
      },
      description: {
        en: 'Ethereum is a decentralized platform for applications that run exactly as programmed without any chance of fraud.'
      },
      categories: ['Smart Contract Platform'],
      links: {
        homepage: ['https://ethereum.org/'],
        whitepaper: 'https://ethereum.org/whitepaper/'
      }
    }
  },
  usdt: {
    priceData: {
      usd: 0.99914,
      usd_market_cap: 123456789000,
      usd_24h_vol: 56789000000,
      usd_24h_change: 0.08
    },
    detailData: {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image: {
        large: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png'
      },
      description: {
        en: 'Tether is a stablecoin pegged to the US Dollar.'
      },
      categories: ['Stablecoins'],
      links: {
        homepage: ['https://tether.to/'],
        whitepaper: null
      }
    }
  },
  bnb: {
    priceData: {
      usd: 589.8,
      usd_market_cap: 89567890000,
      usd_24h_vol: 2567890000,
      usd_24h_change: 2.15
    },
    detailData: {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      image: {
        large: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
      },
      description: {
        en: 'BNB is the native cryptocurrency of the Binance ecosystem.'
      },
      categories: ['Exchange-based Tokens'],
      links: {
        homepage: ['https://www.binance.com/'],
        whitepaper: null
      }
    }
  },
  usdc: {
    priceData: {
      usd: 0.999767,
      usd_market_cap: 32567890000,
      usd_24h_vol: 4567890000,
      usd_24h_change: 0.05
    },
    detailData: {
      id: 'usd-coin',
      symbol: 'usdc',
      name: 'USDC',
      image: {
        large: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png'
      },
      description: {
        en: 'USDC is a fully collateralized US Dollar stablecoin.'
      },
      categories: ['Stablecoins'],
      links: {
        homepage: ['https://www.centre.io/'],
        whitepaper: null
      }
    }
  }
}

app.get('/api/coin/:id', async (req, res) => {
  try {
    const { id } = req.params
    const lowerCaseId = id.toLowerCase()
    
    console.log(`Fetching data for: ${lowerCaseId}`)
    
    // Check if we have mock data first
    if (mockData[lowerCaseId]) {
      console.log(`Using mock data for ${lowerCaseId}`)
      return res.json(mockData[lowerCaseId])
    }
    
    // Try to fetch from API
    const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${lowerCaseId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    const priceResponse = await fetch(priceUrl)
    const priceData = await priceResponse.json()
    console.log(`Price data:`, priceData)
    
    // If API call fails or returns error, use mock
    if (!priceData[lowerCaseId] || priceData.status?.error_code === 429) {
      console.log(`API rate-limited or failed, returning mock data`)
      if (mockData[lowerCaseId]) {
        return res.json(mockData[lowerCaseId])
      }
      return res.json({
        priceData: { usd: 0, usd_market_cap: 0, usd_24h_vol: 0, usd_24h_change: 0 },
        detailData: { name: `${id.toUpperCase()}`, symbol: lowerCaseId }
      })
    }
    
    // Fetch detailed data
    const detailUrl = `https://api.coingecko.com/api/v3/coins/${lowerCaseId}?localization=false&tickers=false&market_data=false`
    const detailResponse = await fetch(detailUrl)
    const detailData = detailResponse.ok ? await detailResponse.json() : {}
    console.log(`Detail data - Name: ${detailData?.name}, Symbol: ${detailData?.symbol}`)
    
    const responseData = {
      priceData: priceData[lowerCaseId],
      detailData: detailData
    }
    console.log(`Sending API response`)
    res.json(responseData)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ error: 'Failed to fetch coin data' })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})

