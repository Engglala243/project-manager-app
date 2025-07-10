-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 10, 2025 at 06:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flipr_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `designation` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) NOT NULL DEFAULT 'system',
  `updated_by` varchar(255) NOT NULL DEFAULT 'system',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `description`, `designation`, `image_url`, `created_by`, `updated_by`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
('6e5248b2-255d-4700-ad02-3ac9b0d9a6c4', 'John Smith', 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations with their attention to detail and professional approach.', 'CEO, Tech Solutions Inc.', 'https://example.com/client-image.jpg', 'admin', 'admin', 1, 0, '2025-07-10 07:39:55', '2025-07-10 07:39:55');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL DEFAULT 'user',
  `updated_by` varchar(255) NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `full_name`, `email`, `phone`, `city`, `created_by`, `updated_by`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
('3bcafaea-2cda-45d9-b229-6968e3190b3a', 'Santosh Patidar', 'adityapatidar243@gmail.com', '09926340087', 'INDORE', 'user', 'user', 1, 0, '2025-07-10 09:01:00', '2025-07-10 09:01:00'),
('b8718779-afc0-4404-8f28-bebdbe482cab', 'Santosh Patidar', 'adityapatidar243@gmail.com', '9926340087', 'INDORE', 'user', 'user', 1, 0, '2025-07-10 09:01:28', '2025-07-10 09:01:28'),
('bc3925ec-270d-4bf7-b8b3-a14700a5768a', 'Aditya Patidar', 'aditya.patidarcs2021@indoreinstitute.com', '7828982951', 'Pithampur', 'user', 'user', 1, 0, '2025-07-10 09:21:23', '2025-07-10 09:21:23'),
('f70636ba-3b44-470a-8aca-496a60a88cd8', 'Jane Doe', 'jane.doe@example.com', '+1234567890', 'New York', 'user', 'user', 1, 0, '2025-07-10 07:40:15', '2025-07-10 07:40:15');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) NOT NULL DEFAULT 'system',
  `updated_by` varchar(255) NOT NULL DEFAULT 'system',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `description`, `image_url`, `created_by`, `updated_by`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
('655e21e5-98e6-44f8-9d81-aa0cef67ea62', 'E-commerce Website', 'A modern e-commerce platform built with React and Node.js featuring user authentication, payment integration, and admin dashboard.', 'https://example.com/project-image.jpg', 'admin', 'admin', 1, 0, '2025-07-10 07:40:03', '2025-07-10 07:40:03'),
('fcd116dc-94cf-42fd-9285-a14f7fceb93c', 'Updated E-commerce Website', 'An updated modern e-commerce platform with new features.', 'https://example.com/project-image.jpg', 'admin', 'admin', 1, 1, '2025-07-10 07:38:46', '2025-07-10 07:39:44');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL DEFAULT 'user',
  `updated_by` varchar(255) NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `created_by`, `updated_by`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
('47c490d3-2edf-4441-aa79-a6d93ec0f0c2', 'adityapatidar2243@gmail.com', 'user', 'user', 1, 0, '2025-07-10 09:18:43', '2025-07-10 09:18:43'),
('5e2984a3-b9ce-4b63-9062-43c15c975919', 'adityapatidar23243@gmail.com', 'user', 'user', 1, 0, '2025-07-10 09:19:11', '2025-07-10 09:19:11'),
('7e218321-9eaa-4b24-be38-631a84aabbeb', 'subscriber@example.com', 'user', 'user', 0, 0, '2025-07-10 07:41:05', '2025-07-10 07:52:40'),
('836d2d31-f99e-47f5-bfc1-f0e32a95d130', 'aditya.patidarcs2021@indoreinstitute.com', 'user', 'user', 1, 0, '2025-07-10 09:14:56', '2025-07-10 09:14:56'),
('b2234ad0-f3b5-4fa8-b8c5-4ff78bf0aa72', 'adityapatidar243@gmail.com', 'user', 'user', 1, 0, '2025-07-10 09:00:15', '2025-07-10 09:00:15'),
('f00fd169-045c-4d7c-b76c-73193e13df1f', 'adityapatidar232453@gmail.com', 'user', 'user', 1, 0, '2025-07-10 09:20:15', '2025-07-10 09:20:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_is_active_is_deleted` (`is_active`,`is_deleted`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_email` (`email`),
  ADD KEY `contacts_is_active_is_deleted` (`is_active`,`is_deleted`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_is_active_is_deleted` (`is_active`,`is_deleted`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `subscribers_email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD KEY `subscribers_is_active_is_deleted` (`is_active`,`is_deleted`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
