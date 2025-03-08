-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: podocenter
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `buys`
--

DROP TABLE IF EXISTS `buys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buys` (
  `idBuys` int NOT NULL AUTO_INCREMENT,
  `idProviders` int DEFAULT NULL,
  `numberCCF` int DEFAULT NULL,
  `ListItems` json DEFAULT NULL,
  `presentation` varchar(45) DEFAULT NULL,
  `cuantity` varchar(45) DEFAULT NULL,
  `totalIVA` float DEFAULT NULL,
  `totalRaw` float DEFAULT NULL,
  `providerRecive` int DEFAULT NULL,
  `ownerRecive` int DEFAULT NULL,
  `idShelf` int DEFAULT NULL,
  PRIMARY KEY (`idBuys`),
  UNIQUE KEY `idBuys_UNIQUE` (`idBuys`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buys`
--

LOCK TABLES `buys` WRITE;
/*!40000 ALTER TABLE `buys` DISABLE KEYS */;
INSERT INTO `buys` VALUES (3,1,323,NULL,'presentation','90',20,20,1,1,1),(4,1,202202,NULL,'presentatnion','20',20,20,1,1,1);
/*!40000 ALTER TABLE `buys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions` (
  `idDivisions` int NOT NULL AUTO_INCREMENT,
  `idItem` int DEFAULT NULL,
  `idShelf` int DEFAULT NULL,
  `full` int DEFAULT NULL,
  PRIMARY KEY (`idDivisions`),
  UNIQUE KEY `idDivisions_UNIQUE` (`idDivisions`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions`
--

LOCK TABLES `divisions` WRITE;
/*!40000 ALTER TABLE `divisions` DISABLE KEYS */;
INSERT INTO `divisions` VALUES (1,1,1,0);
/*!40000 ALTER TABLE `divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `idItem` int NOT NULL AUTO_INCREMENT,
  `comercialName` varchar(45) DEFAULT NULL,
  `principalComponent` varchar(45) DEFAULT NULL,
  `secondaryComponent` varchar(45) DEFAULT NULL,
  `Clasiffication` int DEFAULT NULL,
  `Presentation` int DEFAULT NULL,
  `lot` varchar(45) DEFAULT NULL,
  `expDate` datetime DEFAULT NULL,
  `entryDate` datetime DEFAULT NULL,
  `unit` int DEFAULT NULL,
  `unitCuantity` float DEFAULT NULL,
  `farmacehouse` varchar(45) DEFAULT NULL,
  `chargeAccount` varchar(45) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `creditAccount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idItem`),
  UNIQUE KEY `idItem_UNIQUE` (`idItem`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (2,'acetaminofen','acetaminofenom','acido',2,2,'2','2025-03-14 00:00:00',NULL,3,20,'farmacias uno','2',20,'2'),(3,'acetaminofen','acetaminofenom','acido',3,3,'2','2025-03-14 00:00:00',NULL,1,20,'farmacias uno','2',20,'2'),(4,'acetaminofen','acetaminofenom','acido',3,1,'1','2025-03-14 00:00:00',NULL,2,20,'farmacias uno','2',20,'2'),(5,'acetaminofen','acetaminofenom','acido',1,2,'3','2025-03-14 00:00:00',NULL,3,20,'farmacias uno','2',20,'2'),(7,'acetaminofen','acetaminofenom','acido',2,3,'3','2025-03-14 00:00:00',NULL,1,20,'farmacias uno','2',20,'2'),(8,'acetaminofen','acetaminofenom','acido',3,1,'3','2025-03-14 00:00:00',NULL,2,20,'farmacias uno','2',20,'2'),(9,'acetaminofen','acetaminofenom','acido',1,2,'1','2025-03-14 00:00:00',NULL,3,20,'farmacias uno','2',20,'2'),(10,'acetaminofen','acetaminofenom','acido',2,1,'1','2025-03-14 00:00:00',NULL,1,20,'farmacias uno','2',20,'2'),(11,'acetaminofenssss','acetaminofenom','acido',2,2,'2','2025-03-14 00:00:00',NULL,3,NULL,'farmacias uno',NULL,20,NULL),(12,'acetaminofenssssdd','acetaminofenoms','acidos',1,3,'1','2025-03-14 00:00:00',NULL,3,NULL,'farmacias unod',NULL,20,NULL),(13,'acetaminofen','acetaminofenom','acido',2,2,'2','2025-03-14 00:00:00',NULL,3,NULL,'farmacias uno',NULL,20,NULL),(17,'acetaminofen','acetaminofenom','acido',2,2,'2','2025-03-04 00:00:00',NULL,3,NULL,'farmacias uno',NULL,20,NULL),(18,'acetaminofen','acetaminofenom','acido',2,2,'2','2025-03-14 00:00:00',NULL,3,NULL,'farmacias uno',NULL,20,NULL),(19,'metrocarbamol','metro','cabamol',1,2,'1','2025-03-29 00:00:00',NULL,1,NULL,'farma','2',20,'2');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `idProviders` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `branch` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `localContact` varchar(45) DEFAULT NULL,
  `MovilContact` varchar(45) DEFAULT NULL,
  `mainEmail` varchar(45) DEFAULT NULL,
  `NIT` varchar(45) DEFAULT NULL,
  `legalRepresentative` varchar(45) DEFAULT NULL,
  `secondaryEmail` varchar(45) DEFAULT NULL,
  `NCR` varchar(45) DEFAULT NULL,
  `state` tinyint DEFAULT NULL,
  PRIMARY KEY (`idProviders`),
  UNIQUE KEY `idProviders_UNIQUE` (`idProviders`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'nombre','direccion','2','23223','232323','2323','correo','nit','legal repre','secondary email','123123',2),(2,'My Software','direccion',NULL,'12','322','1231','direccion2','','','direciion3','',NULL),(3,'My Software','direccion',NULL,'12','322','1231','direccion2','','leagl','direciion3','2131',NULL),(4,'My Software','direccion',NULL,'12','322','1231','direccion2','32131','leagl','direciion3','2131',NULL);
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `rolName` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `serviceUnit` varchar(45) DEFAULT NULL,
  `cosPerServiceUnit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE KEY `idRol_UNIQUE` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'admin','admin position ','10','20');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `idService` int NOT NULL AUTO_INCREMENT,
  `state` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `idSpace` int DEFAULT NULL,
  `TotalPrice` float DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `ListItems` json DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idService`),
  UNIQUE KEY `idService_UNIQUE` (`idService`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,1,'proceso1',NULL,20,NULL,NULL,1,NULL),(2,2,'proceso12',NULL,20,NULL,NULL,1,NULL),(3,3,'proceso13',NULL,20,NULL,NULL,1,NULL),(4,2,'4',NULL,20,NULL,NULL,1,NULL),(5,1,'proceso15',NULL,20,NULL,NULL,1,NULL),(6,1,'proceso16',NULL,20,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shelf`
--

DROP TABLE IF EXISTS `shelf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelf` (
  `idShelf` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `levelsNumber` float NOT NULL,
  `divisionsNumber` float DEFAULT NULL,
  `label` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `idStorage` int DEFAULT NULL,
  `full` int DEFAULT NULL,
  PRIMARY KEY (`idShelf`),
  UNIQUE KEY `idShelf_UNIQUE` (`idShelf`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelf`
--

LOCK TABLES `shelf` WRITE;
/*!40000 ALTER TABLE `shelf` DISABLE KEYS */;
INSERT INTO `shelf` VALUES (1,'nombre',1,2,'1','descr',1,0),(2,'nombre',2,2,'1','descr',2,0),(3,'nombre',4,2,'1','descr',3,0),(4,'nombre',5,2,'1','descr',4,0),(5,'nombre',6,2,'1','descr',5,0),(6,'nombre',7,2,'1','descr',6,0);
/*!40000 ALTER TABLE `shelf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spaces`
--

DROP TABLE IF EXISTS `spaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spaces` (
  `idSpaces` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `unitService` int DEFAULT NULL,
  `costUnitService` float DEFAULT NULL,
  `state` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `dateFinish` datetime DEFAULT NULL,
  PRIMARY KEY (`idSpaces`),
  UNIQUE KEY `idSpaces_UNIQUE` (`idSpaces`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spaces`
--

LOCK TABLES `spaces` WRITE;
/*!40000 ALTER TABLE `spaces` DISABLE KEYS */;
INSERT INTO `spaces` VALUES (1,'nombre',20,20,0,NULL,NULL),(2,'nombre',20,20,0,NULL,NULL),(3,'nombre',20,20,0,NULL,NULL),(4,'nombre',20,20,0,NULL,NULL),(5,'nombre',20,20,0,NULL,NULL);
/*!40000 ALTER TABLE `spaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `idStorage` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `tags` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idStorage`),
  UNIQUE KEY `idStorage_UNIQUE` (`idStorage`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (1,'sd','1','dfs'),(2,'idform','2','hola'),(3,'idform','2','hola'),(4,'asdf','asdf','asd'),(5,'as','as',''),(6,'as','as',''),(7,'s','s','s');
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `idRol` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lasName` varchar(45) DEFAULT NULL,
  `countCharge` varchar(45) DEFAULT NULL,
  `countSavings` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUser_UNIQUE` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Luis','123','1','Luis','Martinez','20','1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07 18:45:11
