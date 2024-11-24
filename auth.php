<?php
include_once("model.php");

$username = htmlspecialchars($_POST["username"]);
$password = htmlspecialchars($_POST["password"]);

$rows = toDb("SELECT * FROM users WHERE `username`=:username", [":username"=>$username]);

if (count($rows) < 1 || !password_verify($password, $rows[0]["password"])) {
    echo json_encode(["status" => "401", "message" => "Invalid auth"]);
    return;
}

$user = $rows[0];

session_start();
$_SESSION["id"] = $user["id"];
$_SESSION["username"] = $user["username"];

echo json_encode(["status" => "200", "message" => "Valid auth"]);
return;