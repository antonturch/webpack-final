import React, { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import "./index.scss";

const Orders: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getOrders();
  }, []);

  return (
    <div className="orders-wrapper">
      <h1>Orders</h1>
      {store.isAuth ? (
        <div>
          <h1>
            Hi <span>{store.user.firstName} </span>
            <span>{store.user.lastName}!</span>
          </h1>
          Here will be shown your orders
        </div>
      ) : (
        <div>Please authorize to see your order list</div>
      )}
      <div>
        {store.orders.length}
      </div>
    </div>
  );
};

export default observer(Orders);
