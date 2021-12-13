import style from "./style.module.css";
import Dropdown, { Option } from "react-dropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";

interface Props {
  dropdownOptions: Option[];
  placeholder?: string;
}

const DropdownMenu = ({ /* history, */ dropdownOptions /*placeholder*/ }: Props): ReactElement => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState<Option>();
  const onChangeHandler = (e: Option): void => {
    navigate(`${e.value}`);
  };

  useEffect(() => {
    if (location.pathname.includes("products")) {
      /* Make switching dropdown selected if redirected from some external links to product page */
      switch (location.pathname) {
        case "/products/pc":
          setSelected({ label: "PC", value: "/products/pc" });
          break;
        case "/products/xboxOne":
          setSelected({ label: "XBox One", value: "/products/xbox" });
          break;
        case "/products/playstation5":
          setSelected({ label: "Playstation 5", value: "/products/playstation5" });
          break;
        default:
          setSelected({ label: "Products", value: "/products/" });
      }
      setActive(" active");
    } else if (active.includes("active")) {
      setActive("");
      setSelected({ label: "Products", value: "/products/" });
    }
  }, [location.pathname]);

  return (
    <Dropdown
      options={dropdownOptions}
      arrowClosed={<span className="arrow-closed">&#11206;</span>}
      arrowOpen={<span className="arrow-open">&#11205;</span>}
      placeholder="Products"
      className={style.DropdownRoot + active}
      controlClassName={style.dropdownControl}
      value={selected}
      menuClassName={style.menu}
      onChange={onChangeHandler}
    />
  );
};

export default DropdownMenu;
