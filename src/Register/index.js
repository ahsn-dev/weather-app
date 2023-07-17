import Routes from "../routes";

const form = document.getElementById("registerForm");
const registerEmailInput = document.getElementById("registerEmail");
const registerPasswordInput = document.getElementById("registerPassword");

async function postData(data) {
  try {
    await fetch("http://localhost:3003/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
}

const saveUserInfo = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let userInfo = {
      email: registerEmailInput.value,
      password: registerPasswordInput.value,
    };
    postData(userInfo);
    form.reset();

    const registerMessage = document.getElementById("registerMessage");
    registerMessage.innerHTML = "You have successfully registered.";
    registerMessage.style.color = "green";
    registerMessage.style.marginTop = "-20px";
    registerMessage.style.marginBottom = "20px";
    setTimeout(() => {
      registerMessage.innerHTML = "";
      history.pushState(null, null, "/login");
      Routes();
    }, 3000);
  });
};

export default saveUserInfo;
