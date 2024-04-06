import { NavLink, NavNavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-7 font-medium">
      <div className="font-bold text-2xl">BuildMeTrader</div>
      <nav>
        <ul className="flex justify-between space-x-8">
          <li>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="strategies"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold" : ""
              }
            >
              Strategies
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="rules"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold" : ""
              }
            >
              Rules
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="mistakes"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold" : ""
              }
            >
              Mistakes
            </NavLink>
          </li> */}
          {auth ? (
            <li>
              <NavLink
                to="login"
                onClick={logout}
                className={({ isActive }) =>
                  isActive ? "text-blue-700 font-bold" : ""
                }
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? "text-blue-700 font-bold" : ""
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
