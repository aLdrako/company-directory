<?php

    header("Content-Type: application/json; charset=UTF-8");

    include_once('../config/database.php');
    include_once('../objects/department.php');

    $database = new Database();
    $db = $database->getConnection();

    $department = new Department($db);

    $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->name) &&
        !empty($data->locationId)
    ) {

        $department->name = $data->name;
        $department->locationId = $data->locationId;

        if ($department->create()) {

            http_response_code(201);
            echo json_encode(array("message" => "Department was added."));

        } else {
            
            http_response_code(503);    
            echo json_encode(array("message" => "Unable to add department."));
        }

    } else {

        http_response_code(400);
        echo json_encode(array("message" => "Unable to add department. Data is incomplete."));

    }
?>