// import styles from './SectionTrend.module.css';
import coin1 from "../../assets/coin-1.svg";
import coin2 from "../../assets/coin-2.svg";
import coin3 from "../../assets/coin-3.svg";
import coin4 from "../../assets/coin-4.svg";

export default function SectionTrend() {

  return (
  <section className="container" aria-label="crypto trend" data-section>
    <ul className="tab-nav">

      <li>
        <button className="tab-btn active">Crypto</button>
      </li>

      <li>
        <button className="tab-btn">DeFi</button>
      </li>

      <li>
        <button className="tab-btn">BSC</button>
      </li>

      <li>
        <button className="tab-btn">NFT</button>
      </li>

      <li>
        <button className="tab-btn">Metaverse</button>
      </li>

      <li>
        <button className="tab-btn">Polkadot</button>
      </li>

      <li>
        <button className="tab-btn">Solana</button>
      </li>

      <li>
        <button className="tab-btn">Opensea</button>
      </li>

      <li>
        <button className="tab-btn">Makersplace</button>
      </li>
    </ul>

      <ul className="tab-content">
        <li>
          <div className="trend-card">

            <div className="card-title-wrapper">
              <img src={coin1} alt="bitcoin logo" />

              <a href="/" className="card-title">
                Bitcoin <span className="span">BTC/USD</span>
              </a>
            </div>

            <data className="card-value" value="46168.95">USD 46,168.95</data>

            <div className="card-analytics">
              <data className="current-price" value="36641.20">36,641.20</data>

              <div className="redBadge">-0.79%</div>
            </div>

          </div>
        </li>

        <li>
          <div className="trend-card active">

            <div className="card-title-wrapper">
              <img src={coin2} alt="ethereum logo" />

              <a href="/" className="card-title">
                Ethereum <span className="span">ETH/USD</span>
              </a>
            </div>

            <data className="card-value" value="3480.04">USD 3,480.04</data>

            <div className="card-analytics">
              <data className="current-price" value="36641.20">36,641.20</data>

              <div className="greenBadge">+10.55%</div>
            </div>

          </div>
        </li>

        <li>
          <div className="trend-card">

            <div className="card-title-wrapper">
              <img src={coin3} alt="tether logo" />

              <a href="/" className="card-title">
                Tether <span className="span">USDT/USD</span>
              </a>
            </div>

            <data className="card-value" value="1.00">USD 1.00</data>

            <div className="card-analytics">
              <data className="current-price" value="36641.20">36,641.20</data>

              <div className="redBadge">-0.01%</div>
            </div>

          </div>
        </li>

        <li>
          <div className="trend-card">

            <div className="card-title-wrapper">
              <img src={coin4} alt="bnb logo" />

              <a href="/" className="card-title">
                BNB <span className="span">BNB/USD</span>
              </a>
            </div>

            <data className="card-value" value="443.56">USD 443.56</data>

            <div className="card-analytics">
              <data className="current-price" value="36641.20">36,641.20</data>

              <div className="redBadge">-1.24%</div>
            </div>

          </div>
        </li>
    </ul>
  </section>
  )
}