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

    $ids=[];
    
    if ($num > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($ids, $row['id']);
        }
    }

    if (in_array($data->id, $ids)) {

        $location->id = $data->id;
        $location->name = $data->name;

        if ($location->update()) {
        
            http_response_code(200);
            echo json_encode(array("message" => "Location was updated."));
            
        } else {
        
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update location."));
        }

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "No location found."));

    }
?>