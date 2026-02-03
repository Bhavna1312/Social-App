import axios from "axios";

// Add 'onLogin' to your function props
export default function login({ onLogin, onNavigate }) {
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email: "bhavna@test.com",
        password: "123456",
      });
      alert("Login successful");

      // CRITICAL: This is what connects Login to App.jsx
      onLogin(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  // Inside login.jsx return
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
        margin: "auto",
        padding: "50px",
      }}
    >
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        id="email"
        style={{ padding: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        style={{ padding: "10px" }}
      />
      <button
        onClick={login}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Login
      </button>
    </div>
  );
}
