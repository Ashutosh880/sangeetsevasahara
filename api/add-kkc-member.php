<?php
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    jsonResponse(['success' => false, 'message' => 'Invalid request body'], 400);
}

$kkc_id = trim($input['kkc_id'] ?? '');
$name = trim($input['name'] ?? '');
$mobile = trim($input['mobile'] ?? '');
$email = trim($input['email'] ?? '');
$city = trim($input['city'] ?? '');
$state = trim($input['state'] ?? '');

if (!$kkc_id || !$name || !$mobile) {
    jsonResponse(['success' => false, 'message' => 'kkc_id, name and mobile are required'], 400);
}

try {
    $pdo = getPDO();

    $stmt = $pdo->prepare(
        "INSERT INTO kkc_members (kkc_id, name, mobile, email, city, state, created_at)
         VALUES (:kkc_id, :name, :mobile, :email, :city, :state, NOW())"
    );

    $stmt->execute([
        ':kkc_id' => $kkc_id,
        ':name' => $name,
        ':mobile' => $mobile,
        ':email' => $email ?: null,
        ':city' => $city ?: null,
        ':state' => $state ?: null,
    ]);

    jsonResponse(['success' => true, 'message' => 'KKC member added']);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
