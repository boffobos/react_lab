import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CustomSingleSelect, CustomButton, Modal } from "../../components/components";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getPlatformFromSelector } from "../../helpers/functions";
import { Option } from "react-dropdown";

export const Cart = () => {
  const dispatch = useDispatch();
  const ballance = useSelector((state) => state.users.ballance);
  const cart = useSelector((state) => state.users.cartItems);
  const [cartCost, setCartCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPlatformsForDropdown = (arr: string[]): Option[] => {
    return arr.map((item) => {
      return {
        label: getPlatformFromSelector(item),
        value: item,
      };
    });
  };

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.gamePrice * item.quantity;
    });
    setCartCost(+price.toFixed(2));
  }, [cart]);

  //handlers for cart items
  const [itemsToRemove, setItemsToRemove] = useState<number[]>([]);
  const setPlatform = (gameId: number) => {
    return (e: Option) => {
      const platform = e.value;
      dispatch({ type: "item/changePlatform", payload: { gameId: gameId, selectedPlatform: platform } });
    };
  };

  const setQuantity = (gameId: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const quantity = e.target.value;
      dispatch({ type: "item/changeQuantity", payload: { gameId: gameId, quantity: quantity } });
    };
  };

  const addItemsToRemoveList = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setItemsToRemove((state) => [...state, +e.target.value]);
    } else {
      setItemsToRemove((state) => [...state.filter((item) => +item !== +e.target.value)]);
    }
  };

  const removeItems = () => {
    dispatch({ type: "item/remove", payload: itemsToRemove });
  };

  const cartContent = useMemo(
    () =>
      cart.map((item) => {
        return (
          <li key={item.gameId} className={style.tableRow}>
            <span>{item.gameName}</span>
            <span>
              {
                <CustomSingleSelect
                  onChange={setPlatform(item.gameId)}
                  options={getPlatformsForDropdown(item.gamePlatforms)}
                  placeholder={getPlatformFromSelector(item.selectedPlatform)}
                />
              }
            </span>
            <span>{new Date().toLocaleString("en-GB", { dateStyle: "short" })}</span>
            <span>
              <input
                className={style.quantity}
                value={item.quantity}
                onChange={setQuantity(item.gameId)}
                type="number"
              />
            </span>
            <span>{item.gamePrice}</span>
            <span>
              <input type="checkbox" value={item.gameId} onChange={addItemsToRemoveList} />
            </span>
          </li>
        );
      }),
    [cart]
  );

  return (
    <>
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
            {cart ? cartContent : null}
            <li className={`${style.btnContainer} ${style.tableRow}`}>
              <CustomButton className={style.removeBtn} onClick={removeItems} title="Remove" />
            </li>
            <li className={style.totalRow}>
              <span>Games cost: {cartCost} $</span>
              <span>Your Ballance: {ballance} $</span>
              <CustomButton
                className={style.buyBtn}
                onClick={() => {
                  setIsModalOpen(true);
                }}
                title="Buy"
              />
            </li>
          </ul>
        </section>
      </div>
      <Modal isOpen={isModalOpen} modalName="Confirmation" onClose={() => setIsModalOpen(false)}>
        {ballance > cartCost ? (
          <p className={style.modalText}>Are you sure you it is all you want to buy?</p>
        ) : (
          <p className={style.modalText}>Not enought money</p>
        )}
        <CustomButton
          className={style.modalBtn}
          onClick={() => setIsModalOpen(false)}
          title={ballance > cartCost ? "Confirm" : "Close"}
        />
      </Modal>
    </>
  );
};
