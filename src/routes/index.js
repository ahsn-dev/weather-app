const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const mainSection = document.getElementById("mainSection");
const login = document.getElementById("login");
const register = document.getElementById("register");

const Routes = () => {
  const routes = mainSection || "";
  routes.innerHTML = "";

  switch (location.pathname) {
    case "/login":
      return routes.appendChild(login);

    case "/register":
      return routes.appendChild(register);

    default:
      return (routes.innerHTML = "Page Not Found!!!");
  }
};

loginButton.addEventListener("click", () => {
  history.pushState(null, null, "/login");
  Routes();
});

registerButton.addEventListener("click", () => {
  history.pushState(null, null, "/register");
  Routes();
});

export default Routes;
