<?php

    header("Content-Type: application/json; charset=UTF-8");
        
    include_once '../config/database.php';
    include_once '../objects/location.php';

    $database = new Database();
    $db = $database->getConnection();

    $location = new Location($db);

    $data = json_decode(file_get_contents("php://input"));

    $stmt = $location->read();
    $num = $stmt->rowCount();

    $ids = [];

    if ($num > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($ids, $row['id']);
        }
    }

    if (in_array($data->id, $ids)) {

        $location->id = $data->id;
        
        if ($location->delete()) {
        
            http_response_code(200);
            echo json_encode(array("message" => "Location was removed."));

        } else {
        
            http_response_code(503);
            echo json_encode(array("message" => "Unable to remove location."));
        }

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "No location found."));
    }

?>