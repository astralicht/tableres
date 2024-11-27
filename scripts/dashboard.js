let currentVisiblePage = elem(`div.spa-content-container div#reservations`);
currentVisiblePage.style.display = "block";
currentVisiblePage.style.opacity = "1";

let currentActiveNavButton = elem("div#spa-menu button.spa-nav-button#reservations");
let previousPage;

window.onresize = function() {
    let spaMenu = elem("div#spa-menu");
    if (document.body.clientWidth > 1000) {
        spaMenu.style.display = "flex";
        spaMenu.style.width = "250px";
        spaMenu.style.opacity = "1";
    } else {
        spaMenu.style.display = "none";
        spaMenu.style.width = "100%";
        spaMenu.style.opacity = "0";
    }
}

Array.from(elems("div#spa-menu button.spa-nav-button")).forEach(button => {
    button.onclick = ()=>{
        currentActiveNavButton.removeAttribute("active");
        button.setAttribute("active", "");
        currentActiveNavButton = button;

        if (button.id == "refresh") {
            window.location.reload();
            return;
        }

        if (screen.availWidth <= 1000) {
            fadeOut(elem("div#spa-menu"));
        }

        setTimeout(() => {
            fadeOut(currentVisiblePage);
            setTimeout(()=>{
                currentVisiblePage = elem(`div.spa-content-container div#${button.id}`);
                fadeIn(currentVisiblePage);
            }, 300);
        }, 150);
    }
})

elem("button#create-res").onclick = function() {
    previousPage = currentVisiblePage;
    fadeOut(currentVisiblePage);
    setTimeout(()=>{
        currentVisiblePage = elem(`div.spa-content-container div#create-res`);
        fadeIn(currentVisiblePage);
    }, 150);
}

elem("div#create-res button#back-button").onclick = function() {
    fadeOut(currentVisiblePage);
    setTimeout(()=>{
        currentVisiblePage = previousPage;
        fadeIn(currentVisiblePage);
        previousPage = undefined;
    }, 150);
    elem("form#create-res").reset();
}

function updateRes(id) {
    previousPage = currentVisiblePage;
    fadeOut(currentVisiblePage);
    setTimeout(()=>{
        currentVisiblePage = elem(`div.spa-content-container div#update-res`);
        fadeIn(currentVisiblePage);
    }, 150);

    asyncFetch(`api.php?reservation=${id}`, "GET").then(response => {
        let res = JSON.parse(response).rows[0];

        elem("form#update-res input#id").value = res["id"];
        elem("form#update-res input#name").value = res["name"];
        elem("form#update-res input#email").value = res["email"];
        elem("form#update-res input#phone").value = res["phone"];
        elem("form#update-res input#guests-num").value = res["guests_num"];
        elem("form#update-res input#res-date").value = res["res_date"];
        
        let options = Array.from(elem("form#update-res select#timeslot").childNodes);

        for (let i = 0; i < options.length; i++) {
            if (i == id) {
                options[i].setAttribute("selected", "");
            }
        }
    });
}

elem("div#update-res button#back-button").onclick = function() {
    fadeOut(currentVisiblePage);
    setTimeout(()=>{
        currentVisiblePage = previousPage;
        fadeIn(currentVisiblePage);
        previousPage = undefined;
    }, 150);
    elem("form#create-res").reset();
}

let nav = elem("div#spa-menu");
let navToggle = elem("button#nav-toggle");
let navClose = elem("button#nav-close");

navToggle.onclick = function() {
    fadeInFlex(nav);
}

navClose.onclick = function() {
    fadeOut(nav);
}