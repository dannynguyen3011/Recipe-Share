<?php
session_start();
require 'cors_headers.php';
require 'db_connect.php';

$response = array();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    $response = array(
        'success' => false,
        'error' => 'User not authenticated'
    );
    http_response_code(401);
    echo json_encode($response);
    exit;
}

$user_id = $_SESSION['user_id'];
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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($input['recipe_id']) || !isset($input['action'])) {
        $response = array(
            'success' => false,
            'error' => 'Missing required fields'
        );
        http_response_code(400);
    } else {
        $recipe_id = $conn->real_escape_string($input['recipe_id']);
        $action = $conn->real_escape_string($input['action']);
        
        if ($action == 'save') {
            $query = "INSERT INTO saved_recipes (user_id, recipe_id) VALUES ($user_id, '$recipe_id')";
            $table = 'saved_recipes';
        } else if ($action == 'vote') {
            $query = "INSERT INTO voted_recipes (user_id, recipe_id) VALUES ($user_id, '$recipe_id')";
            $table = 'voted_recipes';
        } else {
            $response = array(
                'success' => false,
                'error' => 'Invalid action'
            );
            http_response_code(400);
            echo json_encode($response);
            exit;
        }
        
        try {
            if ($conn->query($query)) {
                $response = array(
                    'success' => true,
                    'message' => "Recipe $action"."d successfully"
                );
            } else {
                throw new Exception($conn->error);
            }
        } catch (Exception $e) {
            // Check if error is due to duplicate entry
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                $response = array(
                    'success' => false,
                    'error' => "Recipe already $action"."d"
                );
                http_response_code(409);
            } else {
                $response = array(
                    'success' => false,
                    'error' => "Failed to $action recipe: " . $e->getMessage()
                );
                http_response_code(500);
            }
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (!isset($input['recipe_id']) || !isset($input['action'])) {
        $response = array(
            'success' => false,
            'error' => 'Missing required fields'
        );
        http_response_code(400);
    } else {
        $recipe_id = $conn->real_escape_string($input['recipe_id']);
        $action = $conn->real_escape_string($input['action']);
        
        if ($action == 'save') {
            $query = "DELETE FROM saved_recipes WHERE user_id = $user_id AND recipe_id = '$recipe_id'";
        } else if ($action == 'vote') {
            $query = "DELETE FROM voted_recipes WHERE user_id = $user_id AND recipe_id = '$recipe_id'";
        } else {
            $response = array(
                'success' => false,
                'error' => 'Invalid action'
            );
            http_response_code(400);
            echo json_encode($response);
            exit;
        }
        
        if ($conn->query($query)) {
            if ($conn->affected_rows > 0) {
                $response = array(
                    'success' => true,
                    'message' => "Recipe un$action"."d successfully"
                );
            } else {
                $response = array(
                    'success' => false,
                    'error' => "Recipe was not $action"."d"
                );
                http_response_code(404);
            }
        } else {
            $response = array(
                'success' => false,
                'error' => "Failed to un$action recipe: " . $conn->error
            );
            http_response_code(500);
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