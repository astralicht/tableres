let loginForm = elem("form#login");
let loginMessage = elem("form#login #message");

if (window.location.search != "") {
    let queryStringArr = ((window.location.search).split("?")[1]).split("=");

    if (queryStringArr.includes("e") && queryStringArr.includes("auth-required")) {
        loginMessage.setAttribute("alert-bg", "");
        loginMessage.innerText = "Please login to continue.";
        loginMessage.style.display = "block";
    }
}

loginForm.onsubmit = (element) => {
    element.preventDefault();

    let username = elem("form#login input#username").value;
    let password = elem("form#login input#password").value;
    
    asyncFetch(
        "auth.php",
        "POST",
        undefined,
        new URLSearchParams({
            "username": username,
            "password": password,
        }),
    ).then(response => {
        switch (response["status"]) {
            case "200":
                window.location.href = "/dashboard.php";
                break;
            case "401":
                loginMessage.setAttribute("danger-bg", "");
                loginMessage.innerText = "Login invalid! Check your login credentials and try again.";
                loginMessage.style.display = "block";
                break;
            case "500":
                loginMessage.setAttribute("warning-bg", "");
                loginMessage.innerText = "Server error encountered. Please try again in a few minutes.";
                loginMessage.style.display = "block";
                break;
        }
    });
}