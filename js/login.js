const loginForm = document.querySelector(".login-form");

const showLoginAlert = (message, className) => {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".login-container");
  container.insertBefore(div, loginForm);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

const formEvent = loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const loginInfo = await { email, password };
  if (email === "" || password === "") {
    showLoginAlert("Please Fill All Fields", "error");
  } else {
    userLogin(loginInfo);
  }
});

const userLogin = async (loginInfo) => {
  //  http://localhost:8080/login
  headers = {
    'Content-Type': 'application/json',
    'withCredentials': true
  }


  axios
    .post("https://hackxbackend.herokuapp.com/login",  loginInfo, { headers: headers})
    .then((response) => {
      response.data;
      // console.log(response)
      if (response.status == "200") {
        if (response.data == "Login Incorrect") {
          showLoginAlert("Login Incorrect", "error");
        } else if (response.data == "Wrong email entered.") {
          showLoginAlert("Wrong email entered.", "error");
        } else if (response.data == "Password Incorrect.") {
          showLoginAlert("Password Incorrect.", "error");
        } else if (response.data == "Session Redirection To Dashboard"){
          window.location.href = 'https://hackx.netlify.app/pages/dashboard_page';
        }else {
          showLoginAlert("Login Successfully", "success");
          localStorage.setItem("pass", response.data.token);
          localStorage.setItem("id", response.data.id);
          window.location.href = 'https://hackx.netlify.app/pages/dashboard_page';

        }
      } else {
        showLoginAlert("Something Went Wrong. Try Again Later", "error");
      }
    })

    .catch((error) => console.error(error));
};
