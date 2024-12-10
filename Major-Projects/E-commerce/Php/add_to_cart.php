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
    if (isset($_POST['product_name']) && isset($_POST['price']) && isset($_POST['image'])) {
        $product_name = $_POST['product_name'];
        $price = $_POST['price'];
        $image = $_POST['image'];

        // Prepare the SQL query to check if the product exists
        $stmt = $conn->prepare("SELECT id, quantity FROM cart_items WHERE product_name = ? AND user_id = ?");
        $stmt->bind_param("si", $product_name, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Product exists, update quantity
            $row = $result->fetch_assoc();
            $new_quantity = $row['quantity'] + 1; // Increment quantity

            // Update the existing product's quantity
            $update_stmt = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE id = ?");
            $update_stmt->bind_param("ii", $new_quantity, $row['id']);
            $update_success = $update_stmt->execute();

            if ($update_success) {
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
            $update_stmt->close();
        } else {
            // Product does not exist, insert a new record
            $quantity = 1; // Default quantity
            $insert_stmt = $conn->prepare("INSERT INTO cart_items (product_name, price, quantity, user_id, product_image) VALUES (?, ?, ?, ?, ?)");
            $insert_stmt->bind_param("ssiss", $product_name, $price, $quantity, $user_id, $image);

            if ($insert_stmt->execute()) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Item added to cart successfully!'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Database error: Failed to add item to cart.'
                ]);
            }
            $insert_stmt->close();
        }

        $stmt->close();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Product data missing'
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
