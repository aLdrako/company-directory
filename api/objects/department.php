<?php
    class Department {
    
        // database connection and table name
        private $connection;
        private $tableName = "department";
    
        // object properties
        public $id;
        public $name;
        public $locationId;
        public $location;
    
        public function __construct($db) {
            $this->connection = $db;
        }

        public function read() {
        
            $query = "SELECT d.id, d.name, d.locationId, l.name AS location
                    FROM " . $this->tableName . " d 
                    LEFT JOIN 
                        location l ON d.locationId = l.id;";
        
            $stmt = $this->connection->prepare($query);

            $stmt->execute();
        
            return $stmt;
        }

        public function create() {

            $query = "INSERT INTO " . $this->tableName . "
                SET
                    name=:name,
                    locationId=:locationId;";

            $stmt = $this->connection->prepare($query);

            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->locationId = htmlspecialchars(strip_tags($this->locationId));
            
            $stmt->bindParam(':name', $this->name);
            $stmt->bindParam(':locationId', $this->locationId);

            if ($stmt->execute()) {
                return true;
            }
            
            return false;
        }

        public function readOne() {

            $query = "SELECT d.id, d.name, d.locationId, l.name AS location
                FROM " . $this->tableName . " d 
                LEFT JOIN 
                    location l ON d.locationId = l.id
                WHERE 
                    d.id = ? LIMIT 0,1;";

            $stmt = $this->connection->prepare($query);

            $stmt->bindParam(1, $this->id);

            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            extract($row);

            $this->name = $name;
            $this->locationId = $locationId;
            $this->location = $location;
        }

        public function update() {

            $query = "UPDATE " . $this->tableName . " 
                SET
                    name=:name,
                    locationId=:locationId
                WHERE
                    id=:id;";
            
            $stmt = $this->connection->prepare($query);

            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->locationId = htmlspecialchars(strip_tags($this->locationId));
            
            $stmt->bindParam(':id', $this->id);
            $stmt->bindParam(':name', $this->name);
            $stmt->bindParam(':locationId', $this->locationId);

            if ($stmt->execute()) {
                return true;
            }
            
            return false;
        }

        public function delete() {

            $query  = "DELETE FROM " . $this->tableName . " WHERE id = ?";

            $stmt = $this->connection->prepare($query);

            $this->id=htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(1, $this->id);

            if ($stmt->execute()) {
                return true;
            }
            
            return false;
        }
    }
?>