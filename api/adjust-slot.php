<?php
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);

$audition_date = $input['audition_date'] ?? null;
$time_slot = $input['time_slot'] ?? null;
$delta = isset($input['delta']) ? (int) $input['delta'] : 0;

if (!$audition_date || !$time_slot) {
    jsonResponse(['success' => false, 'message' => 'Missing audition_date or time_slot'], 400);
}

try {
    $pdo = getPDO();

    $stmt = $pdo->prepare(
        "UPDATE audition_slot
         SET booked_slots = booked_slots + :delta
         WHERE audition_date = :audition_date
           AND time_slot = :time_slot
           AND booked_slots + :delta <= total_slots
           AND booked_slots + :delta >= 0"
    );

    $stmt->execute([
        ':delta' => $delta,
        ':audition_date' => $audition_date,
        ':time_slot' => $time_slot,
    ]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['success' => false, 'message' => 'Slot unavailable or update could not be applied'], 400);
    }

    jsonResponse(['success' => true, 'message' => 'Slot count updated']);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
