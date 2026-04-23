<?php
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id'])) {
    jsonResponse(['success' => false, 'message' => 'Missing id'], 400);
}

$id = $input['id'];

try {
    $pdo = getPDO();

    // Optionally, remove associated BLOB data if stored in the same table.
    $stmt = $pdo->prepare('DELETE FROM registrations WHERE id = :id');
    $stmt->execute([':id' => $id]);

    jsonResponse(['success' => true, 'message' => 'Registration removed']);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
