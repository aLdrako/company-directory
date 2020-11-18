<?php

    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/database.php';
    include_once '../objects/personnel.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $personnel = new Personnel($db);
    
    $data = json_decode(file_get_contents("php://input"));

    // check if id exist before updating
    $stmt = $personnel->read();
    $num = $stmt->rowCount();
    $ids=[];
    if($num>0){
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($ids, $row['id']);
        }
    }

    // check if id exist before updating
    if (in_array($data->id, $ids)) {

        $personnel->id = $data->id;
        $personnel->firstName = $data->firstName;
        $personnel->lastName = $data->lastName;
        $personnel->jobTitle = $data->jobTitle;
        $personnel->email = $data->email;
        $personnel->departmentId = $data->departmentId;

        if($personnel->update()){
        
            http_response_code(200);
            echo json_encode(array("message" => "Person was updated."));
            
        } else {
        
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update person."));
        }

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "No person found."));

    }
?>