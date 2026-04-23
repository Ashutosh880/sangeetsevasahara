<?php
require_once __DIR__ . '/config.php';

try {
    $pdo = getPDO();
    $stmt = $pdo->query(
        "SELECT id, kkc_id, name, mobile, email, city, state, created_at
         FROM kkc_members
         ORDER BY created_at DESC"
    );
    $members = $stmt->fetchAll();

    jsonResponse([
        'success' => true,
        'data' => $members,
    ]);
} catch (Throwable $e) {
    jsonResponse([
        'success' => false,
        'message' => $e->getMessage(),
    ], 500);
}
