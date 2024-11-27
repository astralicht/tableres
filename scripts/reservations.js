let resTable = elem("table#res-table");
let resTableBody = elem("table#res-table tbody");
let codeFilterInput = elem("input#code-filter");
let dateFilterInput = elem("input#date-filter");
let timeslotSelects = elems("select#timeslot");

resFetch();

codeFilterInput.onchange = function() {
    resFetch(dateFilterInput.value, codeFilterInput.value);
}

dateFilterInput.onchange = function() {
    resFetch(dateFilterInput.value, codeFilterInput.value);
}

asyncFetch("api.php?timeslots", "GET")
.then(response => {
    try {
        response = JSON.parse(response);
    } catch(e) {
        console.log(e);
        return;
    }

    timeslotSelects.forEach(timeslotSelect => {
        let option;
        timeslotSelect.innerHTML = "<option value='NULL'></option>";
        response["rows"].forEach(row => {
            option = document.createElement("option");
            option.value = row.id;
            option.innerText = row.timeslot;
            timeslotSelect.appendChild(option);
        });
    });
});

function resFetch(date = "", resCode = "") {
    asyncFetch(`api.php?reservations&date=${date}&res_code=${resCode}`, "GET")
    .then(response => {
        try {
            response = JSON.parse(response);
        } catch(e) {
            console.log(e);
            return;
        }

        resTableBody.innerHTML = "";

        let resTableMessage = elem("i#res-table-message");

        if (response["rows"].length == 0) {
            resTableMessage.style.display = "block";
        }

        let rows = response["rows"];

        for (let i = 0; i < rows.length; i++) {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${rows[i]["code"]}</td>
                <td>${rows[i]["name"]}</td>
                <td style='text-align:right'>${rows[i]["guests_num"]}</td>
                <td>${rows[i]["res_date"]}</td>
                <td>${rows[i]["timeslot"]}</td>
                <td flex="h" v-center>
                    <button id="update-res" white-fr warning-bg style="padding: 8px 16px;" onclick="updateRes(${rows[i]["id"]})">Update</button>
                    <button id="delete-res" white-fr danger-bg style="padding: 8px 16px;" onclick="deleteRes(${rows[i]["id"]})">Delete</button>
                </td>
            `
            resTableBody.appendChild(tr);
            resTableMessage.style.display = "none";
        }
    });
}

let createResForm = elem("form#create-res");
let createResReset = elem("form#create-res button[type=reset]");

let createResInputs = elems("form#create-res [name]");
let params = {};

createResForm.onsubmit = function(element) {
    element.preventDefault();

    createResInputs.forEach(input => {
        params[input.name] = input.value;
    });

    params["reservations"] = "new";

    asyncFetch(
        "api.php?reservations=new",
        "POST",
        undefined,
        new URLSearchParams(params)
    ).then(response => {
        try {
            response = JSON.parse(response);
        } catch(e) {
            console.log(e);
            return;
        }
        
        if (response["status"] == "200") {
            alert("Reservation created successfully!");
            createResForm.reset();
            window.location.href="/dashboard.php";
        }
    });
}

createResReset.onclick = function() {
    fadeOut(currentVisiblePage);
    setTimeout(()=>{
        currentVisiblePage = previousPage;
        fadeIn(currentVisiblePage);
        previousPage = undefined;
    }, 150);
    createResForm.reset();
}

function deleteRes(id) {
    if (confirm("Are you sure you want to delete this reservation?")) {
        asyncFetch(`api.php?reservations=delete&id=${id}`, "GET")
        .then(response => {

            console.log(response);

            try {
                response = JSON.parse(response);
            } catch(e) {
                console.log(e);
                return;
            }

            alert(response.message);
            window.location.reload();
        });
    }
};

let updateResForm = elem("form#update-res");
let updateResReset = elem("form#update-res button[type=reset]");

let updateResInputs = elems("form#update-res [name]");

updateResForm.onsubmit = function(element) {
    element.preventDefault();

    updateResInputs.forEach(input => {
        params[input.name] = input.value;
    });

    params["reservations"] = "update";

    console.log(params);

    asyncFetch(
        "api.php",
        "POST",
        undefined,
        new URLSearchParams(params)
    ).then(response => {
        try {
            response = JSON.parse(response);
        } catch(e) {
            console.log(e);
            return;
        }
        
        if (response["status"] == "200") {
            alert("Reservation updated successfully!");
            createResForm.reset();
            window.location.href="/dashboard.php";
        }
    });
}

updateResReset.onclick = function() {
    fadeOut(currentVisiblePage);
    setTimeout(()=>{
        currentVisiblePage = previousPage;
        fadeIn(currentVisiblePage);
        previousPage = undefined;
    }, 150);
    createResForm.reset();
}