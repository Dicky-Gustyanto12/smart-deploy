-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 31, 2025 at 09:42 PM
-- Server version: 10.11.14-MariaDB
-- PHP Version: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alsindat_alsindatadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kriteria`
--

CREATE TABLE `kriteria` (
  `id_kriteria` bigint(20) UNSIGNED NOT NULL,
  `kode` varchar(255) NOT NULL,
  `kriteria` varchar(255) NOT NULL,
  `bobot` double NOT NULL DEFAULT 1,
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
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
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
(19, '2025_10_28_131544_create_pengajuan_table', 14);

-- --------------------------------------------------------

--
-- Table structure for table `nilaiparameter`
--

CREATE TABLE `nilaiparameter` (
  `id_nilaiparameter` bigint(20) UNSIGNED NOT NULL,
  `id_poktan` varchar(255) NOT NULL,
  `id_kriteria` bigint(20) UNSIGNED NOT NULL,
  `id_parameter` bigint(20) UNSIGNED NOT NULL,
  `nilai` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parameter`
--

CREATE TABLE `parameter` (
  `id_parameter` bigint(20) UNSIGNED NOT NULL,
  `id_kriteria` bigint(20) UNSIGNED NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `nilai` int(11) NOT NULL,
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
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan`
--

CREATE TABLE `pengajuan` (
  `id_pengajuan` varchar(6) NOT NULL,
  `id_poktan` varchar(255) NOT NULL,
  `nama_poktan` varchar(255) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `merek` varchar(255) NOT NULL,
  `tipe` varchar(255) NOT NULL,
  `nama_ketua` varchar(255) NOT NULL,
  `nomor_hp` varchar(255) NOT NULL,
  `status` enum('Proses','Diterima','Batal') NOT NULL DEFAULT 'Proses',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengajuan`
--

INSERT INTO `pengajuan` (`id_pengajuan`, `id_poktan`, `nama_poktan`, `nama_barang`, `merek`, `tipe`, `nama_ketua`, `nomor_hp`, `status`, `created_at`, `updated_at`) VALUES
('PJ001', 'P001', 'Mardi Lestari', 'Traktor', 'Kubota', 'RD190 DI-2N', 'Aris Whisnu', '082223054749', 'Diterima', '2025-10-29 20:01:32', '2025-10-29 20:04:42'),
('PJ002', 'P002', 'Sido Mulyo', 'Traktor', 'Quick', 'G-100', 'Wiyono', '082223421721', 'Diterima', '2025-10-29 20:03:11', '2025-10-29 20:04:52'),
('PJ003', 'P001', 'Mardi Lestari', 'Traktor', 'Yanmar', 'YST DX', 'Aris Whisnu', '082223054749', 'Proses', '2025-10-29 20:06:52', '2025-10-29 20:06:52'),
('PJ004', 'P002', 'Sido Mulyo', 'Pompa Air Irigasi', 'Honda', 'WL 30 XN', 'Wiyono', '082223421721', 'Proses', '2025-10-29 20:09:32', '2025-10-29 20:09:32');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id_penilaian` bigint(20) UNSIGNED NOT NULL,
  `id_poktan` varchar(255) NOT NULL,
  `total_nilai` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id_penilaian`, `id_poktan`, `total_nilai`, `created_at`, `updated_at`) VALUES
(17, 'P001', 20, '2025-10-31 07:23:31', '2025-10-31 07:23:31'),
(18, 'P002', 16, '2025-10-31 07:24:19', '2025-10-31 07:24:19'),
(19, 'P003', 12, '2025-10-31 07:24:42', '2025-10-31 07:24:42');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian_detail`
--

CREATE TABLE `penilaian_detail` (
  `id_detail` bigint(20) UNSIGNED NOT NULL,
  `id_penilaian` bigint(20) UNSIGNED NOT NULL,
  `id_kriteria` bigint(20) UNSIGNED NOT NULL,
  `id_parameter` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penilaian_detail`
--

