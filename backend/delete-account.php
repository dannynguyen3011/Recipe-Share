<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db_connect.php';
require_once 'auth_check.php';

try {
    // Get user ID from session
    if (!isset($_SESSION['user_id'])) {
        throw new Exception('User not authenticated');
    }
    
    $userId = $_SESSION['user_id'];
    
    // Start transaction
    $conn->begin_transaction();
    
    try {
        // Delete user's saved recipes
        $stmt = $conn->prepare("DELETE FROM saved_recipes WHERE user_id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        
        // Delete user's recipe votes
        $stmt = $conn->prepare("DELETE FROM recipe_votes WHERE user_id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        
        // Delete user's recipes
        $stmt = $conn->prepare("DELETE FROM recipes WHERE user_id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        
        // Finally, delete the user account
        $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        
        // Commit transaction
        $conn->commit();
        
        // Clear session
        session_destroy();
        
        echo json_encode(['success' => true, 'message' => 'Account deleted successfully']);
        
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        throw $e;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

$conn->close();
?> 