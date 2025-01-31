import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const SomeComponent = () => {
  const { setOpenSignupDialog } = useContext(AuthContext);

  const handleProtectedAction = () => {
    // Check if user is logged in
    if (!userIsLoggedIn) {
      setOpenSignupDialog(true);
    }
  };

  return <></>;
};
