import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, ArrowRight, Sparkles } from "lucide-react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [officialId, setOfficialId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const id = officialId.trim();
    const pass = password.trim();

    if (id === "aditya" && pass === "1234") {
      localStorage.setItem("genex-login", "true");
      navigate("/app");
    } else {
      alert("Invalid ID or Password");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <main className="login-page">
      <div className="grid-layer"></div>
      <div className="sweep sweep-horizontal"></div>
      <div className="sweep sweep-vertical"></div>
      <div className="orb"></div>

      <section className="brand-section">
        <div className="brand-content">
          <img
            src="/airtel-logo.png"
            alt="Airtel Logo"
            className="airtel-logo-img"
          />

          <h2 className="genex-text">
            GEN<span>EX</span>
          </h2>

          <p className="sub-title">FTTH PLANNING AUTOMATION PLATFORM</p>

          <h3>Automate. Optimize. Accelerate.</h3>

          <p className="desc">Generate and Export Your Way</p>

          <div className="mini-panel">
            <Sparkles size={18} />
            AI-powered BOQ, BOM, MWO & Capex automation
          </div>
        </div>

        <p className="copy">© 2026 Airtel GenEx. All rights reserved.</p>
      </section>

      <section className="form-section">
        <div className="login-card">
          <h1>Welcome</h1>

          <p>Login Now to generate all Your Documents instantly.</p>

          <div className="input-box">
            <User size={25} />

            <div>
              <label>Official ID</label>
              <input
                type="text"
                placeholder="Enter your official ID"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>
          </div>

          <div className="input-box">
            <Lock size={25} />

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleEnter}
              />
            </div>

            <Eye size={20} className="eye" />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" defaultChecked />
              Remember me
            </label>

            <button type="button">Forgot Password?</button>
          </div>

          <button type="button" className="login-btn" onClick={handleLogin}>
            LOGIN TO GENEX <ArrowRight size={22} />
          </button>

          <div className="divider">
            <span></span>
            OR
            <span></span>
          </div>

          <button type="button" className="sso-btn">
            Login with SSO
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;