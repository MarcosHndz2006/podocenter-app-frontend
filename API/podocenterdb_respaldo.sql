-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: podocenterdb
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `almacen`
--

DROP TABLE IF EXISTS `almacen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `almacen` (
  `id_almacen` int NOT NULL AUTO_INCREMENT,
  `nombre_almacen` varchar(45) NOT NULL,
  `ubicacion` varchar(45) DEFAULT NULL,
  `etiquetas` varchar(45) DEFAULT NULL,
  `lleno` int NOT NULL,
  PRIMARY KEY (`id_almacen`),
  UNIQUE KEY `id_almacen_UNIQUE` (`id_almacen`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almacen`
--

LOCK TABLES `almacen` WRITE;
/*!40000 ALTER TABLE `almacen` DISABLE KEYS */;
INSERT INTO `almacen` VALUES (1,'Almacén A','norte del edificio',NULL,0),(2,'Almacén B','norte del edificio',NULL,0),(3,'Almacén C','sur del edificio',NULL,0),(4,'Almacén D','este del edificio',NULL,0);
/*!40000 ALTER TABLE `almacen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `casa_farmaceutica`
--

DROP TABLE IF EXISTS `casa_farmaceutica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casa_farmaceutica` (
  `id_casa_farmaceutica` int NOT NULL AUTO_INCREMENT,
  `nombre_casa_farmaceutica` varchar(45) NOT NULL,
  PRIMARY KEY (`id_casa_farmaceutica`),
  UNIQUE KEY `id_casa_farmaceutica_UNIQUE` (`id_casa_farmaceutica`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `casa_farmaceutica`
--

LOCK TABLES `casa_farmaceutica` WRITE;
/*!40000 ALTER TABLE `casa_farmaceutica` DISABLE KEYS */;
INSERT INTO `casa_farmaceutica` VALUES (1,'Laboratorio Falmar'),(2,'Laboratorios Fardel'),(3,'Laboratorios Suizos S.A. de C.V.'),(4,'Laboratorios Generix S.A. de C.V.'),(5,'PHARMAPEC'),(6,'Laboratorios Radón');
/*!40000 ALTER TABLE `casa_farmaceutica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasificacion_producto`
--

DROP TABLE IF EXISTS `clasificacion_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clasificacion_producto` (
  `id_clasificacion_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_clasificacion_producto` varchar(45) NOT NULL,
  PRIMARY KEY (`id_clasificacion_producto`),
  UNIQUE KEY `id_clasificacion_producto_UNIQUE` (`id_clasificacion_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasificacion_producto`
--

LOCK TABLES `clasificacion_producto` WRITE;
/*!40000 ALTER TABLE `clasificacion_producto` DISABLE KEYS */;
INSERT INTO `clasificacion_producto` VALUES (1,'dispositivo médico'),(2,'material fungible'),(3,'equipamiento médico'),(4,'producto de alto riesgo'),(5,'producto de bajo riesgo'),(6,'suministro de emergencia');
/*!40000 ALTER TABLE `clasificacion_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasificacion_servicio`
--

DROP TABLE IF EXISTS `clasificacion_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clasificacion_servicio` (
  `id_clasificacion_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre_clasificacion_servicio` varchar(45) NOT NULL,
  PRIMARY KEY (`id_clasificacion_servicio`),
  UNIQUE KEY `id_clasificacion_servicio_UNIQUE` (`id_clasificacion_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasificacion_servicio`
--

LOCK TABLES `clasificacion_servicio` WRITE;
/*!40000 ALTER TABLE `clasificacion_servicio` DISABLE KEYS */;
INSERT INTO `clasificacion_servicio` VALUES (1,'primario'),(2,'secundario'),(3,'terciario');
/*!40000 ALTER TABLE `clasificacion_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_compra`
--

DROP TABLE IF EXISTS `doc_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_compra` (
  `id_doc_compra` int NOT NULL AUTO_INCREMENT,
  `numero_ccf` varchar(45) DEFAULT NULL,
  `presentacion` varchar(45) NOT NULL,
  `cantidad` int NOT NULL,
  `monto_bruto` float NOT NULL,
  `monto_iva` float NOT NULL,
  `ubicacion` varchar(45) DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `id_proveedor` int NOT NULL,
  `excento_retenido` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_doc_compra`),
  UNIQUE KEY `id_doc_compra_UNIQUE` (`id_doc_compra`),
  KEY `fk_id_usuario_idx` (`id_usuario`),
  KEY `fk_id_proveedor_idx` (`id_proveedor`),
  CONSTRAINT `fk_id_proveedor_compra` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`),
  CONSTRAINT `fk_id_usuario_compra` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_compra`
--

LOCK TABLES `doc_compra` WRITE;
/*!40000 ALTER TABLE `doc_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_compraxalmacen`
--

DROP TABLE IF EXISTS `doc_compraxalmacen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_compraxalmacen` (
  `id_doc_compraxalmacen` int NOT NULL AUTO_INCREMENT,
  `id_almacen` int NOT NULL,
  `id_doc_compra` int NOT NULL,
  PRIMARY KEY (`id_doc_compraxalmacen`),
  UNIQUE KEY `id_doc_compraxalmacen_UNIQUE` (`id_doc_compraxalmacen`),
  KEY `fk_id_almacen_compra_idx` (`id_almacen`),
  KEY `fk_id_doc_compra_idx` (`id_doc_compra`),
  CONSTRAINT `fk_id_almacen_compra` FOREIGN KEY (`id_almacen`) REFERENCES `almacen` (`id_almacen`),
  CONSTRAINT `fk_id_doc_compra` FOREIGN KEY (`id_doc_compra`) REFERENCES `doc_compra` (`id_doc_compra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_compraxalmacen`
--

LOCK TABLES `doc_compraxalmacen` WRITE;
/*!40000 ALTER TABLE `doc_compraxalmacen` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_compraxalmacen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_compraxproducto`
--

DROP TABLE IF EXISTS `doc_compraxproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_compraxproducto` (
  `id_doc_compraxproducto` int NOT NULL AUTO_INCREMENT,
  `id_doc_compra` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_doc_compraxproducto`),
  UNIQUE KEY `id_doc_compraxproducto_UNIQUE` (`id_doc_compraxproducto`),
  KEY `fk_id_doc_compra_idx` (`id_doc_compra`),
  KEY `fk_id_producto_idx` (`id_producto`),
  CONSTRAINT `fk_id_doc_compraxproducto` FOREIGN KEY (`id_doc_compra`) REFERENCES `doc_compra` (`id_doc_compra`),
  CONSTRAINT `fk_id_productoxdoc_compra` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_compraxproducto`
--

LOCK TABLES `doc_compraxproducto` WRITE;
/*!40000 ALTER TABLE `doc_compraxproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_compraxproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_venta`
--

DROP TABLE IF EXISTS `doc_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_venta` (
  `id_doc_venta` int NOT NULL AUTO_INCREMENT,
  `numero_ccf` varchar(45) NOT NULL,
  `cantidad` int DEFAULT NULL,
  `monto_bruto` float DEFAULT NULL,
  `monto_iva` float DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_doc_venta`),
  UNIQUE KEY `id_doc_venta_UNIQUE` (`id_doc_venta`),
  KEY `fk_id_usuario_idx` (`id_usuario`),
  CONSTRAINT `fk_id_usuario_doc_venta` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_venta`
--

LOCK TABLES `doc_venta` WRITE;
/*!40000 ALTER TABLE `doc_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_ventaxitem_venta`
--

DROP TABLE IF EXISTS `doc_ventaxitem_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_ventaxitem_venta` (
  `id_doc_ventaxitem_venta` int NOT NULL AUTO_INCREMENT,
  `id_doc_venta` int NOT NULL,
  `id_item_venta` int NOT NULL,
  PRIMARY KEY (`id_doc_ventaxitem_venta`),
  UNIQUE KEY `id_doc_ventaxitem_venta_UNIQUE` (`id_doc_ventaxitem_venta`),
  KEY `fk_id_doc_venta_idx` (`id_doc_venta`),
  KEY `fk_id_item_venta_idx` (`id_item_venta`),
  CONSTRAINT `fk_id_doc_venta` FOREIGN KEY (`id_doc_venta`) REFERENCES `doc_venta` (`id_doc_venta`),
  CONSTRAINT `fk_id_item_venta` FOREIGN KEY (`id_item_venta`) REFERENCES `item_venta` (`id_item_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_ventaxitem_venta`
--

LOCK TABLES `doc_ventaxitem_venta` WRITE;
/*!40000 ALTER TABLE `doc_ventaxitem_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_ventaxitem_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `espacio`
--

DROP TABLE IF EXISTS `espacio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `espacio` (
  `id_espacio` int NOT NULL AUTO_INCREMENT,
  `nombre_espacio` varchar(45) NOT NULL,
  `unidad_servicio_espacio` varchar(45) DEFAULT NULL,
  `costo_unidad_servicio_espacio` varchar(45) DEFAULT NULL,
  `cuenta_cargo` varchar(45) DEFAULT NULL,
  `cuenta_abono` varchar(45) DEFAULT NULL,
  `estado_espacio` int NOT NULL,
  PRIMARY KEY (`id_espacio`),
  UNIQUE KEY `id_espacio_UNIQUE` (`id_espacio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espacio`
--

LOCK TABLES `espacio` WRITE;
/*!40000 ALTER TABLE `espacio` DISABLE KEYS */;
INSERT INTO `espacio` VALUES (1,'sala general','1 h','10.0',NULL,NULL,0),(2,'sala norte ','1 h ','5.0',NULL,NULL,0),(3,'sala sur ','2 h','5.0',NULL,NULL,0),(4,'sala este ','3 h','2.0',NULL,NULL,0),(5,'sala oeste ','2 h','10.0',NULL,NULL,0);
/*!40000 ALTER TABLE `espacio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estante`
--

DROP TABLE IF EXISTS `estante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estante` (
  `id_estante` int NOT NULL AUTO_INCREMENT,
  `nombre_estante` varchar(45) NOT NULL,
  `niveles` int NOT NULL,
  `divisiones` varchar(45) DEFAULT NULL,
  `etiquetas` varchar(45) DEFAULT NULL,
  `lleno` int NOT NULL,
  `id_almacen` int NOT NULL,
  PRIMARY KEY (`id_estante`),
  UNIQUE KEY `id_estante_UNIQUE` (`id_estante`),
  KEY `fk_id_almacen_idx` (`id_almacen`),
  CONSTRAINT `fk_id_almacen` FOREIGN KEY (`id_almacen`) REFERENCES `almacen` (`id_almacen`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estante`
--

LOCK TABLES `estante` WRITE;
/*!40000 ALTER TABLE `estante` DISABLE KEYS */;
INSERT INTO `estante` VALUES (1,'A-1',4,'3',NULL,0,1),(2,'A-2',5,'3',NULL,0,1),(3,'A-3',4,'3',NULL,0,1),(4,'A-4',5,'3',NULL,0,1),(5,'A-5',6,'4',NULL,0,1),(6,'B-1',4,'4',NULL,0,2),(7,'B-2',5,'5',NULL,0,2),(8,'C-1',5,'5',NULL,0,3),(9,'C-2',5,'5',NULL,0,3),(10,'C-3',5,'5',NULL,0,3),(11,'D-1',4,'4',NULL,0,4),(12,'D-2',4,'4',NULL,0,4),(13,'D-3',4,'5','',0,4);
/*!40000 ALTER TABLE `estante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoja_costo`
--

DROP TABLE IF EXISTS `hoja_costo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoja_costo` (
  `id_hoja_costo` int NOT NULL AUTO_INCREMENT,
  `id_servicio` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_hoja_costo`),
  UNIQUE KEY `id_hoja_costo_UNIQUE` (`id_hoja_costo`),
  KEY `fk_id_servicio_idx` (`id_servicio`),
  KEY `fk_id_producto_idx` (`id_producto`),
  CONSTRAINT `fk_id_producto_hoja_costo` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_id_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoja_costo`
--

LOCK TABLES `hoja_costo` WRITE;
/*!40000 ALTER TABLE `hoja_costo` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoja_costo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_venta`
--

DROP TABLE IF EXISTS `item_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_venta` (
  `id_item_venta` int NOT NULL AUTO_INCREMENT,
  `nombre_item_venta` varchar(45) NOT NULL,
  `unidad` varchar(45) DEFAULT NULL,
  `total_costo` float DEFAULT NULL,
  `impuesto` float DEFAULT NULL,
  `aportacion` varchar(45) DEFAULT NULL,
  `precio_venta` float DEFAULT NULL,
  `id_hoja_costo` int NOT NULL,
  PRIMARY KEY (`id_item_venta`),
  UNIQUE KEY `id_hoja_costo_UNIQUE` (`id_item_venta`),
  KEY `fk_id_hoja_costo_idx` (`id_hoja_costo`),
  CONSTRAINT `fk_id_hoja_costo` FOREIGN KEY (`id_hoja_costo`) REFERENCES `hoja_costo` (`id_hoja_costo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_venta`
--

LOCK TABLES `item_venta` WRITE;
/*!40000 ALTER TABLE `item_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_comercial` varchar(45) NOT NULL,
  `componente_principal` varchar(45) NOT NULL,
  `componente_secundario` varchar(45) DEFAULT NULL,
  `vencimiento` date NOT NULL,
  `lote` varchar(45) NOT NULL,
  `existencias` int NOT NULL,
  `precio_unitario` float NOT NULL,
  `presentacion` varchar(45) NOT NULL,
  `cuenta_cargo` varchar(45) DEFAULT NULL,
  `id_unidad` int NOT NULL,
  `id_estante` int NOT NULL,
  `id_clasificacion_producto` int NOT NULL,
  `id_casa_farmaceutica` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `id_producto_UNIQUE` (`id_producto`),
  KEY `fk_id_unidad_idx` (`id_unidad`),
  KEY `fk_id_estante_idx` (`id_estante`),
  KEY `fk_id_casa_farmaceutica_idx` (`id_casa_farmaceutica`),
  KEY `fk_id_clasificacion_producto_idx` (`id_clasificacion_producto`),
  CONSTRAINT `fk_id_casa_farmaceutica` FOREIGN KEY (`id_casa_farmaceutica`) REFERENCES `casa_farmaceutica` (`id_casa_farmaceutica`),
  CONSTRAINT `fk_id_clasificacion_producto` FOREIGN KEY (`id_clasificacion_producto`) REFERENCES `clasificacion_producto` (`id_clasificacion_producto`),
  CONSTRAINT `fk_id_estante` FOREIGN KEY (`id_estante`) REFERENCES `estante` (`id_estante`),
  CONSTRAINT `fk_id_unidad` FOREIGN KEY (`id_unidad`) REFERENCES `unidad` (`id_unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Acetaminofen','Ciprofloxacina','Ranitidina','2026-08-20','12521',20,1.2,'caja (10 blisters)',NULL,1,1,1,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` varchar(45) NOT NULL,
  `direccion_legal` varchar(45) NOT NULL,
  `direccion_sucursal` varchar(45) DEFAULT NULL,
  `contacto` varchar(45) NOT NULL,
  `contacto_local` varchar(45) DEFAULT NULL,
  `contacto_movil` varchar(45) DEFAULT NULL,
  `correo_1` varchar(45) NOT NULL,
  `correo_2` varchar(45) DEFAULT NULL,
  `representante_legal` varchar(45) DEFAULT NULL,
  `ncr` varchar(45) NOT NULL,
  `nit` varchar(45) NOT NULL,
  PRIMARY KEY (`id_proveedor`),
  UNIQUE KEY `id_proveedor_UNIQUE` (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedorxproducto`
--

DROP TABLE IF EXISTS `proveedorxproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedorxproducto` (
  `id_proveedorxproducto` int NOT NULL AUTO_INCREMENT,
  `id_proveedor` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_proveedorxproducto`),
  UNIQUE KEY `id_proveedorxproducto_UNIQUE` (`id_proveedorxproducto`),
  KEY `fk_id_proveedor_idx` (`id_proveedor`),
  KEY `fk_id_producto_idx` (`id_producto`),
  CONSTRAINT `fk_id_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_id_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedorxproducto`
--

LOCK TABLES `proveedorxproducto` WRITE;
/*!40000 ALTER TABLE `proveedorxproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedorxproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_puesto` varchar(45) NOT NULL,
  `unidad_servicio` varchar(45) NOT NULL,
  `costo_unidad_servicio` varchar(45) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `id_rol_UNIQUE` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'administrador','2 h','20.0'),(2,'médico/profesional','4 h','15.0'),(3,'secretario/a','3 h','12.0'),(4,'proveedor','3 h','13.0');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicio` (
  `id_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre_servicio` varchar(45) NOT NULL,
  `unidad_servicio` varchar(45) DEFAULT NULL,
  `precio_unitario` float DEFAULT NULL,
  `cuenta_cargo` varchar(45) DEFAULT NULL,
  `cuenta_abono` varchar(45) DEFAULT NULL,
  `id_espacio` int NOT NULL,
  `id_clasificacion_servicio` int NOT NULL,
  `id_subclasificacion_servicio` int NOT NULL,
  `id_usuario` int NOT NULL,
  `estado_servicio` int NOT NULL,
  PRIMARY KEY (`id_servicio`),
  UNIQUE KEY `id_servicio_UNIQUE` (`id_servicio`),
  KEY `fk_id_espacio_idx` (`id_espacio`),
  KEY `fk_id_clasificacion_servicio_idx` (`id_clasificacion_servicio`),
  KEY `fk_id_subclasificacion_servicio_idx` (`id_subclasificacion_servicio`),
  KEY `fk_id_usuario_idx` (`id_usuario`),
  CONSTRAINT `fk_id_clasificacion_servicio` FOREIGN KEY (`id_clasificacion_servicio`) REFERENCES `clasificacion_servicio` (`id_clasificacion_servicio`),
  CONSTRAINT `fk_id_espacio` FOREIGN KEY (`id_espacio`) REFERENCES `espacio` (`id_espacio`),
  CONSTRAINT `fk_id_subclasificacion_servicio` FOREIGN KEY (`id_subclasificacion_servicio`) REFERENCES `subclasificacion_servicio` (`id_subclasificacion_servicio`),
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
INSERT INTO `servicio` VALUES (1,'Curación','2 h',15,NULL,NULL,1,1,2,4,0),(2,'Cirugía ','3 h',25,NULL,NULL,2,2,2,4,0);
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subclasificacion_servicio`
--

DROP TABLE IF EXISTS `subclasificacion_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subclasificacion_servicio` (
  `id_subclasificacion_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre_subclasificacion_servicio` varchar(45) NOT NULL,
  PRIMARY KEY (`id_subclasificacion_servicio`),
  UNIQUE KEY `id_subclasificacion_servicio_UNIQUE` (`id_subclasificacion_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subclasificacion_servicio`
--

LOCK TABLES `subclasificacion_servicio` WRITE;
/*!40000 ALTER TABLE `subclasificacion_servicio` DISABLE KEYS */;
INSERT INTO `subclasificacion_servicio` VALUES (1,'medicina general'),(2,'vacunación'),(3,'servicio de enfermería'),(4,'neurología'),(5,'anestesia'),(6,'cirugía'),(7,'rehabilitación'),(8,'prevención');
/*!40000 ALTER TABLE `subclasificacion_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad`
--

DROP TABLE IF EXISTS `unidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad` (
  `id_unidad` int NOT NULL AUTO_INCREMENT,
  `nombre_unidad` varchar(45) NOT NULL,
  PRIMARY KEY (`id_unidad`),
  UNIQUE KEY `id_unidad_UNIQUE` (`id_unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
INSERT INTO `unidad` VALUES (1,'gramos (g)'),(2,'miligramos (mg)'),(3,'litros (L)'),(4,'mililitros (mL)'),(5,'cucharada/s (cda)'),(6,'cucharadita/s (cdita) '),(7,'gota/s');
/*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `cuenta_abono` varchar(45) DEFAULT NULL,
  `cuenta_cargo` varchar(45) DEFAULT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_id_rol_idx` (`id_rol`),
  CONSTRAINT `fk_id_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Enrique ','Interiano','einteriano','1234',NULL,NULL,1),(2,'Marcos ','Hernández','mhernandez','12345',NULL,NULL,1),(3,'Heribeto ','Olivares','holivares','123',NULL,NULL,1),(4,'José ','Peña','jpeña','1234',NULL,NULL,2),(5,'María ','Renderos','mrenderos','123',NULL,NULL,3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-29 21:53:22
