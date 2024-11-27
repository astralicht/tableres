<?php
include_once("model.php");

function sessionCheck() {
    session_start();
    if (!isset($_SESSION["id"])) {
        echo json_encode(["status" => "503", "message" => "You are unauthorized to access this."]);
        return;
    }
}

// Reservations
// GET all reservations
if (isset($_GET["reservations"]) && empty($_GET["reservations"])) {
    sessionCheck();
    $resCode = "";
    $resDate = "CURDATE()";

    if ($_GET["date"] != "" && $_GET["res_code"] == "") {
        $resDate = $_GET["date"];

        $query = "SELECT r.`id`, r.`code`, r.`name`, r.`guests_num`, r.`res_date`, t.`timeslot`
                FROM reservations AS r
                INNER JOIN timeslots AS t
                ON r.`timeslot_id`=t.`id`
                WHERE r.res_date=:resDate";
        $rows = toDb($query, [":resDate" => $resDate]);
    } else if ($_GET["date"] == "" && $_GET["res_code"] != "") {
        $resCode = "%".$_GET["res_code"]."%";

        $query = "SELECT r.`id`, r.`code`, r.`name`, r.`guests_num`, r.`res_date`, t.`timeslot`
                FROM reservations AS r
                INNER JOIN timeslots AS t
                ON r.`timeslot_id`=t.`id`
                WHERE r.code LIKE :resCode";
        $rows = toDb($query, [":resCode" => $resCode]);
    } else if ($_GET["date"] != "" && $_GET["res_code"] != "") {
        $resDate = $_GET["date"];
        $resCode = "%".$_GET["res_code"]."%";

        $query = "SELECT r.`id`, r.`code`, r.`name`, r.`guests_num`, r.`res_date`, t.`timeslot`
                FROM reservations AS r
                INNER JOIN timeslots AS t
                ON r.`timeslot_id`=t.`id`
                WHERE r.res_date=:resDate
                AND r.code LIKE :resCode";
        $rows = toDb($query, [":resDate" => $resDate, ":resCode" => $resCode]);
    } else {
        $query = "SELECT r.`id`, r.`code`, r.`name`, r.`guests_num`, r.`res_date`, t.`timeslot`
                FROM reservations AS r
                INNER JOIN timeslots AS t
                ON r.`timeslot_id`=t.`id`";
        $rows = toDb($query);
    }

    if (isset($rows["status"]) && $rows["status"] == "500") {
        echo json_encode($rows);
        return;
    }

    echo json_encode(["status" => "200", "rows" => $rows]);
    return;
}

// POST new reservation
if (isset($_POST["reservations"]) && $_POST["reservations"] == "new") {
    sessionCheck();
    unset($_POST["reservations"]);

    $_POST["code"] = base_convert(implode("", explode("-", $_POST["res_date"])).$_POST["timeslot_id"], 10, 32);

    foreach ($_POST as $key => $value) {
        if (empty($_POST[$key])) {
            $_POST[$key] = NULL;
        }
    }

    $query = "INSERT INTO reservations(`code`, `name`, `email`, `phone`, `guests_num`, `res_date`, `timeslot_id`) VALUES (:code, :name, :email, :phone, :guests_num, :res_date, :timeslot_id)";
    $rows = toDb($query, $_POST);

    if (isset($rows["status"]) && $rows["status"] == "500") {
        echo json_encode($rows);
        return;
    }

    echo json_encode(["status" => "200", "rows" => $rows]);
    return;
}

