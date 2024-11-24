let currentVisiblePage = elem(`div.spa-content-container div#tables`);
currentVisiblePage.style.display = "block";
currentVisiblePage.style.opacity = "1";

let currentActiveNavButton = elem("div#spa-menu button.spa-nav-button#tables");

Array.from(elems("div#spa-menu button.spa-nav-button")).forEach(button => {
    button.onclick = ()=>{
        currentActiveNavButton.removeAttribute("active");
        button.setAttribute("active", "");
        currentActiveNavButton = button;

        if (button.id == "refresh") {
            window.location.reload();
            return;
        }

        fadeOut(currentVisiblePage);
        setTimeout(()=>{
            currentVisiblePage = elem(`div.spa-content-container div#${button.id}`);
            fadeIn(currentVisiblePage);
        }, 150);
    }
})