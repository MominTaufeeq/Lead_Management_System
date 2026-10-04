<?php

require_once '../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $stmt = $pdo->query("
        SELECT
            id,
            name,
            company,
            mobile,
            email,
            category,
            status,
            follow_up_date,
            priority,
            created_at,
            updated_at
        FROM leads
        ORDER BY id DESC
    ");

    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $leads
    ]);

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Unable to fetch leads.'
    ]);
}

