CREATE DATABASE  IF NOT EXISTS `node_test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `node_test`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: node_test
-- ------------------------------------------------------
-- Server version	5.1.73-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float(14,2) NOT NULL,
  `description` text NOT NULL,
  `uuid` char(36) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `products` (`user_id`),
  CONSTRAINT `products` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,'Nike Tiempo Red',1499.00,'For street and outdoor football, strong and live long. One of the most popuplar Nike football shoes series.','1ff07607-ce7a-11e5-a49b-c4b43b097c55',6),(5,'Nike Tiempo Blue',1499.00,'For street and outdoor football, strong and live long. One of the most popuplar Nike football shoes series.','3c11e34e-ce7b-11e5-a49b-c4b43b097c55',6),(6,'Nike Tiempo Black/Green',1499.00,'For street and outdoor football, strong and live long. One of the most popuplar Nike football shoes series.','54da9914-ce9a-11e5-a49b-c4b43b097c55',6),(10,'Nike Mercurial',1099.00,'Have lightweight, comfortable, nice for playing outdoor football, but bad quality.','f99d922c-ce9a-11e5-a49b-c4b43b097c55',6),(13,'Nike 5 Elastico',699.00,'First tries to make good indoor shoes.','9498e4b8-ce9c-11e5-a49b-c4b43b097c55',6),(14,'Nike 5 Elastico II',749.00,'Next generation on elastico series.','9efb1ee4-cf25-11e5-a905-d43aa58bc94d',6),(15,'Nike 5 elastico PRO',999.00,'The final version of elastico seris. One of the best models for indoor at moment they released.','19b85c1c-cf2c-11e5-a905-d43aa58bc94d',6),(19,'Nike Gato',1299.00,'New generation of indoor football shoes. With big sole, which warns against injury ankle.','da2acc0c-cf47-11e5-a905-d43aa58bc94d',6),(20,'Nike LunarGato',1699.00,'This model, is the new version of Gato, they looks the same, but: LunarGato have new material in sole, which reduces the load on the knee, because of its good amortization. Recommend. ','0a481e52-cf4a-11e5-a905-d43aa58bc94d',6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(25) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` char(60) NOT NULL,
  `uuid` char(36) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Nik','Belonovych','+380683328045','557forever@gmail.com','$2a$10$12XT2HYZEHSxYJ1iWU2A.uVFdKlc7T5FZgO6600d1aOpCSj1UJ.9q','c7dd00dd-cce7-11e5-8a56-5af1aa7f7ef8','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-10 15:19:05
