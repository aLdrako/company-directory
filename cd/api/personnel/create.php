<?php

    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/database.php';
    include_once '../objects/personnel.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $personnel = new Personnel($db);
    
    // get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // make sure data is not empty
    if (
        !empty($data->firstName) &&
        !empty($data->lastName) &&
        !empty($data->jobTitle) &&
        !empty($data->email) &&
        !empty($data->departmentId)
    ) {
    
        // set person property values
        $personnel->firstName = $data->firstName;
        $personnel->lastName = $data->lastName;
        $personnel->jobTitle = $data->jobTitle;
        $personnel->email = $data->email;
        $personnel->departmentId = $data->departmentId;
    
        // add person
        if($personnel->create()){
    
            http_response_code(201);
            echo json_encode(array("message" => "Person was added."));

        } else {
    
            http_response_code(503);    
            echo json_encode(array("message" => "Unable to add person."));

        }

    } else {
    
        http_response_code(400);
        echo json_encode(array("message" => "Unable to add person. Data is incomplete."));

    }
?>