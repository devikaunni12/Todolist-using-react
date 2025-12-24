import "./App.css";
import Card from "./components/card";
import Navbar from "./components/navbar";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StateCapital from "./components/statecapital";
import LoginValidation from "./components/validation";
import TodoPage from "./components/TodoPage";


function Greeting() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <h2>Hei {text}!!  What’s on your mind today?</h2>
    </div>
  );
}




function Footer() {
  return <p style={{ textAlign: "center" }}>© 2024 My Company</p>;
}




function App() {

const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);


  return (
    <Routes>
      <Route path="/" element={
        <>
          {/* TOP HEADER */}
          <Navbar />

          {/* MAIN CONTENT */}
          <div className="page-content container">
            <h1>Hello Friends</h1>
            <p>This is the main content.</p>
            <Greeting/>
            <LoginValidation/>
            <Card/>
            <StateCapital/>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Link to="/todo" style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#667eea',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}>
                Go to Todo List
              </Link>
            </div>
          </div>
          <div>
            <h1>Count: {count}</h1> {/* Display the current count */}
            <button onClick={increment}>Increment</button> {/* Increment the count */}
            <button onClick={decrement}>Decrement</button> {/* Decrement the count */}
          </div>

          <Footer />
        </>
      } />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
