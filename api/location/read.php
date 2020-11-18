<?php
    // required header
    header("Content-Type: application/json; charset=UTF-8");
    
    // include database and object files
    include_once '../config/database.php';
    include_once '../objects/location.php';
    
    // instantiate database and category object
    $database = new Database();
    $db = $database->getConnection();
    
    // initialize object
    $location = new Location($db);
    
    // query location
    $stmt = $location->read();
    $num = $stmt->rowCount();
    
    // check if more than 0 record found
    if ($num > 0) {
    
        // locations array
        $location_arr = [];
        $location_arr["records"] = [];
    
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            extract($row);
    
            $location_item = array(
                "id" => $id,
                "name" => $name
            );
    
            array_push($location_arr["records"], $location_item);
        }
    
        http_response_code(200);
        echo json_encode($location_arr);
    }
    
    else{
    
        http_response_code(404);
        echo json_encode(array("message" => "No locations found."));

    }
?>