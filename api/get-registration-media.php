<?php
require_once __DIR__ . '/config.php';

$id = $_GET['id'] ?? null;
$type = $_GET['type'] ?? null;

if (!$id || !$type) {
    http_response_code(400);
    echo 'Missing id or type.';
    exit;
}

$allowedTypes = [
    'profile_image' => ['column' => 'profile_image', 'mime_column' => 'profile_image_mime'],
];

if (!isset($allowedTypes[$type])) {
    http_response_code(400);
    echo 'Invalid type parameter.';
    exit;
}

$columns = $allowedTypes[$type];

try {
    $pdo = getPDO();

    $stmt = $pdo->prepare(
        "SELECT {$columns['column']} AS blob_data, {$columns['mime_column']} AS mime_type
         FROM registrations
         WHERE id = :id"
    );
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch();

    if (!$row || $row['blob_data'] === null) {
        http_response_code(404);
        echo 'Media not found.';
        exit;
    }

    $mimeType = $row['mime_type'] ?? null;
    if (!$mimeType) {
        // Fallback if mime column is not set.
        $mimeType = 'image/jpeg';
    }

    header('Content-Type: ' . $mimeType);
    header('Cache-Control: public, max-age=31536000');

    echo $row['blob_data'];
    exit;
} catch (Throwable $e) {
    http_response_code(500);
    echo 'Server error.';
    exit;
}
