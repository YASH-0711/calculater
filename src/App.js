import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [currentDate, setCurrentDate] = useState("");
  const [pastDate, setPastDate] = useState("");
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState(0);
  const [total, setTotal] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  // const resetForm = () => {
  //   setPastDate("");
  //   setAmount("");
  //   setDays(0);
  //   setInterest(0);
  //   setTotal(0);
  // };

  const calculateInterest = () => {
  if (!pastDate || !amount) {
    alert("Please fill all fields");
    return;
  }

  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const start = new Date(pastDate);
  const end = new Date(currentDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const effectiveDays = diffDays < 30 ? 30 : diffDays;

  // Determine rate
  let rate = 0;
  if (amountNum <= 2000) {
    rate = 0.04;
  } else if (amountNum <= 9999) {
    rate = 0.03;
  } else if (amountNum <= 49999) {
    rate = 0.025;
  } else {
    rate = 0.02;
  }

  // Calculate interest
  const interestAmount = ((amountNum * rate * effectiveDays) / 30).toFixed(2);
  const totalAmount = (amountNum + parseFloat(interestAmount)).toFixed(2);

  setDays(diffDays);       // Actual days shown
  // setRateUsed(rate);       // Rate shown in UI
  setInterest(interestAmount);
  setTotal(totalAmount);
};


  return (
    <div className="container">
    <h2 className="app-title">Shivam Jewellers</h2>
      <div className="form">
        <label>Current Date</label>
        <input type="date" value={currentDate} readOnly />

        <label>Select Past Date</label>
        <input
          type="date"
          value={pastDate}
          onChange={(e) => setPastDate(e.target.value)}
        />

        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Days</label>
        <input type="number" placeholder="Enter Amount" value={days} readOnly />

        <button onClick={calculateInterest}>Calculate</button>
        {/* <button className="reset-btn" onClick={resetForm}>Reset</button> */}

        <div className="output">
          <p>Interest Amount: ₹{interest}</p>
          <p>Total Amount: ₹{total}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
