-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 07, 2025 at 10:03 AM
-- Server version: 8.0.44
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alsindata`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cmaxcmin`
--

CREATE TABLE `cmaxcmin` (
  `id_cmaxcmin` bigint UNSIGNED NOT NULL,
  `id_penilaian` bigint UNSIGNED NOT NULL,
  `kriteria` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cmax` int DEFAULT NULL,
  `cmin` int DEFAULT NULL,
  `cmax_cmin` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forgotpassword`
--

CREATE TABLE `forgotpassword` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kriteria`
--

CREATE TABLE `kriteria` (
  `id_kriteria` bigint UNSIGNED NOT NULL,
  `kode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kriteria` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bobot` double NOT NULL DEFAULT '1',
  `normalisasi` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kriteria`
--

INSERT INTO `kriteria` (`id_kriteria`, `kode`, `kriteria`, `bobot`, `normalisasi`, `created_at`, `updated_at`) VALUES
(1, 'K01', 'Terdaftar di Dinas', 40, 0.4, '2025-10-27 04:36:49', '2025-10-28 00:51:21'),
(2, 'K02', 'Lokasi Sentra Produksi', 20, 0.2, '2025-10-27 04:36:49', '2025-10-28 00:51:21'),
(3, 'K03', 'Belum Pernah Terima', 30, 0.3, '2025-10-27 04:36:49', '2025-10-28 00:51:21'),
(4, 'K04', 'Kelengkapan Proposal', 10, 0.1, '2025-10-27 04:36:49', '2025-10-28 00:51:21');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_21_085025_create_personal_access_tokens_table', 1),
(5, '2025_10_21_093119_create_poktan_table', 1),
(6, '2025_10_21_095934_create_pengajuan_table', 2),
(7, '2025_10_21_103725_drop_alamat_from_poktan_table', 3),
(8, '2025_10_21_104515_create_kriteria_table', 4),
(9, '2025_10_25_221006_create_penilaian_table', 5),
(10, '2025_10_27_112924_create_kriteria_table', 6),
(11, '2025_10_27_113313_create_parameter_table', 7),
(12, '2025_10_28_065658_create_penilaian_table', 8),
(13, '2025_10_28_070147_create_penilaian_table', 9),
(14, '2025_10_28_071704_create_rekomendasi_table', 10),
(15, '2025_10_28_074050_add_normalisasi_to_kriteria_table', 11),
(16, '2025_10_28_080757_create_nilaiparameter_table', 12),
(17, '2025_10_28_104632_create_penilaian_table', 13),
(18, '2025_10_28_104734_create_penilaian_detail_table', 13),
(19, '2025_10_28_131544_create_pengajuan_table', 14),
(20, '2025_11_06_141614_create_forgotpassword_table', 15),
(21, '2025_11_06_160850_create_password_resets_api_table', 16),
(22, '2025_11_06_185917_create_cmaxcmin_table', 17),
(23, '2025_11_06_191648_create_cmaxcmin_table', 18),
(24, '2025_11_06_191751_create_cmaxcmin_table', 19),
(25, '2025_11_06_192339_create_cmaxcmin_table', 20);

-- --------------------------------------------------------

--
-- Table structure for table `nilaiparameter`
--

CREATE TABLE `nilaiparameter` (
  `id_nilaiparameter` bigint UNSIGNED NOT NULL,
  `id_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_kriteria` bigint UNSIGNED NOT NULL,
  `id_parameter` bigint UNSIGNED NOT NULL,
  `nilai` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parameter`
--

CREATE TABLE `parameter` (
  `id_parameter` bigint UNSIGNED NOT NULL,
  `id_kriteria` bigint UNSIGNED NOT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `parameter`
--

INSERT INTO `parameter` (`id_parameter`, `id_kriteria`, `keterangan`, `nilai`, `created_at`, `updated_at`) VALUES
(1, 1, 'Terdaftar', 5, '2025-10-27 04:38:41', '2025-10-27 04:38:41'),
(2, 1, 'Tidak Terdaftar', 1, '2025-10-27 04:38:41', '2025-10-27 04:38:41'),
(3, 3, 'Belum Pernah Menerima Bantuan', 5, '2025-10-27 04:38:41', '2025-10-27 04:38:41'),
(4, 3, 'Pernah menerima > 5 tahun lalu', 1, '2025-10-27 04:38:41', '2025-10-27 04:38:41'),
(5, 2, 'Berada di Sentra Produksi', 5, '2025-10-27 04:38:41', '2025-10-27 04:38:41'),
(6, 2, 'Tidak Berada di Sentra Produksi', 1, '2025-10-27 04:38:41', '2025-10-27 04:38:41'),
(7, 4, 'Proposal Lengkap', 5, '2025-10-27 04:38:41', '2025-10-27 04:38:41'),
(8, 4, 'Tidak Ada Proposal', 1, '2025-10-27 04:38:41', '2025-10-27 04:38:41');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets_api`
--

CREATE TABLE `password_resets_api` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('admin@gmail.com', '$2y$12$o53HzLkDTJwqgo98.zbkHudKGJtqZOD1pSiwhe9ZhHyUEDLQYhrhq', '2025-11-06 07:11:15');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan`
--

CREATE TABLE `pengajuan` (
  `id_pengajuan` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_barang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `merek` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_ketua` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_hp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Proses','Diterima','Batal') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Proses',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengajuan`
--

INSERT INTO `pengajuan` (`id_pengajuan`, `id_poktan`, `nama_poktan`, `nama_barang`, `merek`, `tipe`, `nama_ketua`, `nomor_hp`, `status`, `created_at`, `updated_at`) VALUES
('PJ001', 'P001', 'Mardi Lestari', 'a', 'a', 'a', 'Aris Whisnu', '082223054749', 'Proses', '2025-10-28 06:34:52', '2025-10-28 07:22:00'),
('PJ002', 'P003', 'a', 'b', 'b', 'b', 'a', '321', 'Diterima', '2025-10-28 06:46:36', '2025-10-28 07:22:43'),
('PJ003', 'P001', 'Mardi Lestari', 'c', 'c', 'c', 'Aris Whisnu', '082223054749', 'Diterima', '2025-10-28 06:46:49', '2025-10-28 07:21:01'),
('PJ004', 'P003', 'a', 'n', 'n', 'n', 'a', '321', 'Proses', '2025-10-28 06:47:45', '2025-10-28 06:47:45');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id_penilaian` bigint UNSIGNED NOT NULL,
  `id_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_nilai` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id_penilaian`, `id_poktan`, `total_nilai`, `created_at`, `updated_at`) VALUES
(7, 'P002', 21, '2025-10-28 04:44:26', '2025-11-06 10:27:21');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian_detail`
--

CREATE TABLE `penilaian_detail` (
  `id_detail` bigint UNSIGNED NOT NULL,
  `id_penilaian` bigint UNSIGNED NOT NULL,
  `id_kriteria` bigint UNSIGNED NOT NULL,
  `id_parameter` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penilaian_detail`
--

INSERT INTO `penilaian_detail` (`id_detail`, `id_penilaian`, `id_kriteria`, `id_parameter`, `created_at`, `updated_at`) VALUES
(87, 7, 1, 1, '2025-11-06 10:27:21', '2025-11-06 10:27:21'),
(88, 7, 2, 5, '2025-11-06 10:27:21', '2025-11-06 10:27:21'),
(89, 7, 3, 3, '2025-11-06 10:27:21', '2025-11-06 10:27:21'),
(90, 7, 4, 8, '2025-11-06 10:27:21', '2025-11-06 10:27:21'),
(91, 7, 18, 19, '2025-11-06 10:27:21', '2025-11-06 10:27:21');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'd3144e6e4d86a6848d4264e1f583dedc65ab46b5a8a1aab75b938cf1d0e38674', '[\"*\"]', '2025-11-06 05:59:51', NULL, '2025-11-06 05:54:08', '2025-11-06 05:59:51'),
(2, 'App\\Models\\User', 1, 'auth_token', '5fa9d2a1fb50b64aeba966a99016a22433d54b322355921fd4c2add1f26dc357', '[\"*\"]', '2025-11-06 06:42:22', NULL, '2025-11-06 06:00:49', '2025-11-06 06:42:22'),
(3, 'App\\Models\\User', 1, 'auth_token', '5056964cc335ba35f1db39f8d9936bd1c15f82f94d9290f2b2115e9f2c5f37ea', '[\"*\"]', '2025-11-06 06:11:22', NULL, '2025-11-06 06:11:07', '2025-11-06 06:11:22'),
(4, 'App\\Models\\User', 1, 'auth_token', 'f80b840aa6a835d19f3cc0cba16a0694b7f84fa3dfdd97783da11db3e83a7569', '[\"*\"]', '2025-11-06 06:50:13', NULL, '2025-11-06 06:49:41', '2025-11-06 06:50:13'),
(5, 'App\\Models\\User', 1, 'auth_token', '300a2bf00dbbe15bf3648a2292ec1a4eb7901530d2fa98d6dd9e9b445f69bd0b', '[\"*\"]', '2025-11-06 06:51:12', NULL, '2025-11-06 06:50:59', '2025-11-06 06:51:12'),
(6, 'App\\Models\\User', 2, 'auth_token', 'b3b0b4434e5ee9e26ff5ed044fc69628bcfb05ea3fcaf54f44a46767bad7b087', '[\"*\"]', '2025-11-06 07:05:36', NULL, '2025-11-06 07:03:55', '2025-11-06 07:05:36'),
(7, 'App\\Models\\User', 1, 'auth_token', '82ed138ada6dfd299452021da1539753f5577ce33af3e74a81d87db3095ae263', '[\"*\"]', '2025-11-06 09:31:55', NULL, '2025-11-06 09:19:22', '2025-11-06 09:31:55'),
(8, 'App\\Models\\User', 2, 'auth_token', '5bf76a6a7a9465ac35540710304826cba36661828292d934769a02870c314a2d', '[\"*\"]', '2025-11-06 13:02:46', NULL, '2025-11-06 09:33:49', '2025-11-06 13:02:46'),
(9, 'App\\Models\\User', 1, 'auth_token', '739869bffb50a3ed00002376dda6470a3b843c7168e16e824213581c44ee4f17', '[\"*\"]', '2025-11-06 12:42:42', NULL, '2025-11-06 12:34:14', '2025-11-06 12:42:42');

-- --------------------------------------------------------

--
-- Table structure for table `poktan`
--

CREATE TABLE `poktan` (
  `id_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `desa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kecamatan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_ketua` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nik` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_hp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `poktan`
--

INSERT INTO `poktan` (`id_poktan`, `nama_poktan`, `desa`, `kecamatan`, `nama_ketua`, `nik`, `nomor_hp`, `created_at`, `updated_at`) VALUES
('P001', 'Mardi Lestari', 'Bolopleret', 'Juwiring', 'Aris Whisnu', '331', '082223054749', '2025-10-21 02:51:46', '2025-10-21 02:51:46'),
('P002', 'Sido Mulyo', 'Wadunggetas', 'Wonosari', 'Wiyono', '331', '082223421721', '2025-10-21 02:52:29', '2025-10-21 02:52:29'),
('P003', 'c', 'c', 'c', 'c', '5958', '245435', '2025-11-06 10:37:21', '2025-11-06 10:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `rekomendasi`
--

CREATE TABLE `rekomendasi` (
  `id_rekomendasi` bigint UNSIGNED NOT NULL,
  `kode_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_poktan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `k1` double DEFAULT NULL,
  `k2` double DEFAULT NULL,
  `k3` double DEFAULT NULL,
  `k4` double DEFAULT NULL,
  `nilai_akhir` double DEFAULT NULL,
  `ranking` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2ttOiJy1ngCV693DfxLBpmCmBYKWjc7pIhiD782p', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiakwxS3dYMEVhVXVqV2p4TVNLbmRVSXhWaFlwQnJ0YXBnb0ludTBJWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly9sb2NhbGhvc3Qvc21hcnQtbGFyYXZlbC9wdWJsaWMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761042605);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Alsindata', 'alsindata@gmail.com', NULL, '$2y$12$cXltmmqBVeS15dOGVr03suaUaxRavL/bAWt5U9S6d0wAAjKhjcwJe', NULL, '2025-11-06 04:37:41', '2025-11-06 09:18:40'),
(2, 'Admin', 'admin@gmail.com', NULL, '$2y$12$9G5Mu6pDdZAQI6gaX9c/KechP1Bdq/At7aNtYtyKoCxQsD/7nC/Se', NULL, '2025-11-06 07:01:31', '2025-11-06 07:01:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cmaxcmin`
--
ALTER TABLE `cmaxcmin`
  ADD PRIMARY KEY (`id_cmaxcmin`),
  ADD KEY `cmaxcmin_id_penilaian_foreign` (`id_penilaian`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `forgotpassword`
--
ALTER TABLE `forgotpassword`
  ADD PRIMARY KEY (`id`),
  ADD KEY `forgotpassword_email_index` (`email`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id_kriteria`),
  ADD UNIQUE KEY `kriteria_kode_unique` (`kode`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nilaiparameter`
--
ALTER TABLE `nilaiparameter`
  ADD PRIMARY KEY (`id_nilaiparameter`),
  ADD KEY `nilaiparameter_id_poktan_foreign` (`id_poktan`),
  ADD KEY `nilaiparameter_id_kriteria_foreign` (`id_kriteria`),
  ADD KEY `nilaiparameter_id_parameter_foreign` (`id_parameter`);

--
-- Indexes for table `parameter`
--
ALTER TABLE `parameter`
  ADD PRIMARY KEY (`id_parameter`),
  ADD KEY `parameter_id_kriteria_foreign` (`id_kriteria`);

--
-- Indexes for table `password_resets_api`
--
ALTER TABLE `password_resets_api`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_resets_api_email_index` (`email`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pengajuan`
--
ALTER TABLE `pengajuan`
  ADD PRIMARY KEY (`id_pengajuan`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id_penilaian`),
  ADD KEY `id_poktan` (`id_poktan`);

--
-- Indexes for table `penilaian_detail`
--
ALTER TABLE `penilaian_detail`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `penilaian_detail_id_penilaian_foreign` (`id_penilaian`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `poktan`
--
ALTER TABLE `poktan`
  ADD PRIMARY KEY (`id_poktan`);

--
-- Indexes for table `rekomendasi`
--
ALTER TABLE `rekomendasi`
  ADD PRIMARY KEY (`id_rekomendasi`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cmaxcmin`
--
ALTER TABLE `cmaxcmin`
  MODIFY `id_cmaxcmin` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `forgotpassword`
--
ALTER TABLE `forgotpassword`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id_kriteria` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `nilaiparameter`
--
ALTER TABLE `nilaiparameter`
  MODIFY `id_nilaiparameter` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parameter`
--
ALTER TABLE `parameter`
  MODIFY `id_parameter` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `password_resets_api`
--
ALTER TABLE `password_resets_api`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id_penilaian` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `penilaian_detail`
--
ALTER TABLE `penilaian_detail`
  MODIFY `id_detail` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `rekomendasi`
--
ALTER TABLE `rekomendasi`
  MODIFY `id_rekomendasi` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cmaxcmin`
--
ALTER TABLE `cmaxcmin`
  ADD CONSTRAINT `cmaxcmin_id_penilaian_foreign` FOREIGN KEY (`id_penilaian`) REFERENCES `penilaian` (`id_penilaian`) ON DELETE CASCADE;

--
-- Constraints for table `nilaiparameter`
--
ALTER TABLE `nilaiparameter`
  ADD CONSTRAINT `nilaiparameter_id_kriteria_foreign` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria` (`id_kriteria`) ON DELETE CASCADE,
  ADD CONSTRAINT `nilaiparameter_id_parameter_foreign` FOREIGN KEY (`id_parameter`) REFERENCES `parameter` (`id_parameter`) ON DELETE CASCADE,
  ADD CONSTRAINT `nilaiparameter_id_poktan_foreign` FOREIGN KEY (`id_poktan`) REFERENCES `poktan` (`id_poktan`) ON DELETE CASCADE;

--
-- Constraints for table `parameter`
--
ALTER TABLE `parameter`
  ADD CONSTRAINT `parameter_id_kriteria_foreign` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria` (`id_kriteria`) ON DELETE CASCADE;

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`id_poktan`) REFERENCES `poktan` (`id_poktan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penilaian_detail`
--
ALTER TABLE `penilaian_detail`
  ADD CONSTRAINT `penilaian_detail_id_penilaian_foreign` FOREIGN KEY (`id_penilaian`) REFERENCES `penilaian` (`id_penilaian`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
