import React, { FC, useContext, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../../index";
import { STAGE } from "./stage";
import Product from "../../../components/common/product";
import "./index.scss";
import {toJS} from 'mobx';

const ProductPage: FC = () => {
  const { store } = useContext(Context);
  const [nextStep, setNextStep] = useState(STAGE.START);
  const productId = localStorage.getItem("productId");

  let product = useMemo(() => store.productForBuy, [store.productForBuy]);
  if (!product) {
    store.getProduct(productId as string);
  }

  const handleSubmit = async () => {
    await store.createOrder();
    setNextStep(STAGE.BUY);
  };

  const handleAbort = () => {
    store.setProductForBuy(null);
    setNextStep(STAGE.ABORT);
  };

  if (nextStep === STAGE.BUY && store.orderForPay) {
    const orderForPayId = store.orderForPay.orderId.toString();
    return <Navigate to={"/orders/" + orderForPayId + "/payment"} />;
  }
  if (nextStep === STAGE.ABORT) {
    return <Navigate to={"/products"} />;
  }
  return (
    <div className="confirm-buy">
      {store.isAuth ? (
        <>
          <h2 className="confirm-buy__title">
            Hi <span>{store.user.firstName} </span>
            <span>{store.user.lastName}!</span>
          </h2>
          <p className="confirm-buy__sub-title">
            Please check the product you want to buy
          </p>
          {product && <Product product={product} />}
          <div className="confirm-buy__finish-btns">
            <button
              className="confirm-buy__finish-btns__btn-item"
              onClick={handleSubmit}
            >
              Confirm and pay
            </button>
            <button
              className="confirm-buy__finish-btns__btn-item"
              onClick={handleAbort}
            >
              Abort
            </button>
          </div>
        </>
      ) : (
        <h2 className="confirm-buy__title">
          Please authorize if you want to by something
        </h2>
      )}
    </div>
  );
};

export default observer(ProductPage);
