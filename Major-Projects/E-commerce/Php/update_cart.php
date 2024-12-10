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

// Check if the POST variables are set
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['product_name']) && isset($_POST['quantity'])) {
        $product_name = $_POST['product_name'];
        $quantity = (int)$_POST['quantity'];

        // Prepare the SQL query to update the product quantity in the user's cart
        $stmt = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE product_name = ? AND user_id = ?");
        $stmt->bind_param("isi", $quantity, $product_name, $user_id);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Quantity updated successfully!'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Database error: Failed to update quantity.'
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Product name or quantity missing'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}

// Close the database connection
$conn->close();
?>
