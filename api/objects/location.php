<?php
    class Location {
    
        // database connection and table name
        private $connection;
        private $tableName = "location";
    
        // object properties
        public $id;
        public $name;
    
        public function __construct($db) {
            $this->connection = $db;
        }

        public function read() {
        
            $query = "SELECT id, name FROM " . $this->tableName;
        
            $stmt = $this->connection->prepare( $query );
            $stmt->execute();
        
            return $stmt;
        }

        public function create() {

            $query = "INSERT INTO " . $this->tableName . "
                SET
                    name=:name;";

            $stmt = $this->connection->prepare($query);

            $this->name = htmlspecialchars(strip_tags($this->name));
            
            $stmt->bindParam(':name', $this->name);

            if ($stmt->execute()) {
                return true;
            }
            
            return false;
        }

        public function readOne() {

            $query = "SELECT id, name FROM " . $this->tableName . " 
                WHERE 
                    id = ? LIMIT 0,1;";

            $stmt = $this->connection->prepare($query);

            $stmt->bindParam(1, $this->id);

            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->name = $row['name'];
        }

        public function update() {

            $query = "UPDATE " . $this->tableName . " 
                SET
                    name=:name
                WHERE
                    id=:id;";
            
            $stmt = $this->connection->prepare($query);

            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->name = htmlspecialchars(strip_tags($this->name));
            
            $stmt->bindParam(':id', $this->id);
            $stmt->bindParam(':name', $this->name);

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