INSERT INTO `penilaian_detail` (`id_detail`, `id_penilaian`, `id_kriteria`, `id_parameter`, `created_at`, `updated_at`) VALUES
(134, 17, 1, 1, '2025-10-31 07:23:31', '2025-10-31 07:23:31'),
(135, 17, 2, 5, '2025-10-31 07:23:31', '2025-10-31 07:23:31'),
(136, 17, 3, 3, '2025-10-31 07:23:31', '2025-10-31 07:23:31'),
(137, 17, 4, 7, '2025-10-31 07:23:31', '2025-10-31 07:23:31'),
(138, 18, 1, 1, '2025-10-31 07:24:19', '2025-10-31 07:24:19'),
(139, 18, 2, 6, '2025-10-31 07:24:19', '2025-10-31 07:24:19'),
(140, 18, 3, 3, '2025-10-31 07:24:19', '2025-10-31 07:24:19'),
(141, 18, 4, 7, '2025-10-31 07:24:19', '2025-10-31 07:24:19'),
(142, 19, 1, 1, '2025-10-31 07:24:42', '2025-10-31 07:24:42'),
(143, 19, 2, 5, '2025-10-31 07:24:42', '2025-10-31 07:24:42'),
(144, 19, 3, 4, '2025-10-31 07:24:42', '2025-10-31 07:24:42'),
(145, 19, 4, 8, '2025-10-31 07:24:42', '2025-10-31 07:24:42');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `poktan`
--

