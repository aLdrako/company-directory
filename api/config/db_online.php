<?php
    class Database {
    
        private $host = "db5011419674.hosting-data.io";
        private $db_name = "dbs9633702";
        private $username = "dbu2711551";
        private $password = "***";
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

        // https://alexgo.online/Projects/CompanyDirectory/api/location/read.php // online
        // http://localhost/company-directory/api/location/read.php // offline
    }
?>
