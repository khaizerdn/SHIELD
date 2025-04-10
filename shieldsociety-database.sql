CREATE DATABASE IF NOT EXISTS `shieldsociety` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `shieldsociety`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `birthdate` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` enum('superadmin','student','adviser','other') NOT NULL,
  `programYearAndSection` varchar(50) DEFAULT NULL,
  `student_number` varchar(50) DEFAULT NULL,
  `contact_number` varchar(11) NOT NULL,
  `guardians_full_name` varchar(255) DEFAULT NULL,
  `guardians_number` varchar(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_member` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;