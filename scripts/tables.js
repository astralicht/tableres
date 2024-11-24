let tablesContainer = elem("div.tables-container");
let tablesInfo;
let tables = [];
let tableModal = elem("div.table-modal");
let modalTitle = elem("div.table-modal div.modal-header h4.modal-title");
let modalCloseButton = elem("div.table-modal button#close-modal");
let parser = new DOMParser();

modalCloseButton.onclick = () => {
    tableModal.querySelector("div.modal-header #modal-title").innerText = "";
    tableModal.querySelector("div.modal-header #status-title").innerText = "";
    tableModal.querySelector("div.modal-body ul.order-list").innerHTML = "";
    fadeOut(tableModal);
}

asyncFetch(
    "api.php?tables=all",
    "GET",
    { "Content-Type": "application/x-www-urlencoded-form" },
    undefined,
).then(response => {
    fillTables(response);
});

function fillTables(response) {
    tablesInfo = response.tables;

    tablesInfo.forEach(info => {
        let template = parser.parseFromString(response.template, "text/html").querySelector("div.table#template")

        template.id = info.id;
        template.querySelector("div.table-header #table-id").innerText = `#${info.id}`;

        let tableStatus = "";
        switch (info.status) {
            case 1:
                tableStatus = "Open";
                template.setAttribute("good-bg", "");
                break;
            case 2:
                tableStatus = "Occupied";
                template.setAttribute("dark-bg", "");
                break;
            case 3:
                tableStatus = "Bill Out";
                template.setAttribute("warning-bg", "");
                break;
            case 4:
                tableStatus = "Reserved";
                template.setAttribute("info-bg", "");
                break;
            case 5:
                tableStatus = "Unavailable";
                template.setAttribute("danger-bg", "");
                break;
        }

        info.status = tableStatus;
        template.querySelector("div.table-header #status").innerText = info.status;

        let ul = template.querySelector("ul.order-list");
        let li;

        if (info.res_name || info.res_datetime) {
            ul.innerHTML = `<i>${info.res_name}</i>`;
        }

        if (info.orders) {
            info.orders.forEach(order => {
                li = "";

                if (!order.is_fulfilled) {
                    li = `<li><i class='fa-solid fa-x' danger-fr></i>${order.name}</li>`;
                } else {
                    li = `<li><i class='fa-solid fa-check' good-fr></i>${order.name}</li>`;
                }

                ul.innerHTML += li;
            });
        }

        template.onclick = () => {
            fillModal(tableModal, info);
            fadeInFlex(tableModal);
        }

        tablesContainer.appendChild(template);
        tables.push(template);

        fadeIn(template);
    });
}

function fillModal(tableModal, info) {
    let tableInfoContainer = tableModal.querySelector("div.table-info-container");
    switch (info.status) {
        case "Open":
            tableInfoContainer.style.borderTop = "16px solid var(--good-color)";
            break;
        case "Occupied":
            tableInfoContainer.style.borderTop = "16px solid var(--dark-color)";
            break;
        case "Bill Out":
            tableInfoContainer.style.borderTop = "16px solid var(--warning-color)";
            break;
        case "Reserved":
            tableInfoContainer.style.borderTop = "16px solid var(--info-color)";
            break;
        case "Unavailable":
            tableInfoContainer.style.borderTop = "16px solid var(--danger-color)";
            break;
    }

    tableModal.querySelector("div.modal-header #modal-title").innerText = `#${info.id}`;
    tableModal.querySelector("div.modal-header #status-title").innerText = info.status;
    
    let modalUl = tableModal.querySelector("div.modal-body ul.order-list");

    if (info.orders) {
        info.orders.forEach(order => {
            li = "";

            if (!order.is_fulfilled) {
                li = `<li><i class='fa-solid fa-x' danger-fr></i>${order.name}</li>`;
            } else {
                li = `<li><i class='fa-solid fa-check' good-fr></i>${order.name}</li>`;
            }

            modalUl.innerHTML += li;
        });
    }
}

function authCheck(selectElem) {
    switch (selectElem.selectedIndex) {
        case 1:
            let username = prompt("Enter admin/manager username:");
            let password = prompt("Enter admin/manager password:");

            if (!username || !password) {
                alert("Admin/Manager credentials required to continue");
                break;
            }

            asyncFetch(
                `api.php?update=check&username=${username}&password=${password}`,
                "GET",
                {"Content-Type": "application/json"}
            ).then(response => {

            });

            break;
    }
}