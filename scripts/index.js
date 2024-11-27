let addForm = elem("form#add-form");
addForm.onsubmit = function(element) {
    element.preventDefault();

    let username = elem("form#add-form input#username");
    let email = elem("form#add-form input#email");
    let password = elem("form#add-form input#password");
    let fullName = elem("form#add-form input#full-name");
    let birthDate = elem("form#add-form input#birthdate");

    asyncFetch(
        "api.php",
        "POST",
        undefined,
        new URLSearchParams({
            "account": "new",
            "username": username.value,
            "email": email.value,
            "password": password.value,
            "name": fullName.value,
        })
    ).then(response => {

        console.log(response);

        try {
            response = JSON.parse(response);
        } catch(e) {
            console.log(e);
            return;
        }

        alert(response["message"]);
        window.location.reload();
    });
}