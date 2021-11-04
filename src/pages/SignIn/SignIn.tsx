// import { Redirect } from "react-router-dom";
// import { useState } from "react";

export const SignIn = () => {
  // const [isError, setIsError] = useState(true);
  // if (isError) {
  //   return <Redirect to="/" />;
  // }

  return (
    <form>
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button type="submit">Sign in</button>
    </form>
  );
};
