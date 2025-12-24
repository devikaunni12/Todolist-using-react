import { useState } from "react";

function LoginValidation() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    } else if (username.length < 4) {
      validationErrors.username = "Username must be at least 4 characters";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrors(validationErrors);
  };

  return (
    <div style={{ maxWidth: "350px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div style={{ marginBottom: "12px" }}>
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p style={{ color: "red", margin: "4px 0" }}>
              {errors.username}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "12px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p style={{ color: "red", margin: "4px 0" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginValidation;
