<?php
require_once __DIR__ . '/config.php';

try {
    $pdo = getPDO();

    $stmt = $pdo->query(
        "SELECT id,
                full_name,
                parent_name,
                date_of_birth,
                gender,
                mobile,
                whatsapp_number,
                email,
                full_address,
                city,
                state,
                pincode,
                category,
                audition_date,
                is_member,
                kkc_id,
                payment_amount,
                payment_status,
                is_selected_for_audition,
                selected_at,
                created_at
         FROM registrations
         ORDER BY created_at DESC"
    );

    $registrations = $stmt->fetchAll();

    // Attach URLs for profile image streaming.
    foreach ($registrations as &$reg) {
        $reg['profile_image_path'] = getRegistrationMediaUrl($reg['id'], 'profile_image');
    }

    jsonResponse([
        'success' => true,
        'data' => $registrations,
    ]);
} catch (Throwable $e) {
    jsonResponse([
        'success' => false,
        'message' => $e->getMessage(),
    ], 500);
}
