<?php
require("../conf/dbSettings.php");

// Create connection
$conn = new mysqli($hostname, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS " . $dbname;
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully".PHP_EOL;
} else {
    echo "Error creating database: " . $conn->error.PHP_EOL;
}

$conn->select_db($dbname);

// Create table
$sql = "CREATE TABLE IF NOT EXISTS scores (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	email VARCHAR(50),
	score INT(6),
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "table created successfully".PHP_EOL;
} else {
    echo "Error creating table: " . $conn->error.PHP_EOL;
}
$conn->close();
