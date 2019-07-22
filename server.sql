CREATE DATABASE IF NOT EXISTS `school` DEFAULT CHARACTER SET utf8;
USE `school`;

CREATE TABLE IF NOT EXISTS `accounts` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`email` varchar(100) NOT NULL,
`password` varchar(200) NOT NULL,
PRIMARY KEY(`id`)
);