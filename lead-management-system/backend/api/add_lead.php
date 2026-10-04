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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);

    exit;
}

$input = json_decode(
    file_get_contents('php://input'),
    true
);

if (!is_array($input)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON data.'
    ]);

    exit;
}

$name = trim($input['name'] ?? '');
$company = trim($input['company'] ?? '');
$mobile = trim($input['mobile'] ?? '');
$email = trim($input['email'] ?? '');
$category = trim($input['category'] ?? '');
$status = trim($input['status'] ?? '');
$follow_up_date = trim($input['follow_up_date'] ?? '');
$priority = trim($input['priority'] ?? 'Medium');

$allowedCategories = [
    'Innerwear',
    'Sportswear',
    'Comfortwear',
    'Fabric',
    'Accessories',
    'OEM/ODM'
];

$allowedStatuses = [
    'New',
    'Contacted',
    'Follow-up',
    'Converted',
    'Not Interested'
];

$allowedPriorities = [
    'Low',
    'Medium',
    'High'
];

/*
|--------------------------------------------------------------------------
| Required Fields
|--------------------------------------------------------------------------
*/

if (
    $name === '' ||
    $company === '' ||
    $mobile === '' ||
    $category === '' ||
    $status === ''
) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Name, company, mobile, category and status are required.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Name Validation
|--------------------------------------------------------------------------
*/

if (strlen($name) < 2 || strlen($name) > 100) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Name must be between 2 and 100 characters.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Company Validation
|--------------------------------------------------------------------------
*/

if (strlen($company) < 2 || strlen($company) > 150) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Company must be between 2 and 150 characters.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Mobile Validation
|--------------------------------------------------------------------------
*/

if (!preg_match('/^[6-9][0-9]{9}$/', $mobile)) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Enter a valid 10-digit Indian mobile number.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Email Validation
|--------------------------------------------------------------------------
*/

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Enter a valid email address.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Category Validation
|--------------------------------------------------------------------------
*/

if (!in_array($category, $allowedCategories, true)) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid category selected.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Status Validation
|--------------------------------------------------------------------------
*/

if (!in_array($status, $allowedStatuses, true)) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid status selected.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Priority Validation
|--------------------------------------------------------------------------
*/

if (!in_array($priority, $allowedPriorities, true)) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid priority selected.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Follow-up Date Validation
|--------------------------------------------------------------------------
*/

if ($follow_up_date !== '') {
    $date = DateTime::createFromFormat(
        'Y-m-d',
        $follow_up_date
    );

    if (
        !$date ||
        $date->format('Y-m-d') !== $follow_up_date
    ) {
        http_response_code(422);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid follow-up date.'
        ]);

        exit;
    }
}

try {

    $stmt = $pdo->prepare("
        INSERT INTO leads (
            name,
            company,
            mobile,
            email,
            category,
            status,
            follow_up_date,
            priority
        )
        VALUES (
            :name,
            :company,
            :mobile,
            :email,
            :category,
            :status,
            :follow_up_date,
            :priority
        )
    ");

    $stmt->execute([
        'name' => $name,
        'company' => $company,
        'mobile' => $mobile,
        'email' => $email !== '' ? $email : null,
        'category' => $category,
        'status' => $status,
        'follow_up_date' => $follow_up_date !== ''
            ? $follow_up_date
            : null,
        'priority' => $priority
    ]);

    http_response_code(201);

    echo json_encode([
        'success' => true,
        'message' => 'Lead added successfully.',
        'data' => [
            'id' => $pdo->lastInsertId()
        ]
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Unable to add lead.'
    ]);
}