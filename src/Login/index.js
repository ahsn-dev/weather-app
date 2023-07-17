const loginForm = document.getElementById("loginForm");

import Cookies from "js-cookie";
import Routes from "../routes";

const loginUser = () => {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    history.pushState(null, null, "/");

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Check if user is already registered
    const response = await fetch(`http://localhost:3003/users?email=${email}`);
    const data = await response.json();

    if (data.length > 0 && data[0].password === password) {
      // User is registered and password is correct
      Cookies.set("user", JSON.stringify(data[0]), { expires: 2 });
      history.pushState(null, null, "src/Weather/index.html");
      Routes();
      window.location.reload();
    } else {
      // User is not registered, show message to register
      const loginMessage = document.getElementById("loginMessage");
      loginMessage.innerHTML = "You need to register first.";
      loginMessage.style.color = "red";
      loginMessage.style.marginTop = "-20px";
      loginMessage.style.marginBottom = "20px";
      setTimeout(() => {
        loginMessage.innerHTML = "";
        history.pushState(null, null, "/register");
        Routes();
      }, 3000);
    }

    loginForm.reset();
  });
};

export default loginUser;
