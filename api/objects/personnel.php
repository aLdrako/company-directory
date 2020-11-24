<?php
    class Personnel {
    
        // database connection and table name
        private $connection;
        private $tableName = "personnel";
    
        // personnel properties
        public $id;
        public $firstName;
        public $lastName;
        public $jobTitle;
        public $email;
        public $department;
        public $departmentId;
        public $location;
        public $locationId;
    
        // constructor with $db as database connection
        public function __construct($db) {
            $this->connection = $db;
        }

        // read personnel
        function read() {
        
            // select all query
            $query = "SELECT p.id, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentId, d.name AS department, l.name AS location 
                FROM " . $this->tableName . " p 
                LEFT JOIN 
                    department d ON p.departmentId = d.id 
                LEFT JOIN 
                    location l ON d.locationId=l.id;";
        
            // prepare query statement
            $stmt = $this->connection->prepare($query);

            // execute query
            $stmt->execute();
        
            return $stmt;
        }

        // add person
        function create() {
        
            // query to insert record
            $query = "INSERT INTO " . $this->tableName . " 
                    SET 
                        firstName=:firstName, 
                        lastName=:lastName, 
                        jobTitle=:jobTitle,
                        email=:email, 
                        departmentId=:departmentId;";
        
            // prepare query
            $stmt = $this->connection->prepare($query);
        
            // sanitize
            $this->firstName = htmlspecialchars(strip_tags($this->firstName));
            $this->lastName = htmlspecialchars(strip_tags($this->lastName));
            $this->jobTitle = htmlspecialchars(strip_tags($this->jobTitle));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->departmentId = htmlspecialchars(strip_tags($this->departmentId));
        
            // bind values
            $stmt->bindParam(":firstName", $this->firstName);
            $stmt->bindParam(":lastName", $this->lastName);
            $stmt->bindParam(":jobTitle", $this->jobTitle);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":departmentId", $this->departmentId);
        
            // execute query
            if($stmt->execute()){
                return true;
            }

            return false;
        }

        // used when filling up the update person form
        function readOne() {
        
            // query to read single record
            $query = "SELECT p.id, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentId, d.name AS department, l.name AS location 
                FROM " . $this->tableName . " p 
                LEFT JOIN 
                    department d ON p.departmentId = d.id 
                LEFT JOIN 
                    location l ON d.locationId=l.id
                WHERE 
                    p.id = ? LIMIT 0,1;";
        
            // prepare query statement
            $stmt = $this->connection->prepare($query);
        
            // bind id of person to be read
            $stmt->bindParam(1, $this->id);
        
            $stmt->execute();
        
            // get retrieved row
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // make $row['firstName'] to just $firstName only
            extract($row);
        
            // set values to object properties
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->jobTitle = $jobTitle;
            $this->email = $email;
            $this->department = $department;
            $this->departmentId = $departmentId;
            $this->location = $location;
        }

        // update the person
        function update() {
        
            // update query
            $query = "UPDATE " . $this->tableName . " 
                SET
                    firstName=:firstName, 
                    lastName=:lastName, 
                    jobTitle=:jobTitle,
                    email=:email, 
                    departmentId=:departmentId
                WHERE
                    id=:id";
        
            // prepare query statement
            $stmt = $this->connection->prepare($query);
        
            // sanitize
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->firstName = htmlspecialchars(strip_tags($this->firstName));
            $this->lastName = htmlspecialchars(strip_tags($this->lastName));
            $this->jobTitle = htmlspecialchars(strip_tags($this->jobTitle));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->departmentId = htmlspecialchars(strip_tags($this->departmentId));
        
            // bind new values
            $stmt->bindParam(":id", $this->id);
            $stmt->bindParam(":firstName", $this->firstName);
            $stmt->bindParam(":lastName", $this->lastName);
            $stmt->bindParam(":jobTitle", $this->jobTitle);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":departmentId", $this->departmentId);
        
            // execute the query
            if($stmt->execute()){
                return true;
            }
        
            return false;
        }

        // remove person
        function delete() {
        
            // delete query
            $query = "DELETE FROM " . $this->tableName . " WHERE id = ?";
        
            // prepare query
            $stmt = $this->connection->prepare($query);
        
            // sanitize
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind id of record to delete
            $stmt->bindParam(1, $this->id);
        
            // execute query
            if($stmt->execute()){
                return true;
            }
        
            return false;
        }

        // search persons
        function search($keywords) {
        
            // select all query
            $query = "SELECT p.id, p.firstName, p.lastName, p.jobTitle, p.email, p.departmentId, d.name AS department, l.name AS location 
                FROM " . $this->tableName . " p 
                LEFT JOIN 
                    department d ON p.departmentId = d.id 
                LEFT JOIN 
                    location l ON d.locationId=l.id
                WHERE 
                    p.firstName LIKE ? OR p.lastName LIKE ? OR d.name LIKE ? OR l.name LIKE ?;";
        
            // prepare query statement
            $stmt = $this->connection->prepare($query);
        
            // sanitize
            $keywords=htmlspecialchars(strip_tags($keywords));
            $keywords = "%{$keywords}%";
        
            // bind
            $stmt->bindParam(1, $keywords);
            $stmt->bindParam(2, $keywords);
            $stmt->bindParam(3, $keywords);
            $stmt->bindParam(4, $keywords);
        
            // execute query
            $stmt->execute();
        
            return $stmt;
        }
    }
?>