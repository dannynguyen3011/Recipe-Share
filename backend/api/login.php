<?php
session_start();
require 'cors_headers.php';
require 'db_connect.php';

$response = array();

// Handle login POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get JSON input
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

  if (!isset($input['email']) || !isset($input['password'])) {
    $response = array(
      'success' => false,
      'error' => 'Missing email or password'
    );
    http_response_code(400);
    echo json_encode($response);
    exit;
  }

  $email = $conn->real_escape_string($input['email']);
  $password = hash('sha256', $input['password']);

  $query = "SELECT u.*, 
            GROUP_CONCAT(DISTINCT sr.recipe_id) as saved_recipes,
            GROUP_CONCAT(DISTINCT vr.recipe_id) as voted_recipes
            FROM users u 
            LEFT JOIN saved_recipes sr ON u.id = sr.user_id
            LEFT JOIN voted_recipes vr ON u.id = vr.user_id
            WHERE u.email = '$email'
            GROUP BY u.id";
            
  $result = $conn->query($query);

  if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if ($user['password'] === $password) {
      // Convert saved and voted recipes to arrays
      $savedRecipes = $user['saved_recipes'] ? explode(',', $user['saved_recipes']) : [];
      $votedRecipes = $user['voted_recipes'] ? explode(',', $user['voted_recipes']) : [];

      // Create response data
      $response = array(
        'success' => true,
        'user' => array(
          'id' => $user['id'],
          'name' => $user['name'],
          'email' => $user['email'],
          'role' => $user['role'],
          'createdAt' => $user['created_at'],
          'savedRecipes' => $savedRecipes,
          'votedRecipes' => $votedRecipes
        )
      );

      // Set session variables
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['user_email'] = $user['email'];
      $_SESSION['user_role'] = $user['role'];
    } else {
      $response = array(
        'success' => false,
        'error' => 'Invalid password'
      );
      http_response_code(401);
    }
  } else {
    $response = array(
      'success' => false,
      'error' => 'User not found'
    );
    http_response_code(404);
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
