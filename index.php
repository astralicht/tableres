<?php
session_start();
if (!isset($_SESSION["id"])) {
    header("Location: login.php");
    return;
}
header("Location: dashboard.php");