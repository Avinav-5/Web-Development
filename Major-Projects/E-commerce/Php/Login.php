<?php
session_start();
$servername = "localhost";
$username = "root"; // Default username for XAMPP/MAMP
$password = ""; // Default password for XAMPP/MAMP
$dbname = "e-commerce";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verify password using password_verify()
        if (password_verify($password, $row['password'])) {
            // Password is correct, start session and redirect
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['name'];
            header("Location: http://localhost:8080/E-commerce/products.html");
            exit();
        } else {
            // Incorrect password
            header("Location: http://localhost:8080/E-commerce/Login.html?error=Invalid%20password!");
            exit();
        }
    } else {
        // No user found with this email
        header("Location: http://localhost:8080/E-commerce/Login.html?error=No%20user%20found%20with%20that%20email!");
        exit();
    }
}

$conn->close();
?>
