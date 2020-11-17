<?php

    header("Content-Type: application/json; charset=UTF-8");

    include_once '../config/database.php';
    include_once '../objects/personnel.php';
    
    // instantiate database and personnel object
    $database = new Database();
    $db = $database->getConnection();
    
    $personnel = new Personnel($db);
    
    // query personnel
    $stmt = $personnel->read();

    $num = $stmt->rowCount();
    
    // check if more than 0 record found
    if($num>0) {
    
        // personnel array
        $personnel_arr = [];
        $personnel_arr["records"] = [];
    
        // retrieve our table contents
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            // extract row this will make $row['id'] to just $id only
            extract($row);
    
            $person = array(
                "id" => $id,
                "firstName" => $firstName,
                "lastName" => $lastName,
                "jobTitle" => $jobTitle,
                "email" => $email,
                "departmentId" => $departmentId,
                "department" => $department,
                "location" => $location
            );
    
            array_push($personnel_arr["records"], $person);
            
        }
    
        http_response_code(200);
        echo json_encode($personnel_arr);

    } else {
    
        http_response_code(404);  
        echo json_encode(array("message" => "No personnel found."));

    }

?>