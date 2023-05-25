import { StyleSheet, View, Text, Button } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/loginAction";

// Import components
import { LoginForm } from "../components/LoginForm";
import { UserComponent } from "../components/UserComponent";

export function UserScreen() {
  const dispatch = useDispatch();

  const isLogged = useSelector((store) => store.isLogged.isLogged);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLogged) {
    return (
      <UserComponent />
    );
  } else {
    return <LoginForm />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
