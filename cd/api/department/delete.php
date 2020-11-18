<?php

    header("Content-Type: application/json; charset=UTF-8");
        
    include_once '../config/database.php';
    include_once '../objects/department.php';

    $database = new Database();
    $db = $database->getConnection();

    $department = new Department($db);

    $data = json_decode(file_get_contents("php://input"));

    $stmt = $department->read();
    $num = $stmt->rowCount();

    $ids = [];

    if ($num > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($ids, $row['id']);
        }
    }

    if (in_array($data->id, $ids)) {

        $department->id = $data->id;
        
        if ($department->delete()) {
        
            http_response_code(200);
            echo json_encode(array("message" => "Department was removed."));

        } else {
        
            http_response_code(503);
            echo json_encode(array("message" => "Unable to remove department."));
        }

    } else {

        http_response_code(404);
        echo json_encode(array("message" => "No department found."));
    }

?>