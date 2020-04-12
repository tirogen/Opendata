-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2020 at 06:06 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opendata`
--

-- --------------------------------------------------------

--
-- Table structure for table `covid19`
--

CREATE TABLE `covid19` (
  `id` int(10) UNSIGNED NOT NULL,
  `no` int(10) UNSIGNED DEFAULT NULL,
  `age` tinyint(3) UNSIGNED DEFAULT NULL,
  `sex` enum('หญิง','ชาย') DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `province_isolation` varchar(255) DEFAULT NULL,
  `notification_date` timestamp NULL DEFAULT NULL,
  `announce_date` timestamp NULL DEFAULT NULL,
  `province_onset` varchar(255) DEFAULT NULL,
  `district_onset` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `fish`
--

CREATE TABLE `fish` (
  `id` int(10) UNSIGNED NOT NULL,
  `no` int(10) UNSIGNED DEFAULT NULL,
  `kind` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `local_name` varchar(255) DEFAULT NULL,
  `common_name` varchar(255) DEFAULT NULL,
  `scientific_name` varchar(255) DEFAULT NULL,
  `family_name` varchar(255) DEFAULT NULL,
  `public_year` varchar(255) DEFAULT NULL,
  `biology` varchar(255) DEFAULT NULL,
  `habitat` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `image_source` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `image_path_small` varchar(255) DEFAULT NULL,
  `image_path_big` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `covid19`
--
ALTER TABLE `covid19`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fish`
--
ALTER TABLE `fish`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `covid19`
--
ALTER TABLE `covid19`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fish`
--
ALTER TABLE `fish`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
