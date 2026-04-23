<?php
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    jsonResponse(['success' => false, 'message' => 'Invalid request body'], 400);
}

$id = $input['id'] ?? null;
$kkc_id = trim($input['kkc_id'] ?? '');
$name = trim($input['name'] ?? '');
$mobile = trim($input['mobile'] ?? '');
$email = trim($input['email'] ?? '');
$city = trim($input['city'] ?? '');
$state = trim($input['state'] ?? '');

if (!$id || !$kkc_id || !$name || !$mobile) {
    jsonResponse(['success' => false, 'message' => 'id, kkc_id, name and mobile are required'], 400);
}

try {
    $pdo = getPDO();

    $stmt = $pdo->prepare(
        "UPDATE kkc_members
         SET kkc_id = :kkc_id,
             name = :name,
             mobile = :mobile,
             email = :email,
             city = :city,
             state = :state
         WHERE id = :id"
    );

    $stmt->execute([
        ':kkc_id' => $kkc_id,
        ':name' => $name,
        ':mobile' => $mobile,
        ':email' => $email ?: null,
        ':city' => $city ?: null,
        ':state' => $state ?: null,
        ':id' => $id,
    ]);

    jsonResponse(['success' => true, 'message' => 'KKC member updated']);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
