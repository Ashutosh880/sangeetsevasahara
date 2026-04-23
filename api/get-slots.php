<?php
require_once __DIR__ . '/config.php';

try {
    $pdo = getPDO();

    $stmt = $pdo->prepare(
        "SELECT audition_date, time_slot, total_slots, booked_slots
         FROM audition_slot
         ORDER BY audition_date,
           CASE
             WHEN time_slot = '10AM-2PM' THEN 1
             WHEN time_slot = '3PM-7PM' THEN 2
             ELSE 3
           END"
    );
    $stmt->execute();

    $slots = $stmt->fetchAll(PDO::FETCH_ASSOC);

    jsonResponse(['success' => true, 'data' => $slots]);
} catch (Throwable $e) {
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
