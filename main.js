import "./style.css";
import saveUserInfo from "./src/Register";
import loginUser from "./src/Login";

history.pushState(null, null, "/");
saveUserInfo();
loginUser();
