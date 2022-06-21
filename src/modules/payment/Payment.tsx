import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import Product from "../../components/common/product";
import "./index.scss";
import StripeContainer from "../../components/common/stripeContainer";

const Payment: FC = () => {
  const { store } = useContext(Context);
  const orderId = Number(useParams().orderId);
  const productId = localStorage.getItem("productId");
  let product = useMemo(() => store.productForBuy, [store.productForBuy]);
  const [showItem, setShowItem] = useState(false);
  useEffect(() => {
    store.getOrder(orderId);
  }, []);

  useEffect(() => {
    return () => store.setProductForBuy(null);
  }, []);

  if (!product) {
    store.getProduct(productId as string);
    product = store.productForBuy;
  }

  const handleSubmit = async () => {
    setShowItem(true);
  };

  return (
    <div className="payment">
      <h1 className="payment__title">Payment</h1>
      {store.isAuth ? (
        <>
          {product && <Product product={product} />}
          {showItem ? (
            <StripeContainer />
          ) : (
            <>
              <h3>$10.00</h3>
            </>
          )}
          <button className="payment__pay-btn" onClick={handleSubmit}>
            Purchase it
          </button>
        </>
      ) : (
        <div>Please authorize to pay you order</div>
      )}
    </div>
  );
};

export default observer(Payment);
