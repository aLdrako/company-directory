<?php

    header("Content-Type: application/json; charset=UTF-8");
    
    // include database and object files
    include_once '../config/database.php';
    include_once '../objects/personnel.php';
    
    // instantiate database and personnel object
    $database = new Database();
    $db = $database->getConnection();
    
    // initialize object
    $personnel = new Personnel($db);
    
    // get keywords
    $keywords = isset($_GET["s"]) ? $_GET["s"] : "";
    
    $stmt = $personnel->search($keywords);
    $num = $stmt->rowCount();
    
    if($num>0) {
    
        $personnel_arr = [];
        $personnel_arr["records"] = [];
    
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            extract($row);
    
            $person = array(
                "id" => id,
                "firstName" => $firstName,
                "lastName" => $lastName,
                "jobTitle" => $jobTitle,
                "email" => $email,
                "department" => $department,
                "location" => $location
            );
    
            array_push($personnel_arr["records"], $person);
        }
    
        http_response_code(200);
        echo json_encode($personnel_arr);

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "No data found."));
    }
?>