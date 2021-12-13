import style from "./style.module.css";
import { useSelector } from "react-redux";
import { CustomSingleSelect, CustomButton } from "../../components/components";
import { useState } from "react";
import { getPlatformFromSelector } from "../../helpers/functions";
import { Option } from "react-dropdown";

export const Cart = () => {
  const cart = useSelector((state) => state.users.cartItems);
  const getPlatformsForDropdown = (arr: string[]): Option[] => {
    return arr.map((item) => {
      return {
        label: getPlatformFromSelector(item),
        value: item,
      };
    });
  };
  console.log(cart);
  return (
    <div
      className={style.container}
      style={{ background: `url(/assets/images/bg_4.jpg) no-repeat center center/cover` }}
    >
      <section className={style.section}>
        <div className={style.title}>Cart page</div>
        <ul>
          <li className={style.tableHeader}>
            <span>Name</span>
            <span>Platform</span>
            <span>Order date</span>
            <span>Amount</span>
            <span>Price($)</span>
          </li>
          {cart
            ? cart.map((item) => {
                return (
                  <li key={item.gameId} className={style.tableRow}>
                    <span>{item.gameName}</span>
                    <span>
                      {
                        <CustomSingleSelect
                          options={getPlatformsForDropdown(item.gamePlatforms)}
                          placeholder={getPlatformFromSelector(item.selectedPlatform)}
                        />
                      }
                    </span>
                    <span>{new Date().toLocaleString("en-GB", { dateStyle: "short" })}</span>
                    <span></span>
                    <span>{item.gamePrice}</span>
                  </li>
                );
              })
            : null}
          <li>
            <CustomButton className={style.removeBtn} onClick={() => alert("Pressed!")} title="Remove" />
          </li>
        </ul>
      </section>
    </div>
  );
};
