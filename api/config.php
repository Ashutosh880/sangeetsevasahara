<?php
/**
 * API Configuration
 *
 * Update the constants below to match your database credentials.
 * In production, prefer using environment variables instead.
 */

// Allow requests from any origin (adjust as needed).
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Early return for CORS preflight requests.
    http_response_code(200);
    exit;
}

// === DATABASE CONFIGURATION ===
// Update these values for your environment.
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_NAME', getenv('DB_NAME') ?: 'your_database_name');
define('DB_USER', getenv('DB_USER') ?: 'your_database_user');
define('DB_PASS', getenv('DB_PASS') ?: 'your_database_password');

/**
 * Return a PDO instance for the configured database.
 *
 * @return PDO
 */
function getPDO(): PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);

    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

/**
 * Build a base URL for the API based on the current request.
 *
 * @return string
 */
function getBaseUrl(): string
{
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? '') == 443 ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $dir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? ''), '/\\');

    return $protocol . '://' . $host . $dir;
}

/**
 * Helper for returning a JSON response.
 *
 * @param mixed $data
 * @param int $statusCode
 * @return void
 */
function jsonResponse($data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

/**
 * Returns a fully-qualified URL to fetch a blob field for a registration.
 *
 * @param string $registrationId
 * @param string $field
 * @return string
 */
function getRegistrationMediaUrl(string $registrationId, string $field): string
{
    return getBaseUrl() . '/get-registration-media.php?id=' . urlencode($registrationId) . '&type=' . urlencode($field);
}
