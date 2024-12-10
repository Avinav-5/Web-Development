<?php
session_start();
require_once 'DB_connection.php';  // Ensure this file correctly sets up $conn

// Ensure user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'User not logged in'
    ]);
    exit();
}

$user_id = $_SESSION['user_id'];  // Get user ID from session

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Ensure product_name is set
    if (isset($_POST['product_name'])) {
        $product_name = $_POST['product_name'];

        // Prepare the SQL query to delete the product from the user's cart
        $stmt = $conn->prepare("DELETE FROM cart_items WHERE product_name = ? AND user_id = ?");
        
        // Check if statement preparation was successful
        if ($stmt === false) {
            echo json_encode([
                'success' => false,
                'message' => 'Database error: Failed to prepare statement.'
            ]);
            exit();
        }

        $stmt->bind_param("si", $product_name, $user_id);

        // Execute the statement and check for errors
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Item removed from cart successfully!'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Item not found in the cart.'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Database error: Failed to remove item from cart.'
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Product name is required.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}

// Close the database connection
$conn->close();
?>
