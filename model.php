<?php
function toDb($query, $params = []) {
    $dbConn = "";
    include_once("db.php");
    $dbConn = getDbConn();
    
    try {
        $query = $dbConn->prepare($query);
        $query->execute($params);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return json_encode(["status" => "500", "message" => "Internal server error. Contact the web admin to fix this issue.", "exception_message" => $e->getMessage()]);
    }
}