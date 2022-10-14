import React from "react";
import { useUserContext } from "../context/UserContext";

const Counter = () => {
  const { user } = useUserContext();

  console.log(user);

  return (
    <div>
      <p>Whats up?</p>
    </div>
  );
};

export default Counter;
