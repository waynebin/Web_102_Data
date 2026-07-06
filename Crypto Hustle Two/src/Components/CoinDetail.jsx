import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CoinDetail = () => {
  const { symbol } = useParams()
  const [fullDetails, setFullDetails] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        // Use local proxy server to avoid CORS issues
        const url = `http://localhost:3001/api/coin/${symbol}`
        console.log(`Fetching from: ${url}`)
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const data = await response.json()
        console.log(`Received data:`, data)
        setFullDetails(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching coin detail:", error)
        setError(error.message)
      }
    }

    getCoinDetail()
  }, [symbol])

  return (
    <div className="coin-detail-container">
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {fullDetails ? (
        <>
          <h1>{fullDetails?.detailData?.name || symbol?.toUpperCase()}</h1>
          {fullDetails?.detailData?.image?.large && (
            <img
              className="images"
              src={fullDetails?.detailData?.image?.large}
              alt={`Icon for ${fullDetails?.detailData?.symbol} crypto coin`}
              style={{ maxWidth: "200px" }}
            />
          )}
          {fullDetails?.detailData?.description?.en && (
            <div className="description">
              {fullDetails?.detailData?.description?.en}
            </div>
          )}
          <br />
          {fullDetails?.detailData?.categories && (
            <div className="algorithm">
              This coin belongs to the following categories:{" "}
              {fullDetails?.detailData?.categories?.join(", ")}
            </div>
          )}

          <table className="coin-details-table">
            <tbody>
              <tr>
                <th>Symbol</th>
                <td>{symbol?.toUpperCase()}</td>
              </tr>
              {fullDetails?.detailData?.links?.homepage?.[0] && (
                <tr>
                  <th>Website</th>
                  <td>
                    <a
                      href={fullDetails?.detailData?.links?.homepage?.[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {fullDetails?.detailData?.links?.homepage?.[0]}
                    </a>
                  </td>
                </tr>
              )}
              {fullDetails?.detailData?.links?.whitepaper && (
                <tr>
                  <th>Whitepaper</th>
                  <td>
                    <a
                      href={fullDetails?.detailData?.links?.whitepaper}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {fullDetails?.detailData?.links?.whitepaper}
                    </a>
                  </td>
                </tr>
              )}
              <tr>
                <th>Current Price (USD)</th>
                <td>
                  $
                  {fullDetails?.priceData?.usd?.toFixed(2) ||
                    "N/A"}
                </td>
              </tr>
              <tr>
                <th>Market Cap (USD)</th>
                <td>
                  $
                  {fullDetails?.priceData?.usd_market_cap?.toLocaleString() ||
                    "N/A"}
                </td>
              </tr>
              <tr>
                <th>24h Volume (USD)</th>
                <td>
                  $
                  {fullDetails?.priceData?.usd_24h_vol?.toLocaleString() ||
                    "N/A"}
                </td>
              </tr>
              <tr>
                <th>24h Change (%)</th>
                <td>
                  {fullDetails?.priceData?.usd_24h_change?.toFixed(2) || "N/A"}%
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : error ? (
        <div>Failed to load coin details. Please try again.</div>
      ) : (
        <div>Loading coin details...</div>
      )}
    </div>
  )
}

export default CoinDetail;