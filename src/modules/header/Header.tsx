import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "../../consts/routePaths";
import "./index.scss";

const links = (
  <div className="navigation-wrapper">
    <NavLink to={ROUTE_PATHS.PRODUCTS}>Products</NavLink>
    <NavLink to={ROUTE_PATHS.ORDERS}>Orders</NavLink>
    <NavLink to={ROUTE_PATHS.SIGNUP}>Sign up</NavLink>
    <NavLink to={ROUTE_PATHS.SIGNIN}>Sign in</NavLink>
  </div>
);

export const Header = () => {
  return <section className="header-wrapper">{links}</section>;
};
