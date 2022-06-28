import React, { useContext, useEffect } from "react";
import { Routing } from "./router";
import { Context } from "./index";
import Header from "@modules/header/Header";
import "./app.scss";

export const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.checkAuth();
  }, []);

  return (
    <div className="app">
      <h1>{store.isAuth ? "Пользователь авторизован" : null}</h1>
      <Header />
      <Routing />
    </div>
  );
};
