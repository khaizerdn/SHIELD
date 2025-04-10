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

INSERT INTO `users` (`id`, `first_name`, `last_name`, `middle_name`, `gender`, `birthdate`, `address`, `role`, `programYearAndSection`, `student_number`, `contact_number`, `guardians_full_name`, `guardians_number`, `email`, `password`, `created_at`, `is_member`) VALUES
(7, 'Jollibee', 'Noguera', 'Dominguez', 'Male', '2021-01-01', 'Asadasd asdasd ad asdadadadsadadadada', 'superadmin', NULL, NULL, '09356423138', NULL, NULL, 'jollibee@gmail.com', '$2b$10$3OmGs/JNvyyobwKjX.JIgexk75qQswqFiSTG6miFnN7Gtimd7viAW', '2024-12-23 23:31:20', 0),
(9, 'Macdo', 'Noguera', 'Dominguez', 'Male', '2021-01-01', 'Asadasd asdasd ad asdadadadsadadadada', 'student', NULL, NULL, '09356423138', NULL, NULL, 'jollibee@gmail.com', '$2b$10$3OmGs/JNvyyobwKjX.JIgexk75qQswqFiSTG6miFnN7Gtimd7viAW', '2024-12-23 23:31:20', 0),
(12, 'John', 'Doe', 'Stellar', 'Male', '2004-01-19', 'This is my address.', 'adviser', 'BSCpE 4B', '210100105', '09356423138', 'Mark Doe', '09356223166', 'cc.khaizer.noguera@cvsu.edu.ph', '$2b$10$CsRpXDQ0qB1cc1R1NvV6Mu5uDQuG.J7mhlwDsKvdDG4kW/zpNcihC', '2025-01-16 02:44:54', 0);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;