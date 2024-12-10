<?php
// Database connection setup
$servername = "localhost";  // Usually 'localhost'
$username = "root";         // Your MySQL username
$password = "";             // Your MySQL password (empty for XAMPP default)
$dbname = "e-commerce";     // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form handling when the user submits the form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password']; // This needs to match the name in the HTML form

    // Check if passwords match
    if ($password !== $confirm_password) {
        die("Error: Passwords do not match. Please try again.");
    }

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    // Execute and check if insertion was successful
    if ($stmt->execute()) {
        // Redirect to login page with success parameter
        header("Location: http://localhost:8080/E-commerce/Login.html?success=true");
        exit(); // Stop further execution
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
