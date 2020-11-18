<?php

    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/database.php';
    include_once '../objects/personnel.php';
    
    // get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    $personnel = new Personnel($db);
    
    // get persons id
    $data = json_decode(file_get_contents("php://input"));
    
    // check if id exists before deleting it
    $stmt = $personnel->read();
    $num = $stmt->rowCount();
    $ids=[];
    if($num>0){
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($ids, $row['id']);
        }
    }

    // check if id exist before deleting
    if(in_array($data->id, $ids)) {
        // set person id to be removed
        $personnel->id = $data->id;
        
        if($personnel->delete()){
        
            http_response_code(200);
            echo json_encode(array("message" => "Person was removed."));

        } else {
        
            http_response_code(503);
            echo json_encode(array("message" => "Unable to remove person."));
        }
        
    } else {

        http_response_code(404);
        echo json_encode(array("message" => "No person found."));
    }
?>