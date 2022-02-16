import React from "react";
import { Header } from "@modules/header";
import { Routing } from "./router";
import "./app.scss";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Routing />
    </div>
  );
};