// POST update reservation
if (isset($_POST["reservations"]) && $_POST["reservations"] == "update") {
    sessionCheck();
    unset($_POST["reservations"]);

    foreach ($_POST as $key => $value) {
        if (empty($_POST[$key])) {
            $_POST[$key] = NULL;
        }
    }

    $params = [
        ":name" => $_POST["name"],
        ":email" => $_POST["email"],
        ":phone" => $_POST["phone"],
        ":guests_num" => $_POST["guests_num"],
        ":res_date" => $_POST["res_date"],
        ":timeslot_id" => $_POST["timeslot_id"],
        ":id" => $_POST["id"],
    ];

    $query = "UPDATE reservations SET `name`=:name, `email`=:email, `phone`=:phone, `guests_num`=:guests_num, `res_date`=:res_date, `timeslot_id`=:timeslot_id WHERE `id`=:id";
    $rows = toDb($query, $_POST);

    if (isset($rows["status"]) && $rows["status"] == "500") {
        echo json_encode($rows);
        return;
    }

    echo json_encode(["status" => "200", "rows" => $rows]);
    return;
}

// POST delete Reservation
if (isset($_GET["reservations"]) && $_GET["reservations"] == "delete") {
    sessionCheck();

    $query = "DELETE FROM reservations WHERE `id`=:id";
    $rows = toDb($query, [":id" => $_GET["id"]]);

    if (isset($rows["status"]) && $rows["status"] == "500") {
        echo json_encode($rows);
        return;
    }

    echo json_encode(["status" => "200", "message" => "Reservation deleted successfully!"]);
    return;
}

// GET specific reservation
if (isset($_GET["reservation"]) && !empty($_GET["reservation"])) {
    sessionCheck();

    $query = "SELECT r.`id`, r.`name`, r.`guests_num`, r.`res_date`, t.`timeslot`, r.`email`, r.`phone`
                FROM reservations AS r
                INNER JOIN timeslots AS t
                ON r.`timeslot_id`=t.`id`
                WHERE r.`id`=:id";
    $rows = toDb($query, [":id" => $_GET["reservation"]]);

    if (isset($rows["status"]) && $rows["status"] == "500") {
        echo json_encode($rows);
        return;
    }

    echo json_encode(["status" => "200", "rows" => $rows]);
    return;
}

// Timeslots
// GET all timeslots
if (isset($_GET["timeslots"])) {
    sessionCheck();
    $query = "SELECT * FROM timeslots";
    $rows = toDb($query);

    if (isset($rows["status"]) && $rows["status"] == "500") {
        echo json_encode($rows);
        return;
    }

    echo json_encode(["status" => "200", "rows" => $rows]);
    return;
}

// Auth
if (isset($_GET["auth"]) && $_GET["auth"] == "check") {
    sessionCheck();
    $query = "SELECT * FROM users WHERE `username`=:username";

    try {
        $query = $dbConn->prepare($query);
        $query->execute([":username" => $_GET["username"]]);
        $rows = $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo json_encode(["status" => "503", "message" => $e->getMessage()]);
        return;
    }

    if (count($rows) < 1 || !password_verify($_GET["password"], $rows[0]["password"])) {
        echo json_encode(["status" => "503", "message" => "Invalid credentials."]);
        return;
    }
    
    echo json_encode(["status" => "200", "message" => "Credentials verified."]);
    return;
}

// Accounts
// POST new user account (default to customer)
if (isset($_POST["account"]) && $_POST["account"] == "new") {
    unset($_POST["account"]);

    $query = "SELECT `id` FROM users WHERE `email`=:email OR `username`=:username";

    $rows = toDb($query, [":email" => $_POST["email"], ":username" => $_POST["username"]]);

    if (isset($rows["status"]) && $rows["status"] == "500") {
        echo json_encode($rows);
        return;
    }

    if (count($rows) != 0) {
        echo json_encode(["status" => "200", "message" => "User already exists!"]);
        return;
    }

    $_POST["password"] = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $query = "INSERT INTO users(`username`, `email`, `password`, `name`) VALUES (:username, :email, :password, :name)";
    $rows = toDb($query, [
        ":username" => $_POST["username"],
        ":email" => $_POST["email"],
        ":password" => $_POST["password"],
        ":name" => $_POST["name"],
    ]);

    echo json_encode(["status" => "200", "message" => "User registered successfully!"]);
    return;
}