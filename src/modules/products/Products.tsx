import React, { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { IProduct } from "../../services/api/types";
import { Context } from "../../index";
import ProductItem from "../../components/common/product/";
import { ROUTE_PATHS } from "../../consts/routePaths";
import "./index.scss";

const Products: FC = () => {
  const { store } = useContext(Context);
  const buyBtnHandler = (el: IProduct) => {
    store.setProductForBuy(el);
    localStorage.setItem("productId", el.id.toString());
  };
  useEffect(() => {
    store.getProducts();
  }, []);

  return (
    <div className="products">
      <h1 className="products__title">Products</h1>
      <ul>
        {store.products.map((el) => (
          <li key={el.id} className="products__product-item">
            <NavLink
              to={ROUTE_PATHS.CONFIRMBUY}
              className="product-item__add-button"
              onClick={() => buyBtnHandler(el)}
            >
              Buy now
            </NavLink>
            <ProductItem product={el} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(Products);
