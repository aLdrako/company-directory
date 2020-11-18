<?php

    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/database.php';
    include_once '../objects/location.php';

    $database = new Database();
    $db = $database->getConnection();

    $location = new Location($db);

    $location->id = isset($_GET['id']) ? $_GET['id'] : die();

    $location->readOne();

    if ($location->name != null) {

        $location_arr = [
            "id" => $location->id,
            "name" => $location->name
        ];

        http_response_code(200);
        echo json_encode($location_arr);

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "Location does not exist"));

    }