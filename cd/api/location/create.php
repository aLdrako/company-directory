<?php

    header("Content-Type: application/json; charset=UTF-8");

    include_once('../config/database.php');
    include_once('../objects/location.php');

    $database = new Database();
    $db = $database->getConnection();

    $location = new Location($db);

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->name)) {

        $location->name = $data->name;

        if ($location->create()) {

            http_response_code(201);
            echo json_encode(array("message" => "Location was added."));

        } else {
            
            http_response_code(503);    
            echo json_encode(array("message" => "Unable to add location."));
        }

    } else {

        http_response_code(400);
        echo json_encode(array("message" => "Unable to add location. Data is incomplete."));

    }
?>