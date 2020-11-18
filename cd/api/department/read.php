<?php

    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/database.php';
    include_once '../objects/department.php';
    
    // instantiate database and category object
    $database = new Database();
    $db = $database->getConnection();
    
    // initialize object
    $department = new Department($db);
    
    // query department
    $stmt = $department->read();
    $num = $stmt->rowCount();
    
    // check if more than 0 record found
    if($num>0) {
    
        // departments array
        $departments_arr = [];
        $departments_arr["records"] = [];
    
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            extract($row);
    
            $department_item=array(
                "id" => $id,
                "name" => $name,
                "locationId" => $locationId
            );
    
            array_push($departments_arr["records"], $department_item);
        }
    
        // set response code - 200 OK
        http_response_code(200);
    
        // show departments data in json format
        echo json_encode($departments_arr);
    }
    
    else{
    
        // set response code - 404 Not found
        http_response_code(404);
    
        // tell the user no departments found
        echo json_encode(array("message" => "No departments found."));
    }
?>