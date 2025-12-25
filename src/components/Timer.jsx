import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [alarm, setAlarm] = useState('');

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      setAlarm('Time\'s up!');
      alert('⏰ Time\'s up! ⏰');
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const start = () => {
    if (inputTime > 0) {
      setTime(parseInt(inputTime));
      setIsRunning(true);
      setAlarm('');
    }
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime('');
    setAlarm('');
  };

  return (
    <div className="timer-container">
      <h1 className="timer-title">⏰ Timer + Alarm</h1>
      <input
        type="number"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        placeholder="Enter time in seconds"
        className="timer-input"
      />
      <div className="timer-buttons">
        <button onClick={start} className="timer-button start-button">Start</button>
        <button onClick={stop} className="timer-button stop-button">Stop</button>
        <button onClick={reset} className="timer-button reset-button">Reset</button>
      </div>
      <div className="timer-display">Time left: {time} seconds</div>
      {alarm && <div className="alarm-message">⏰ {alarm} ⏰</div>}
    </div>
  );
}

export default Timer;
