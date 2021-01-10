<?php
    class Database {
    
        private $host = "db5001238857.hosting-data.io";
        private $db_name = "dbs1059663";
        private $username = "dbu1046262";
        private $password = "___";
        private $charset = "utf8";
        private $port = 3306;
        public $connection;
    
        // get the database connection
        public function getConnection() {
    
            $this->connection = null;
    
            try {
                $this->connection = new PDO("mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name . ";charset=" . $this->charset, $this->username, $this->password);
            } catch(PDOException $exception) {
                echo "Connection error: " . $exception->getMessage();
            }
    
            return $this->connection;
        }

        // https://alexgo.co.uk/Projects/CompanyDirectory/api/location/read.php // online
        // http://localhost/company-directory/api/location/read.php // offline
    }
?>
