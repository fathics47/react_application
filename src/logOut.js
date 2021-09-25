import { Button } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { MyContext } from "./App";

export default function LogOut() {
  const { setLogIn } = useContext(MyContext);
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        sessionStorage.removeItem("email")
        setLogIn(false);
      }}
    >
      <LogoutIcon />
      Logout
    </Button>
  );
}
