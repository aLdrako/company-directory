<?php

    header("Content-Type: application/json; charset=UTF-8");
    
    // include database and object files
    include_once '../config/database.php';
    include_once '../objects/personnel.php';
    
    // get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // prepare personnel object
    $personnel = new Personnel($db);
    
    // set ID property of record to read
    $personnel->id = isset($_GET['id']) ? $_GET['id'] : die();
    
    // read the details of personnel to be edited
    $personnel->readOne();
    
    if ($personnel->firstName!=null) {

        $personnel_arr = array(
            "id" =>  $personnel->id,
            "firstName" => $personnel->firstName,
            "lastName" => $personnel->lastName,
            "jobTitle" => $personnel->jobTitle,
            "email" => $personnel->email,
            "department" => $personnel->department,
            "departmentId" => $personnel->departmentId,
            "location" => $personnel->location
        );
    
        http_response_code(200);
        echo json_encode($personnel_arr);

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "Person does not exist."));
    }
?>