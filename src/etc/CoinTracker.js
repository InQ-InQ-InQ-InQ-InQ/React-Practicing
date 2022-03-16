import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(1);
  const [exchange, setExchange] = useState(1);
  const onChange = (event) => setMoney(event.target.value);
  const inputHandle = (event) => setExchange(event.target.value);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=1000")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoding(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      <div>
        <input
          onChange={onChange}
          type="number"
          placeholder="write your money"
          value={money}
        ></input>
      </div>
      <div>
        {loading ? (
          <strong> ( "Loading.." ) </strong>
        ) : (
          <select onChange={inputHandle}>
            <option value>Select Coin</option>
            {coins.map((item, index) => (
              <option
                key={index}
                value={item.quotes.USD.price}
                id={item.symbol}
                symbol={item.symbol}
              >
                {item.name}({item.symbol}): ${item.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <div>당신은 "{money / exchange}" 으로 바꿀 수 있습니다!!</div>
    </div>
  );
}

export default App;
