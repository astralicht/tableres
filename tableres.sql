-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2024 at 03:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tableres`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `guests_num` int(11) NOT NULL DEFAULT 1,
  `res_date` date DEFAULT NULL,
  `timeslot_id` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT current_timestamp(),
  `date_removed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `code`, `user_id`, `name`, `email`, `phone`, `guests_num`, `res_date`, `timeslot_id`, `date_added`, `date_removed`) VALUES
(1, '61137d', NULL, 'a', 'a@a', NULL, 2353565, '2024-11-28', 1, '2024-10-26 03:49:13', NULL),
(3, '611388', NULL, 'a', 'a@a', NULL, 2353565, '2024-11-27', 3, '2024-11-27 11:30:03', NULL),
(4, '611387', NULL, 'a', 'a@a', NULL, 2353565, '2024-11-27', 3, '2024-11-27 11:38:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `timeslots`
--

CREATE TABLE `timeslots` (
  `id` int(11) NOT NULL,
  `timeslot` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timeslots`
--

INSERT INTO `timeslots` (`id`, `timeslot`) VALUES
(1, '06:00:00'),
(2, '07:00:00'),
(3, '08:00:00'),
(4, '09:00:00'),
(5, '10:00:00'),
(6, '11:00:00'),
(7, '12:00:00'),
(8, '13:00:00'),
(9, '14:00:00'),
(10, '15:00:00'),
(11, '16:00:00'),
(12, '17:00:00'),
(13, '18:00:00'),
(14, '19:00:00'),
(15, '20:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `type` int(1) DEFAULT 3,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `date_removed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `phone`, `type`, `date_added`, `date_removed`) VALUES
(1, 'admin', '$2y$10$a64WrFZB7hm5ZA93DkQYcOM8AwJrCv54sMvWiGhNFIIN4yMfzMD/q', NULL, NULL, NULL, 1, '2024-10-16 18:30:24', NULL),
(2, 'user1', '$2y$10$qADfhpec4osqJda8RGL/zOkAtTCa0i6eqCReRUyMIz5zlPGoaqnxW', NULL, 'email@email.com', NULL, 3, '2024-11-27 12:17:32', NULL),
(3, 'user2', '$2y$10$rdj/4xpEM/tiKflsFmU95OtU0L.CrvSBG1VlbGOnEyqrKNF8wByju', 'user2', 'email2@email.com', NULL, 3, '2024-11-27 12:19:01', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeslots`
--
ALTER TABLE `timeslots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