CREATE TABLE `poktan` (
  `id_poktan` varchar(255) NOT NULL,
  `nama_poktan` varchar(255) NOT NULL,
  `desa` varchar(255) NOT NULL,
  `kecamatan` varchar(255) NOT NULL,
  `nama_ketua` varchar(255) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `nomor_hp` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `poktan`
--

INSERT INTO `poktan` (`id_poktan`, `nama_poktan`, `desa`, `kecamatan`, `nama_ketua`, `nik`, `nomor_hp`, `created_at`, `updated_at`) VALUES
('P001', 'Mardi Lestari', 'Bolopleret', 'Juwiring', 'Aris Whisnu', '331', '082223054749', '2025-10-21 02:51:46', '2025-10-21 02:51:46'),
('P002', 'Sido Mulyo', 'Wadunggetas', 'Wonosari', 'Wiyono', '331', '082223421721', '2025-10-21 02:52:29', '2025-10-21 02:52:29'),
('P003', 'Tani Mulyo', 'Bolopleret', 'Juwiring', 'Jarot Adi Widyanto', '3310142305840005', '082223421721', '2025-10-31 00:53:48', '2025-10-31 07:01:08');

-- --------------------------------------------------------

--
-- Table structure for table `rekomendasi`
--

CREATE TABLE `rekomendasi` (
  `id_rekomendasi` bigint(20) UNSIGNED NOT NULL,
  `kode_poktan` varchar(255) NOT NULL,
  `nama_poktan` varchar(255) NOT NULL,
  `k1` double DEFAULT NULL,
  `k2` double DEFAULT NULL,
  `k3` double DEFAULT NULL,
  `k4` double DEFAULT NULL,
  `nilai_akhir` double DEFAULT NULL,
  `ranking` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('06Mp6ov0DnMsXTehXwxL8rtdoUF746q9HpxGrpAv', NULL, '54.93.192.21', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaTZ6Y2pKd3VQTjExU1VBMEM1anBGZlJJcGdHNTcybUxKaGJQOHdQRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761822586),
('0xruR02pAT737ECSiOu0Lc2ONhj9nxZ4x6H3xmRy', NULL, '54.93.192.21', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTDI0aVlMejU4ckFvcXo3a29Jd2tRSEhZcmU2UXlXYVN1Z3VCM1BJSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761822588),
('2hdeyIIRV76hftT2str1g32Gd5lK3mN4ozNOlGA6', NULL, '3.26.211.234', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_7_5) AppleWebKit/535.23 (KHTML, like Gecko) Version/6.1.8 Safari/537.18', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTXNvdmJmc1JmWEU2cmhtdnRIVEN1Ulk5SDdzcnR3SGxiUW1YUWxhaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9hcGkuYWxzaW5kYXRhLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761788993),
('2mkBoymrH5ZEomrLWc1Lw1clIQbA4LJ6CoX9J46j', NULL, '23.27.145.132', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOUxleDBxajZseXdwWU1kQnBkWENqZzFxUEJZdGpKdnEzMTl2UWhUMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761864564),
('2ttOiJy1ngCV693DfxLBpmCmBYKWjc7pIhiD782p', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiakwxS3dYMEVhVXVqV2p4TVNLbmRVSXhWaFlwQnJ0YXBnb0ludTBJWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly9sb2NhbGhvc3Qvc21hcnQtbGFyYXZlbC9wdWJsaWMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761042605),
('6eSr1awuespm9O5nl3c38x24ufpu1iYDrYMCfITN', NULL, '34.172.57.196', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOUp0WmV0VWw2VlNUNlcybG1kaE9kREVmdjVKRGlZejF5blBpWU96biI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly93d3cuYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761837668),
('BJpkKJY7DjWCccPEF1OfZZcQBbEVqUbmoZKe0NVu', NULL, '206.189.238.35', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVlhWVzhZbEpvc3dZeURvaUVickppaDQwekdjaWVqQkpHVnVueGYzWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761900940),
('C4hbouZrOmxNnV6amZISyo9KufSwK855EPYzvjYu', NULL, '206.189.238.35', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1NpWDNOOFprUUFqbkw0a3RtVHU1NDRTcktVSmtUYlgwaVV0Z0pkaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9hcGkuYWxzaW5kYXRhLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761900937),
('C4rCjxXBA27OXnxivKpDmpZZhfzIoQbDTaaKn0D6', NULL, '35.240.92.27', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZDJnVjN4WENYVFdMTzNqR0F4QW5mUG1oTlhhOXpmeXp2WlZRUnVhRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly93d3cuYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761842837),
('cjmeiTGqkjDnO2PMtfJ5MVCcrepSJqyTYQQDQi7Z', NULL, '193.32.248.133', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUhLanl2YWxQUDdSVGZvZVlrZHlZaExtczdFdkJXZDhUNXlBaVRRQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761814478),
('dFyFR26ixzRsId9ih6an4dUwyTHblcXvlaNLWU92', NULL, '34.142.225.50', 'Mozilla/5.0 (Linux; Android 5.1.1; SM-J111F)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHc3TGZxSGZ0SFFKSUpzdFdoNXNsbGVmVDBMU1M3ZTl6dmhIWFJCYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9hcGkuYWxzaW5kYXRhLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761796890),
('eYOrIIWrOBrJ9N5mjVrUBxTHDppNU6WUeoiacbcD', NULL, '34.186.18.107', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieTJZbnBXaWw5S0YwSnVYSnRaQzlCVE1jTmhsVm02bDBUckFvM0M0cyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9hcGkuYWxzaW5kYXRhLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761837283),
('jQxGZFr8dBsLAbe9a8oWGYSROfne0C0QVU9Krzzu', NULL, '51.159.100.254', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicDdmNjhPaVhhRmNWS3FocGc0Z29CZEFqeHdyOFNYMUhJOXZ2cUFhbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9hcGkuYWxzaW5kYXRhLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761833357),
('KaADRNie1FMTlt6fmWIey0OHjaBFwheVLkx8s6aA', NULL, '34.141.215.197', 'Scrapy/2.13.3 (+https://scrapy.org)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnh1ZExOQUd0YXNqaTNPM25kTlExeHk0Z0JPWW5FdEdxb2I1Q0ZVNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761899321),
('lRsvvcuYBFMNvraP46alTGEnejpFCHrpW5oHbKYz', NULL, '119.2.40.254', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ3pYN3BoY2UxU1RZMGlVNVhmQmFPc2xtZU9Db21JU1BFUndjWm9saSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761781626),
('oCirhrJVRdoPFwoGh4RxKzyCe3eTVwc7NYioxwlg', NULL, '35.185.93.177', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4240.193 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSDhjOHBtNGxJY2JYZ2V3MXY1eHIxQU9IcGpyM2M4ZTlYb3RQdUJtOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9hcGkuYWxzaW5kYXRhLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761915610),
('oKj9tfdq0D9wHOPfSammN89qugCuUwrNL7iLR6xx', NULL, '34.12.78.199', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidkQyZ1RGWG1uR3RKU0dKS2dCa0RwQkhtQm9OWDJTTWpnajFoanZ6bCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjM6Imh0dHA6Ly9hcGkuYWxzaW5kYXRhLmlkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761842293),
('Pb31k4vZT5MM8Nj5iVbUzhzXm9dYtja9H7PiBYz2', NULL, '23.27.145.160', 'Mozilla/5.0 (X11; Linux i686; rv:109.0) Gecko/20100101 Firefox/120.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaWtDbWdLYUJNRUdxamc4TzRDZ0xaTlJDVDZXOE54bmI4QzVBZGxpdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761857917),
('r1rmmAA5UMyVDhl7Kcdux53WqS7ioCigHMF3iFGB', NULL, '51.159.100.254', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieTAzb2U0SnBEV3QycmNnTTZNMVVmcE1uc2RFTFhDVlliTHVUaUxsQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761833359),
('SBA5fBfLppDtleP4FMPCxxvrtaqiiynltS4wVagn', NULL, '51.159.100.254', 'curl/7.81.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidTNRUVlVMmw1TWdySUhXZEZoalZreU1lSnA3STNhRjdsY3ZkVzJadyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761833352),
('txMmQVSs97jVaBnbSBiyEKHLfkN5RxiR03nYeVEo', NULL, '23.27.145.19', 'Mozilla/5.0 (X11; Linux i686; rv:109.0) Gecko/20100101 Firefox/120.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWXdnQ2FiaVF6WnNNNzhFMW1uNjhzMlZCWlZ2bDhhVHdQWElGN1BiZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHBzOi8vd3d3LmFwaS5hbHNpbmRhdGEuaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761840409),
('vR4gmSKg5lASNtlu6yrHTEq8b8IUblKqcqWMkTMd', NULL, '149.57.180.111', 'Mozilla/5.0 (X11; Linux i686; rv:109.0) Gecko/20100101 Firefox/120.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNTlndHRBMUU3N3BtTVpPQTBmVXAyTTJrVFYzM0N0d3lEWlRDNU8wViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHBzOi8vd3d3LmFwaS5hbHNpbmRhdGEuaWQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761851892),
('xnWKAQ2kT7Fa5oFbK3JzwUMJTPj9a30chDFhvaGJ', NULL, '119.2.40.254', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiekdYZ2FkUk5PTzVMOVNWSEJ1WkE1cE5PZFN3V3l5ZG16Vm1lOHdkdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjQ6Imh0dHBzOi8vYXBpLmFsc2luZGF0YS5pZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761779958);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

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
  ADD PRIMARY KEY (`id_penilaian`);

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
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id_kriteria` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `nilaiparameter`
--
ALTER TABLE `nilaiparameter`
  MODIFY `id_nilaiparameter` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parameter`
--
ALTER TABLE `parameter`
  MODIFY `id_parameter` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id_penilaian` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `penilaian_detail`
--
ALTER TABLE `penilaian_detail`
  MODIFY `id_detail` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rekomendasi`
--
ALTER TABLE `rekomendasi`
  MODIFY `id_rekomendasi` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `penilaian_detail`
--
ALTER TABLE `penilaian_detail`
  ADD CONSTRAINT `penilaian_detail_id_penilaian_foreign` FOREIGN KEY (`id_penilaian`) REFERENCES `penilaian` (`id_penilaian`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
