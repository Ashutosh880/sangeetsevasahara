# API Backend (PHP)

This folder contains a small set of PHP endpoints used by the frontend app (admin dashboard, registration flows, etc.). The APIs are designed to work with a MySQL database.

## Setup

1. Copy `config.php` to your environment and update the database credentials:
   - `DB_HOST`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASS`

   You can also use environment variables (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`) for better security.

2. Ensure your web server serves this folder under `/api/` (or adjust `src/lib/api.ts` to match your API base URL).

## Available Endpoints

### Registrations
- `get-registrations.php` (GET): Returns all registrations. Includes `profile_image_path` URLs that point to `get-registration-media.php`.
- `get-registration-media.php?id=<id>&type=profile_image` (GET): Streams raw blob data for a registration.
- `delete-registration.php` (POST): Delete a registration by `id`.
- `update-registration-status.php` (POST): Update a registration's `payment_status`.

### KKC Members
- `get-all-kkc-members.php` (GET): List all KKC members.
- `add-kkc-member.php` (POST): Add a new KKC member.
- `edit-kkc-member.php` (POST): Update an existing KKC member.
- `remove-kkc-member.php` (POST): Remove a KKC member.

## Notes

- The endpoints expect and return JSON payloads consistent with the frontend code in `src/lib/api.ts`.
- The blob streaming endpoint (`get-registration-media.php`) requires that the `registrations` table contains `profile_image` blob columns and optional mime columns `profile_image_mime`.
