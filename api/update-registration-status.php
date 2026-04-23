<?php
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id']) || !isset($input['status'])) {
    jsonResponse(['success' => false, 'message' => 'Missing id or status'], 400);
}

$id = $input['id'];
$status = $input['status'];

$allowed = ['pending', 'approved', 'rejected'];
if (!in_array($status, $allowed, true)) {
    jsonResponse(['success' => false, 'message' => 'Invalid status'], 400);
}

try {
    $pdo = getPDO();
    $stmt = $pdo->prepare('UPDATE registrations SET payment_status = :status WHERE id = :id');
    $stmt->execute([':status' => $status, ':id' => $id]);

    jsonResponse(['success' => true, 'message' => 'Status updated']);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
