import { useSelector } from "react-redux";

interface IProfilePage {
  username?: string | null;
  data?: [];
}

export const Profile = ({}: /* username, data */ IProfilePage) => {
  const dataS = ["hello", "world", "again"];

  const username = useSelector((state) => state.users.userName);

  return (
    <>
      <h2>Hello, {username}!</h2>
      <section>
        <ul>
          {dataS.map((item) => {
            <li>{item}</li>;
          })}
        </ul>
      </section>
    </>
  );
};
