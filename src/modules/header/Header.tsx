import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "../../consts/routePaths";
import "./index.scss";

const links = (
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
  </ul>
);

export const Header = () => {
  return <section className="header-wrapper">{links}</section>;
};
