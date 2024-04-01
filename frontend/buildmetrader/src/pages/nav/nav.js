import { NavLink, NavNavLink } from "react-router-dom";

function NavBar() {
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
          <li>
            <NavLink
              to="landing"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-bold" : ""
              }
            >
              Landing
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
