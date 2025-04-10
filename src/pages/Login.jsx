import { useState } from "react";
const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const body = new URLSearchParams();
      body.append("email", email);
      body.append("password", password);
  
      try {
        const res = await fetch("https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body
        });
  
        const responseText = await res.text();
  
        if (!res.ok) {
          try {
            const json = JSON.parse(responseText);
            setError(json.description || "Error desconocido");
          } catch {
            setError("Error al procesar la respuesta del servidor.");
          }
          return;
        }
  
        onLoginSuccess();
        setError(null);
      } catch (err) {
        setError("Error de conexión con el servidor.");
      }
    };
  
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={handleLogin} noValidate>
          <h2 className="login-title">Amalgama</h2>
  
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
            required
          />
  
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required
          />
  
          <button type="submit" className="login-button">Login</button>
  
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    );
  };
export default Login;
