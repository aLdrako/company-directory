<?php

    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/database.php';
    include_once '../objects/department.php';

    $database = new Database();
    $db = $database->getConnection();

    $department = new Department($db);

    $department->id = isset($_GET['id']) ? $_GET['id'] : die();

    $department->readOne();

    if ($department->name != null) {

        $department_arr = [
            "id" => $department->id,
            "name" => $department->name,
            "locationId" => $department->locationId,
            "location" => $department->location
        ];

        http_response_code(200);
        echo json_encode($department_arr);

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "Department does not exist"));

    }