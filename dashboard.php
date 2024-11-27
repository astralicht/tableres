<?php
session_start();
if (!isset($_SESSION["id"])) {
    header("Location: login.php?e=auth-required");
    return;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="egg.css">
    <title>Restaurant Table Reservation</title>
    <script src="scripts/DOM.js" defer></script>
    <script src="scripts/fade.js" defer></script>
    <script src="scripts/fetch.js" defer></script>
    <script src="scripts/dashboard.js" defer></script>
    <script src="scripts/reservations.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js" integrity="sha512-naukR7I+Nk6gp7p5TMA4ycgfxaZBJ7MO5iC3Fp6ySQyKFHOGfpkSZkYVWV5R7u7cfAicxanwYQ5D1e17EfJcMA==" crossorigin="anonymous" referrerpolicy="no-referrer" defer></script>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body full-width flex="h" no-gap>
    <div id="spa-menu" flex="v" full-height pad>
        <p white-fr style="text-align: center;" id="menu-title">Restaurant Table Reservation</p>
        <button class="spa-nav-button" id="reservations" active><i class="fa-solid fa-phone"></i>Reservations</button>
        <div flex="v" grow v-end>
            <p white-fr no-margin pad style="text-align: center;">Hi, <?= $_SESSION["username"] ?>!</p>
            <button white-fr full-width class="spa-nav-button" id="refresh"><div><i class="fa-solid fa-refresh"></i></div>Refresh App</button>
            <button white-fr full-width class="spa-nav-button" id="settings"><i class="fa-solid fa-gear"></i>Settings</button>
        </div>
    </div>
    <div id="partials-container" flex="h" grow>
        <div class="spa-content-container">
            <?php include_once("partials/_reservations.html"); ?>
            <?php include_once("partials/_create_res.html"); ?>
            <?php include_once("partials/_update_res.html"); ?>
            <?php include_once("partials/_settings.html"); ?>
        </div>
    </div>
</body>
</html>