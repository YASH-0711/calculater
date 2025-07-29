import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

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

  const resetForm = () => {
    setPastDate("");
    setAmount("");
    setDays(0);
    setInterest(0);
    setTotal(0);
  };

  const getInterestRate = (amount) => {
    if (amount === 2000) return 4;
    else if (amount >= 2001 && amount <= 9999) return 3;
    else if (amount >= 10000 && amount <= 49999) return 2.5;
    else if (amount >= 50000) return 2;
    else return 0;
  };

  const calculateInterests = () => {
    const startDate = new Date(pastDate);
    const endDate = new Date(currentDate);

    const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const rate = getInterestRate(amount);

    let totalInterest = 0;

    if (daysDiff <= 30) {
      // Interest for 1 full month
      totalInterest = (amount * rate) / 100 / 12;
    } else if (daysDiff < 60) {
      // Interest based on actual days
      const dailyInterest = (amount * rate) / 100 / 365;
      totalInterest = dailyInterest * daysDiff;
    } else {
      // Interest for full months beyond 2 months
      const monthlyInterest = (amount * rate) / 100 / 12;
      const months = Math.floor(daysDiff / 30);
      totalInterest = monthlyInterest * months;
    }
    const amountNum = parseFloat(amount);
    const totalAmount = (amountNum + parseFloat(totalInterest)).toFixed(2);

    setDays(daysDiff);
    setInterest(totalInterest.toFixed(2));
    setTotal(totalAmount);
    // setRateUsed(rate);
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

        <button onClick={calculateInterests}>Calculate</button>
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
