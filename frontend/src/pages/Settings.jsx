import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor,
  Save,
  User,
  Bell,
  Shield,
  Database,
} from "lucide-react";
import "./Settings.css";

function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem("genex-theme") || "default");
  const [profile, setProfile] = useState({
    name: localStorage.getItem("genex-user-name") || "Aditya",
    role: localStorage.getItem("genex-user-role") || "Planner",
    email: localStorage.getItem("genex-user-email") || "",
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("genex-theme", theme);
  }, [theme]);

  const saveSettings = () => {
    localStorage.setItem("genex-user-name", profile.name);
    localStorage.setItem("genex-user-role", profile.role);
    localStorage.setItem("genex-user-email", profile.email);
    alert("Settings saved successfully.");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>Manage profile, theme, notifications, security and application preferences.</p>
        </div>

        <button className="settings-save-btn" onClick={saveSettings}>
          <Save size={18} />
          Save Settings
        </button>
      </div>

      <div className="settings-grid">
        <div className="settings-card wide">
          <div className="card-title">
            <SettingsIcon />
            <h2>Application Theme</h2>
          </div>

          <p className="muted">Choose the visual mode for Airtel GenEx.</p>

          <div className="theme-options">
            <button
              className={theme === "default" ? "theme-option active" : "theme-option"}
              onClick={() => setTheme("default")}
            >
              <Monitor />
              <h3>Default</h3>
              <p>Airtel futuristic red-blue theme</p>
            </button>

            <button
              className={theme === "light" ? "theme-option active" : "theme-option"}
              onClick={() => setTheme("light")}
            >
              <Sun />
              <h3>Light</h3>
              <p>Bright clean dashboard mode</p>
            </button>

            <button
              className={theme === "dark" ? "theme-option active" : "theme-option"}
              onClick={() => setTheme("dark")}
            >
              <Moon />
              <h3>Dark</h3>
              <p>Pure black high contrast mode</p>
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-title">
            <User />
            <h2>User Profile</h2>
          </div>

          <label>
            Name
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </label>

          <label>
            Role
            <select
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option>Planner</option>
              <option>Design Engineer</option>
              <option>Verifier</option>
              <option>Admin</option>
            </select>
          </label>

          <label>
            Email
            <input
              value={profile.email}
              placeholder="Enter official email"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </label>
        </div>

        <div className="settings-card">
          <div className="card-title">
            <Bell />
            <h2>Notifications</h2>
          </div>

          <SettingToggle title="Report generation alerts" />
          <SettingToggle title="Verification warnings" />
          <SettingToggle title="Upload completion alerts" />
          <SettingToggle title="Download status alerts" />
        </div>

        <div className="settings-card">
          <div className="card-title">
            <Shield />
            <h2>Security</h2>
          </div>

          <SettingToggle title="Remember login session" />
          <SettingToggle title="Require verification before export" />
          <SettingToggle title="Lock reports after generation" />

          <div className="security-note">
            Current login ID: <b>aditya</b>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-title">
            <Database />
            <h2>Data Settings</h2>
          </div>

          <SettingToggle title="Store project data locally" />
          <SettingToggle title="Save extraction history" />
          <SettingToggle title="Auto-refresh dashboard values" />

          <button
            className="danger-btn"
            onClick={() => {
              localStorage.removeItem("genex-project");
              localStorage.removeItem("genex-extraction");
              alert("Project and extraction data cleared.");
            }}
          >
            Clear Project Data
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ title }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="setting-toggle">
      <span>{title}</span>
      <button
        className={enabled ? "toggle active" : "toggle"}
        onClick={() => setEnabled(!enabled)}
      >
        <span></span>
      </button>
    </div>
  );
}

export default Settings;
