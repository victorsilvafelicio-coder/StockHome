import fundo from "./assets/tela-login.png";
import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuário:", username, "Senha:", password);
    // Aqui você pode adicionar a lógica de login
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="login-overlay">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">ENTRAR</button>
          </div>
          <a href="/esqueci-senha" className="forgot-password">
            Esqueci a senha
          </a>
        </form>
      </div>
    </div>
  );
}

export default App;
