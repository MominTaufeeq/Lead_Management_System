<?php

require_once '../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);

    exit;
}

$id = $_GET['id'] ?? '';

if (!ctype_digit($id) || (int) $id <= 0) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid lead ID.'
    ]);

    exit;
}

try {

    // Check if lead exists
    $checkStmt = $pdo->prepare(
        "SELECT id FROM leads WHERE id = :id"
    );

    $checkStmt->execute([
        'id' => $id
    ]);

    $lead = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if (!$lead) {
        http_response_code(404);

        echo json_encode([
            'success' => false,
            'message' => 'Lead not found.'
        ]);

        exit;
    }

    // Delete lead
    $stmt = $pdo->prepare(
        "DELETE FROM leads WHERE id = :id"
    );

    $stmt->execute([
        'id' => $id
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Lead deleted successfully.'
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Unable to delete lead.'
    ]);
}