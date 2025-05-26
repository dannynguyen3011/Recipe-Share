<?php
// Reference:
// https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/

// Use this API for demonstration purposes only

session_start();
require 'cors_headers.php';
require 'db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $response = array(
            'success' => false,
            'error' => 'Invalid JSON input'
        );
        http_response_code(400);
        echo json_encode($response);
        exit;
    }
    
    // Validate input
    if (!isset($input['name']) || !isset($input['email']) || !isset($input['password'])) {
        $response = array(
            'success' => false,
            'error' => 'Missing required fields'
        );
        http_response_code(400);
    } else {
        // Sanitize input
        $name = $conn->real_escape_string($input['name']);
        $email = $conn->real_escape_string($input['email']);
        $password = hash('sha256', $input['password']);
        
        // Check if email already exists
        $check_query = "SELECT id FROM users WHERE email = '$email'";
        $check_result = $conn->query($check_query);
        
        if ($check_result->num_rows > 0) {
            $response = array(
                'success' => false,
                'error' => 'Email already registered'
            );
            http_response_code(409);
        } else {
            // Insert new user
            $insert_query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
            
            if ($conn->query($insert_query)) {
                $user_id = $conn->insert_id;
                
                $response = array(
                    'success' => true,
                    'user' => array(
                        'id' => $user_id,
                        'name' => $name,
                        'email' => $email,
                        'role' => 'user',
                        'createdAt' => date('Y-m-d H:i:s'),
                        'savedRecipes' => [],
                        'votedRecipes' => []
                    )
                );

                // Set session variables
                $_SESSION['user_id'] = $user_id;
                $_SESSION['user_email'] = $email;
                $_SESSION['user_role'] = 'user';
            } else {
                $response = array(
                    'success' => false,
                    'error' => 'Registration failed: ' . $conn->error
                );
                http_response_code(500);
            }
        }
    }
} else {
    $response = array(
        'success' => false,
        'error' => 'Invalid request method'
    );
    http_response_code(405);
}

echo json_encode($response);
$conn->close();
?>