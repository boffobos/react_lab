import css from "./NavlinkButton.module.css";

interface Props {
  className?: string;
  link?: string;
  text: string;
}

export const NavlinkButton = ({ text, link = "#" }: Props): JSX.Element => {
  return (
    <li className={css.active}>
      <a href={link}>{text}</a>
    </li>
  );
}
