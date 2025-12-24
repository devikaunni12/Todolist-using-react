import React, { useState } from "react";


function StateCapital() {
  const [selectedState, setSelectedState] = useState("");

  const stateCapitals = {
    Kerala: "Thiruvananthapuram",
    TamilNadu: "Chennai",
    Karnataka: "Bengaluru",
    Maharashtra: "Mumbai",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select a State</h2>

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">-- Select State --</option>
        <option value="Kerala">Kerala</option>
        <option value="TamilNadu">Tamil Nadu</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Maharashtra">Maharashtra</option>
      </select>

      {selectedState && (
        <p style={{ marginTop: "15px" }}>
          Capital: <strong>{stateCapitals[selectedState]}</strong>
        </p>
      )}
    </div>
  );
}
export default StateCapital;