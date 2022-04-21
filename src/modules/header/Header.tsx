import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ROUTE_PATHS } from "../../consts/routePaths";
import { Context } from "../../index";
import "./index.scss";

const Header = () => {
  const { store } = useContext(Context);
  return (
    <nav className="header-wrapper">
      <ul className="nav-items">
        <li>
          <NavLink className="nav-item" to={ROUTE_PATHS.PRODUCTS}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to={ROUTE_PATHS.ORDERS}>
            Orders
          </NavLink>
        </li>
        {!store.isAuth && (
          <>
            <li>
              <NavLink className="nav-item" to={ROUTE_PATHS.SIGNUP}>
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-item" to={ROUTE_PATHS.SIGNIN}>
                Sign in
              </NavLink>
            </li>
          </>
        )}
        {store.isAuth &&
          <li>
            <a className="nav-item" onClick={() => store.logout()}>
              Sign out
            </a>
          </li>
        }
      </ul>
    </nav>
  );
};

export default observer(Header);
