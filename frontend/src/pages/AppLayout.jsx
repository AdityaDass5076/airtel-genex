import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  FolderKanban,
  UploadCloud,
  FileText,
  Network,
  Wrench,
  Building2,
  ShieldCheck,
  BarChart3,
  HelpCircle,
  Settings,
  LogOut,
  Bell,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import "./AppLayout.css";

function AppLayout() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const savedTheme = localStorage.getItem("genex-theme") || "default";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateText = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeText = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const logout = () => {
    localStorage.removeItem("genex-login");
    navigate("/");
  };

  const menu = [
    { name: "Home", path: "/app", icon: Home },
    { name: "Project", path: "/app/project", icon: FolderKanban },
    { name: "Upload Design", path: "/app/upload", icon: UploadCloud },
    { name: "MWO", path: "/app/mwo", icon: FileText },
    { name: "OSP & ODN", path: "/app/osp-odn", icon: Network },
    { name: "OH Accessories", path: "/app/oh-accessories", icon: Wrench },
    { name: "FTTH Details", path: "/app/ftth-details", icon: Building2 },
    { name: "Verification", path: "/app/verification", icon: ShieldCheck },
    { name: "Reports", path: "/app/reports", icon: BarChart3 },
    { name: "Help", path: "/app/help", icon: HelpCircle },
    { name: "Settings", path: "/app/settings", icon: Settings },
  ];

  return (
    <div className="genex-app">
      <aside className="genex-sidebar">
        <div className="brand-block">
          <img src="/airtel-logo.png" alt="Airtel" className="sidebar-logo" />
          <h2>
            GEN<span>EX</span>
          </h2>
          <p>FTTH PLANNING AUTOMATION</p>
        </div>

        <nav className="side-menu">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/app"}
                className={({ isActive }) =>
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="avatar">AD</div>

            <div className="user-info">
              <h4>{localStorage.getItem("genex-user-name") || "Aditya"}</h4>
              <p>{localStorage.getItem("genex-user-role") || "Planner"}</p>
            </div>

            <ChevronDown size={17} />
          </div>

          <button className="logout-btn" onClick={logout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="genex-main">
        <header className="topbar">
          <div>
            <h3>
              AIRTEL <span>GENEX</span>
            </h3>
            <p>DWG to BOQ/BOM/MWO Automation</p>
          </div>

          <div className="top-actions">
            <div className="date-chip">
              <CalendarDays size={17} />
              {dateText} | {timeText}
            </div>

            <Bell className="bell" />

            <div className="avatar">AD</div>
          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AppLayout;