-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: numbat_musical_entrprises
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Guitars and Accessories','2025-04-16T16:57:03.294304600','A classic, versatile electric guitar suitable for all playing styles.','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744792959/npzdwj43rhlaqjoae46t.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744792960/j8kjhrlakxq5zdvf1t4o.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744792961/rlobc1mzeqitquv5jnas.jpg',8500,'P0001','Electric Guitar',2,1),(2,'Amplifiers and Effects','2025-04-16T14:51:44.310905700','A powerful combo amp that delivers iconic tones.\n','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795301/asv3o80mho8s3rauvude.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795302/bl4xbwjibdvrvfc7t9w4.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795304/l3ci7uz7j7jvc05zjx4r.jpg',9500,'P0002','Marshall DSL40CR Tube Amplifier',4,1),(3,'Keyboards and Digital Pianos','2025-04-16T16:08:26.264468100','A compact and portable digital piano with exceptional sound quality.\n','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795361/dq13ognaglg1xslcbhjx.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795362/frrtqhrhqs9rovfrpic8.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795363/tw9smi6gpuoqhusakknh.jpg',100000,'P0003','Yamaha P-125 Digital Piano',1,1),(4,'Drums and Percussion','2025-04-16T14:53:34.786069300','A professional-grade electronic drum set with realistic feel and sounds.\n','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795409/o7zugjxnrkss0oqk37pt.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795411/f1orguzruhfbhrrkdvfo.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795414/b7oribtydq8s7skxv2en.jpg',250000,'P0004','Roland TD-17KVX Electronic Drum Kit',5,1),(5,'Pro Audio Equipment','2025-04-16T14:54:11.244496400','The industry-standard vocal mic for live performances and recordings.','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795448/ufsacmtxhkcvntfcwq8s.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795449/zum0ztweqfjyfyjmoi1r.jpg','http://res.cloudinary.com/ddqccvm2x/image/upload/v1744795450/c6rqjsudg9kmb0zdrkwh.jpg',55000,'P0005','Shure SM58 Microphone',7,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_name` varchar(255) NOT NULL,
  `role_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('Admin','Admin role'),('Customer','Default role for newly created record');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_items`
--

DROP TABLE IF EXISTS `sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `sale_id` varchar(255) DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_items`
--

LOCK TABLES `sale_items` WRITE;
/*!40000 ALTER TABLE `sale_items` DISABLE KEYS */;
INSERT INTO `sale_items` VALUES (1,'P0001',1,'S0001',8500),(2,'P0003',1,'S0002',100000),(3,'P0003',1,'S0003',100000);
/*!40000 ALTER TABLE `sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `qty_tot` int DEFAULT NULL,
  `sale_id` varchar(255) DEFAULT NULL,
  `sold_date` varchar(255) DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,1,'S0001','2025-04-16',8500,'U0002'),(2,1,'S0002','2025-04-16',100000,'U0002'),(3,1,'S0003','2025-04-16',100000,'U0002');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(255) NOT NULL,
  `role_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
  CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_name`),
  CONSTRAINT `FKj345gk1bovqvfame88rcx7yyx` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('admin','Admin'),('kethaka','Customer');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_name` varchar(255) NOT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin',NULL,NULL,NULL,'U0001','$2a$10$0Bw9qTHVukbMBPRmuCwsAuRbA3WVASbWiCMeRPqMS.68OFRfb4SkK'),('kethaka','Kotugoda','admin@gmail.com','0774477984','U0002','$2a$10$0TJ4vagm4B1Qy2e79xAh/eyErcOIaZSsog8Vdlo0qyyCqsE1xVRay');
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

-- Dump completed on 2025-04-16 17:15:39
