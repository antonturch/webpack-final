import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import "./index.scss";
import { IProduct } from "../../services/api/types";

const Products: FC = () => {
  const { store } = useContext(Context);

  const [disableBuyBtn, setDisableBuyBtn] = useState(false);

  useEffect(() => {
    store.getProducts();
  }, []);

  const buyBtnHandler = (el: IProduct) => {
    store.addOrder(el.id);
    setDisableBuyBtn(true);
  };

  return (
    <div className="products-wrapper">
      <h1>Products</h1>
      {store.products.map((el) => (
        <div key={el.id} className="product">
          {disableBuyBtn || (
            <button
              className="product__add-button"
              onClick={() => buyBtnHandler(el)}
            >
              Buy now
            </button>
          )}
          <img className="product__img" src={el.img} />
          <div className="product__info">
            <div>{el.name}</div>
            <div>
              {el.price} {el.currency}
            </div>
            <div>{el.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default observer(Products);
