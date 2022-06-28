import React, { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import OrderItem from "./orderItem";
import "./index.scss";

const Orders: FC = () => {
  const { store } = useContext(Context);
  let orders = store.orders;

  useEffect(() => {
    store.getOrders();
  }, []);

  return (
    <div className="orders">
      {store.isAuth ? (
        <>
          <h2 className="orders__title">
            Hi <span>{store.user.firstName} </span>
            <span>{store.user.lastName}!</span>
          </h2>
          <p>Your orders list{store.orders.length ? ":" : " is empty"}</p>
          <ul>
            {orders.map((el) => (
              <OrderItem order={el} key={el.orderId} />
            ))}
          </ul>
        </>
      ) : (
        <p>Please authorize to see your order list</p>
      )}
    </div>
  );
};

export default observer(Orders);
