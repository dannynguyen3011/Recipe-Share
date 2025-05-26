<?php
header('Content-Type: application/json');

// Mercury Server Database Configuration
$db_host = 'feenix-mariadb.swin.edu.au';
$db_name = 's104181789_db'; // Replace with your student database name
$db_user = 's104181789';      // Replace with your student username
$db_pass = '301104';      // Replace with your student password

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");
?>

