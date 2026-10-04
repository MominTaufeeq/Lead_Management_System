<?php

require_once 'config/database.php';

$stmt = $pdo->query("SELECT DATABASE() AS database_name");

$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo "Database connection successful!<br>";
echo "Connected database: " . $result['database_name'];