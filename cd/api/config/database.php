<?php
    class Database {
    
        private $host = "localhost";
        private $db_name = "companydirectory";
        private $username = "admin";
        private $password = "osboxes.org";
        private $charset = "utf8";
        public $connection;
    
        // get database connection
        public function getConnection() {
    
            $this->connection = null;
    
            try{
                $this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset, $this->username, $this->password);
            }catch(PDOException $exception){
                echo "Connection error: " . $exception->getMessage();
            }
    
            return $this->connection;
        }
    }
?>