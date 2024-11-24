let resDateFilter = elem("input#res-date-filter");
resDateFilter.valueAsDate = new Date();

function fetchReservations() {
    sendRequest(`api.php/reservations?date=${resDateFilter.value}`, "GET", {"Content-Type": "application/json"}, undefined, resToConsole);
}

function resToConsole(res) {
    // error handling here

    let reservations = res["body"];

    if (reservations.length != 0) {
        reservations.forEach(entry => {
            console.log(entry["name"]);
        })
    }
}