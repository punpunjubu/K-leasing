-- MariaDB dump 10.19  Distrib 10.10.2-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: k_leasing_2_db
-- ------------------------------------------------------
-- Server version	10.10.2-MariaDB-1:10.10.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dealer_condition`
--

DROP TABLE IF EXISTS `dealer_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealer_condition` (
  `dealer_condition_id` varchar(30) NOT NULL,
  `dealer_condition_dealer_code` varchar(45) DEFAULT NULL,
  `dealer_condition_dealer_name` varchar(200) DEFAULT NULL,
  `dealer_condition_franchise` varchar(100) DEFAULT NULL,
  `dealer_condition_loan_type` varchar(45) DEFAULT NULL,
  `dealer_condition_register_address` varchar(200) DEFAULT NULL,
  `dealer_condition_email` varchar(200) DEFAULT NULL,
  `dealer_condition_type_curtailment` varchar(45) DEFAULT NULL,
  `dealer_condition_grace_period` varchar(45) DEFAULT NULL,
  `dealer_condition_nor_rate_type` varchar(45) DEFAULT NULL,
  `dealer_condition_nor_rate` varchar(45) DEFAULT NULL,
  `dealer_condition_create_at` datetime DEFAULT NULL,
  `dealer_condition_create_by` varchar(20) DEFAULT NULL,
  `dealer_condition_update_at` datetime DEFAULT NULL,
  `dealer_condition_update_by` varchar(20) DEFAULT NULL,
  `startdate_1` varchar(45) DEFAULT NULL,
  `enddate_1` varchar(45) DEFAULT NULL,
  `nor_ratetype_1` varchar(45) DEFAULT NULL,
  `nor_rate_1` varchar(45) DEFAULT NULL,
  `startdate_2` varchar(45) DEFAULT NULL,
  `enddate_2` varchar(45) DEFAULT NULL,
  `nor_ratetype_2` varchar(45) DEFAULT NULL,
  `nor_rate_2` varchar(45) DEFAULT NULL,
  `startdate_3` varchar(45) DEFAULT NULL,
  `enddate_3` varchar(45) DEFAULT NULL,
  `nor_ratetype_3` varchar(45) DEFAULT NULL,
  `nor_rate_3` varchar(45) DEFAULT NULL,
  `startdate_4` varchar(45) DEFAULT NULL,
  `enddate_4` varchar(45) DEFAULT NULL,
  `nor_ratetype_4` varchar(45) DEFAULT NULL,
  `nor_rate_4` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`dealer_condition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealer_condition`
--

LOCK TABLES `dealer_condition` WRITE;
/*!40000 ALTER TABLE `dealer_condition` DISABLE KEYS */;
INSERT INTO `dealer_condition` VALUES
('1673187223-22ffd3e6f5','V1013001',NULL,'FOTON TRUCK','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','5','0','MLR','0.37','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','',''),
('1673187223-24afcea545','H1065',NULL,'HONDA','LOAN',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','5','0','MLR','-3.1','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'1','15','MLR','0','16','30','MLR','-0.05','','','','','','','',''),
('1673187223-36fc530844','H1133',NULL,'HONDA','LOAN',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','5','0','MLR','-3.1','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'1','15','MLR','0','16','20','MLR','-0.05','21','30','MLR','-1','','','',''),
('1673187223-6281a0c535','M6026002',NULL,'MG','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','3','0','MLR','-0.38','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','',''),
('1673187223-6316690d5e','M6030',NULL,'MG','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','3','0','MLR','0.02','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','',''),
('1673187223-838157cc91','H1143',NULL,'HONDA','LOAN',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','5','0','MLR','-3.1','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'1','15','MLR','0','16','18','MLR','-0.05','19','25','MLR','-1','26','30','MLR','-1.5'),
('1673187223-8718888403','M6026003',NULL,'MG','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','3','0','MLR','-0.38','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','',''),
('1673187223-ad3089c97b','M6030.',NULL,'MG','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','3','0','MLR','0.02','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','',''),
('1673187223-d57c7dcd8d','M6026',NULL,'MG','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','3','0','MLR','-0.38','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','',''),
('1673187223-ec77fbc53e','M6026004',NULL,'MG','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','3','0','MLR','-0.38','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','',''),
('1673187223-f3eabac962','M6030003',NULL,'MG','INVENTORY',NULL,'ratri.j@Kasikornleasing.com ; sutida.ki@kasikornleasing.com','3','0','MLR','0.02','2023-01-08 21:13:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `dealer_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_file`
--

DROP TABLE IF EXISTS `default_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `default_file` (
  `default_id` varchar(30) NOT NULL,
  `default_no` varchar(45) DEFAULT NULL,
  `default_asmonth` varchar(45) DEFAULT NULL,
  `default_dealer_code` varchar(45) DEFAULT NULL,
  `default_default` varchar(45) DEFAULT NULL,
  `default_mid` varchar(45) DEFAULT NULL,
  `default_due_date` varchar(45) DEFAULT NULL,
  `default_pay_date` varchar(45) DEFAULT NULL,
  `default_installment` varchar(45) DEFAULT NULL,
  `default_default_rate` varchar(45) DEFAULT NULL,
  `default_remark` varchar(45) DEFAULT NULL,
  `default_create_at` datetime DEFAULT NULL,
  `default_create_by` varchar(20) DEFAULT NULL,
  `default_update_at` datetime DEFAULT NULL,
  `default_update_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`default_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_file`
--

LOCK TABLES `default_file` WRITE;
/*!40000 ALTER TABLE `default_file` DISABLE KEYS */;
INSERT INTO `default_file` VALUES
('1673187214-00b357b32d','6','112022','M6026','AGING','036982','2022/09/30','2022/11/21','204470','3','','2023-01-08 21:13:34','1626270274-2316',NULL,NULL),
('1673187214-1556663389','2','112022','M6026','AGING','027888','2022/09/30','2022/11/02','153352.5','3','','2023-01-08 21:13:34','1626270274-2316',NULL,NULL),
('1673187214-1bc64206c3','4','112022','M6026003','AGING','025502','2022/09/30','2022/11/02','209812.5','3','','2023-01-08 21:13:34','1626270274-2316',NULL,NULL),
('1673187214-d3ee69f59e','5','112022','M6026','AGING','036982','2022/08/31','2022/11/21','204470','3','','2023-01-08 21:13:34','1626270274-2316',NULL,NULL),
('1673187214-e6c958693b','1','112022','M6026','AGING','027888','2022/08/31','2022/11/02','153352.5','3','','2023-01-08 21:13:34','1626270274-2316',NULL,NULL),
('1673187214-f4b796e5ca','3','112022','M6026003','AGING','025502','2022/08/31','2022/11/02','209812.5','3','','2023-01-08 21:13:34','1626270274-2316',NULL,NULL),
('1673187214-f51f00d410','7','112022','V1013001','AGING','004483','2022/10/31','2022/11/30','151125','3','','2023-01-08 21:13:34','1626270274-2316',NULL,NULL);
/*!40000 ALTER TABLE `default_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_type`
--

DROP TABLE IF EXISTS `loan_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_type` (
  `loan_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_type_name` varchar(45) DEFAULT NULL,
  `loan_type_vat` varchar(45) DEFAULT NULL,
  `loan_type_tax` varchar(45) DEFAULT NULL,
  `loan_type_create_at` datetime DEFAULT NULL,
  `loan_type_create_by` varchar(20) DEFAULT NULL,
  `loan_type_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`loan_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_type`
--

LOCK TABLES `loan_type` WRITE;
/*!40000 ALTER TABLE `loan_type` DISABLE KEYS */;
INSERT INTO `loan_type` VALUES
(1,'Loan revolving','0','1','2021-09-14 16:38:07','1626270274-2316','loan'),
(2,'Inventory','7','5','2021-09-14 16:38:07','1626270274-2316','inventory');
/*!40000 ALTER TABLE `loan_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_master_interest`
--

DROP TABLE IF EXISTS `log_master_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_master_interest` (
  `master_interest_id` int(11) NOT NULL AUTO_INCREMENT,
  `master_interest_interest_type` varchar(45) DEFAULT NULL,
  `master_interest_start_rate` varchar(45) DEFAULT NULL,
  `master_interest_create_at` datetime DEFAULT NULL,
  `master_interest_create_by` varchar(20) DEFAULT NULL,
  `master_interest_type` varchar(3) DEFAULT NULL,
  `master_interest_start_rate_1` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_1` datetime DEFAULT NULL,
  `master_interest_start_rate_2` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_2` datetime DEFAULT NULL,
  `master_interest_start_rate_3` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_3` datetime DEFAULT NULL,
  `master_interest_start_rate_4` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_4` datetime DEFAULT NULL,
  PRIMARY KEY (`master_interest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_master_interest`
--

LOCK TABLES `log_master_interest` WRITE;
/*!40000 ALTER TABLE `log_master_interest` DISABLE KEYS */;
INSERT INTO `log_master_interest` VALUES
(81,'MLR','5.72','2023-01-08 21:14:00','1626270274-2316','mlr','5.97','2022-12-08 00:00:00','',NULL,'',NULL,NULL,NULL),
(82,'MOR','6.09','2023-01-08 21:14:00','1626270274-2316','mor','6.35','2022-12-08 00:00:00','',NULL,'',NULL,NULL,NULL),
(83,'MLR','5.72','2023-01-08 21:14:04','1626270274-2316','mlr','5.97','2022-12-08 00:00:00','',NULL,'',NULL,NULL,NULL),
(84,'MOR','6.09','2023-01-08 21:14:04','1626270274-2316','mor','6.34','2022-12-08 00:00:00','',NULL,'',NULL,NULL,NULL),
(85,'MLR','5.72','2023-01-08 21:53:40','1626270274-2316','mlr','5.97','2022-10-03 00:00:00','',NULL,'',NULL,NULL,NULL),
(86,'MOR','6.09','2023-01-08 21:53:40','1626270274-2316','mor','6.34','2022-10-03 00:00:00','',NULL,'',NULL,NULL,NULL),
(87,'MLR','5.72','2023-01-08 22:14:53','1626270274-2316','mlr','5.97','2022-11-03 00:00:00','',NULL,'',NULL,NULL,NULL),
(88,'MOR','6.09','2023-01-08 22:14:53','1626270274-2316','mor','6.34','2022-11-03 00:00:00','',NULL,'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `log_master_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_condition`
--

DROP TABLE IF EXISTS `master_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_condition` (
  `id` varchar(30) NOT NULL,
  `type` int(3) DEFAULT NULL,
  `car_brand` varchar(100) DEFAULT NULL,
  `date_rate_1` varchar(45) DEFAULT NULL,
  `date_rate_2` varchar(45) DEFAULT NULL,
  `date_rate_3` varchar(45) DEFAULT NULL,
  `date_rate_4` varchar(45) DEFAULT NULL,
  `date_rate_5` varchar(45) DEFAULT NULL,
  `date_rate_6` varchar(45) DEFAULT NULL,
  `date_rate_7` varchar(45) DEFAULT NULL,
  `date_rate_8` varchar(45) DEFAULT NULL,
  `date_rate_9` varchar(45) DEFAULT NULL,
  `date_rate_10` varchar(45) DEFAULT NULL,
  `date_rate_11` varchar(45) DEFAULT NULL,
  `date_rate_12` varchar(45) DEFAULT NULL,
  `date_rate_13` varchar(45) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `update_by` varchar(20) DEFAULT NULL,
  `date_rate_14` varchar(45) DEFAULT NULL,
  `date_rate_15` varchar(45) DEFAULT NULL,
  `date_rate_16` varchar(45) DEFAULT NULL,
  `date_rate_17` varchar(45) DEFAULT NULL,
  `date_rate_18` varchar(45) DEFAULT NULL,
  `date_rate_19` varchar(45) DEFAULT NULL,
  `date_rate_20` varchar(45) DEFAULT NULL,
  `date_rate_21` varchar(45) DEFAULT NULL,
  `date_rate_22` varchar(45) DEFAULT NULL,
  `date_rate_23` varchar(45) DEFAULT NULL,
  `date_rate_24` varchar(45) DEFAULT NULL,
  `date_rate_25` varchar(45) DEFAULT NULL,
  `date_rate_26` varchar(45) DEFAULT NULL,
  `date_rate_27` varchar(45) DEFAULT NULL,
  `date_rate_28` varchar(45) DEFAULT NULL,
  `date_rate_29` varchar(45) DEFAULT NULL,
  `date_rate_30` varchar(45) DEFAULT NULL,
  `date_rate_31` varchar(45) DEFAULT NULL,
  `date_rate_32` varchar(45) DEFAULT NULL,
  `date_rate_33` varchar(45) DEFAULT NULL,
  `date_rate_34` varchar(45) DEFAULT NULL,
  `date_rate_35` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_condition`
--

LOCK TABLES `master_condition` WRITE;
/*!40000 ALTER TABLE `master_condition` DISABLE KEYS */;
INSERT INTO `master_condition` VALUES
('1673190966-073d6d5de2',22,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.6','0.6','0.6','0.6','0.6','0.6','0.6','0.6','0.6','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-0eba9431e0',3,'MG','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.6','0.6','0.6','0.6','0.6','0.6','0.6','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0.6','0.6','0.6','0.6','0.6','0.6','0.6','0.6','0.6','0.6','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-1289a847a0',25,'Cutomization','Normal Rate','0.55','0.55','1.55','1.55','1.55','2.05','2.55','3.05','3.55','4.05','4.55','4.55','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-1ec8b364ad',16,'Cutomization','Normal Rate','Normal Rate','Normal Rate','0.5','1','1.5','2','2.5','3','3.5','4','4','4','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-1f5a213e28',9,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-28715ca2c1',28,'Cutomization','Normal Rate','1','1','1','2','2','2','2','2','2','2','2','2','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-3dd1a377b3',12,'Cutomization','Normal Rate','Normal Rate','Normal Rate','0.25','0.25','0.25','0.25','0.25','1','1','1','1','1','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-4606d24ff8',4,'SUBARU','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','1.5','1.5','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-51e227ce24',30,'Cutomization','Normal Rate','0.5','0.5','0.5','1.5','1.5','1.5','1.5','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-5608584beb',23,'Cutomization','Normal Rate','0.28','0.28','0.28','0.28','0.28','0.28','0.28','0.28','0.28','0.28','0.28','0.28','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-571473d957',27,'Cutomization','Normal Rate','Normal Rate','Normal Rate','0.5','1','1.5','2','2.5','3','3.5','4','4.5','5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-64c39ebadd',14,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.3','0.3','0.6','0.6','0.9','0.9','0.9','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-6e5d223eb8',8,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.6','0.6','0.6','0.6','0.6','0.6','0.6','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-9861e7d71b',29,'Cutomization','Normal Rate','0.5','0.5','0.5','1','1','1','1','1','1','1','1','1','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-a5c5640343',17,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.5','0.5','0.5','0.5','0.5','0.5','0.5','0.5','0.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-af6859a750',6,'AUDI','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','1.5','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-b4d741d539',26,'Cutomization','Normal Rate','0.5','0.5','1','1','1','0.5','0.5','0.5','0.5','0.5','0.5','0.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-baad96b4ca',24,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.2','0.2','0.2','0.2','0.2','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-bc291c6189',1,'Triump','Normal Rate','Normal Rate','Normal Rate','Normal Rate','1','1','1','1','1','1','1','1','1','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'1','1','1','1','1','1','1','1','1','1','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-be9f87666a',11,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','1.5','1.5','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-c1cf38aa80',10,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.25','0.25','0.25','0.25','0.25','0.25','0.25','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-cf3a47235d',13,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.5','1','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-d2f0f3d786',20,'Cutomization','Normal Rate','0.5','1.5','1.5','1.5','1.5','2','2.5','3','3.5','4','4.5','4.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-e86e73a0a5',18,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.6','0.6','0.6','0.6','1.2','1.2','1.2','1.2','1.2','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-e938b265bf',19,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.5','1','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-eeaac02ecd',5,'Standard','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','1.5','1.5','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-f40810fe03',21,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.5','1','1.5','2','2.5','3','3.5','4','4','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-f97131110a',15,'Cutomization','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','0.5','0.5','0.5','0.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-fcb6a99955',7,'USED ','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190966-fdcf05aae6',2,'KIA','Normal Rate','Normal Rate','Normal Rate','Normal Rate','Normal Rate','1.5','1.5','1.5','1.5','1.5','1.5','1.5','1.5','2023-01-08 22:16:06','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
/*!40000 ALTER TABLE `master_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_condition_special`
--

DROP TABLE IF EXISTS `master_condition_special`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_condition_special` (
  `id` varchar(30) NOT NULL,
  `type` int(3) DEFAULT NULL,
  `car_brand` varchar(100) DEFAULT NULL,
  `date_rate_1` varchar(45) DEFAULT NULL,
  `date_rate_2` varchar(45) DEFAULT NULL,
  `date_rate_3` varchar(45) DEFAULT NULL,
  `date_rate_4` varchar(45) DEFAULT NULL,
  `date_rate_5` varchar(45) DEFAULT NULL,
  `date_rate_6` varchar(45) DEFAULT NULL,
  `date_rate_7` varchar(45) DEFAULT NULL,
  `date_rate_8` varchar(45) DEFAULT NULL,
  `date_rate_9` varchar(45) DEFAULT NULL,
  `date_rate_10` varchar(45) DEFAULT NULL,
  `date_rate_11` varchar(45) DEFAULT NULL,
  `date_rate_12` varchar(45) DEFAULT NULL,
  `date_rate_13` varchar(45) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `update_by` varchar(20) DEFAULT NULL,
  `date_rate_14` varchar(45) DEFAULT NULL,
  `date_rate_15` varchar(45) DEFAULT NULL,
  `date_rate_16` varchar(45) DEFAULT NULL,
  `date_rate_17` varchar(45) DEFAULT NULL,
  `date_rate_18` varchar(45) DEFAULT NULL,
  `date_rate_19` varchar(45) DEFAULT NULL,
  `date_rate_20` varchar(45) DEFAULT NULL,
  `date_rate_21` varchar(45) DEFAULT NULL,
  `date_rate_22` varchar(45) DEFAULT NULL,
  `date_rate_23` varchar(45) DEFAULT NULL,
  `date_rate_24` varchar(45) DEFAULT NULL,
  `date_rate_25` varchar(45) DEFAULT NULL,
  `date_rate_26` varchar(45) DEFAULT NULL,
  `date_rate_27` varchar(45) DEFAULT NULL,
  `date_rate_28` varchar(45) DEFAULT NULL,
  `date_rate_29` varchar(45) DEFAULT NULL,
  `date_rate_30` varchar(45) DEFAULT NULL,
  `date_rate_31` varchar(45) DEFAULT NULL,
  `date_rate_32` varchar(45) DEFAULT NULL,
  `date_rate_33` varchar(45) DEFAULT NULL,
  `date_rate_34` varchar(45) DEFAULT NULL,
  `date_rate_35` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_condition_special`
--

LOCK TABLES `master_condition_special` WRITE;
/*!40000 ALTER TABLE `master_condition_special` DISABLE KEYS */;
INSERT INTO `master_condition_special` VALUES
('1673190973-4ab1646b47',1,'มาตราการ','Spec Rate','Spec Rate','Spec Rate','Spec Rate','Spec Rate','Spec Rate','0.6','0.6','1.1','1.1','1.1','1.1','1.1','2023-01-08 22:16:13','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'),
('1673190973-eb78e4fd0b',2,'มาตราการ','Spec Rate','Spec Rate','Spec Rate','Spec Rate','Spec Rate','Spec Rate','1.5','1.5','1.5','2','2','2','2','2023-01-08 22:16:13','1626270274-2316',NULL,NULL,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
/*!40000 ALTER TABLE `master_condition_special` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_interest`
--

DROP TABLE IF EXISTS `master_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_interest` (
  `master_interest_id` int(11) NOT NULL AUTO_INCREMENT,
  `master_interest_interest_type` varchar(45) DEFAULT NULL,
  `master_interest_start_rate` varchar(45) DEFAULT NULL,
  `master_interest_create_at` datetime DEFAULT NULL,
  `master_interest_create_by` varchar(20) DEFAULT NULL,
  `master_interest_type` varchar(3) DEFAULT NULL,
  `master_interest_start_rate_1` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_1` datetime DEFAULT NULL,
  `master_interest_start_rate_2` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_2` datetime DEFAULT NULL,
  `master_interest_start_rate_3` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_3` datetime DEFAULT NULL,
  `master_interest_start_rate_4` varchar(45) DEFAULT NULL,
  `master_interest_date_rate_4` datetime DEFAULT NULL,
  PRIMARY KEY (`master_interest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_interest`
--

LOCK TABLES `master_interest` WRITE;
/*!40000 ALTER TABLE `master_interest` DISABLE KEYS */;
INSERT INTO `master_interest` VALUES
(87,'MLR rate','5.72','2023-01-08 22:14:53','1626270274-2316','mlr','5.97','2022-11-03 00:00:00','',NULL,'',NULL,NULL,NULL),
(88,'MOR rate','6.09','2023-01-08 22:14:53','1626270274-2316','mor','6.34','2022-11-03 00:00:00','',NULL,'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `master_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `out_standing`
--

DROP TABLE IF EXISTS `out_standing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `out_standing` (
  `out_standing_id` varchar(30) NOT NULL,
  `out_standing_dealer_code` varchar(45) DEFAULT NULL,
  `out_standing_loan_type` varchar(45) DEFAULT NULL,
  `out_standing_dealer_name` varchar(100) DEFAULT NULL,
  `out_standing_franchise` varchar(45) DEFAULT NULL,
  `out_standing_invoice_date` varchar(45) DEFAULT NULL,
  `out_standing_interest_cal_date` varchar(45) DEFAULT NULL,
  `out_standing_midno` varchar(45) DEFAULT NULL,
  `out_standing_chassis` varchar(45) DEFAULT NULL,
  `out_standing_engine` varchar(45) DEFAULT NULL,
  `out_standing_outstanding` varchar(45) DEFAULT NULL,
  `out_standing_create_at` datetime DEFAULT NULL,
  `out_standing_create_by` varchar(20) DEFAULT NULL,
  `out_standing_update_at` datetime DEFAULT NULL,
  `out_standing_update_by` varchar(20) DEFAULT NULL,
  `type_curtailment_spec` varchar(45) DEFAULT NULL,
  `spec_ratetype_1` varchar(45) DEFAULT NULL,
  `spec_rate_1` varchar(45) DEFAULT NULL,
  `startdate_1` varchar(45) DEFAULT NULL,
  `enddate_1` varchar(45) DEFAULT NULL,
  `spec_ratetype_2` varchar(45) DEFAULT NULL,
  `spec_rate_2` varchar(45) DEFAULT NULL,
  `startdate_2` varchar(45) DEFAULT NULL,
  `enddate_2` varchar(45) DEFAULT NULL,
  `spec_ratetype_3` varchar(45) DEFAULT NULL,
  `spec_rate_3` varchar(45) DEFAULT NULL,
  `startdate_3` varchar(45) DEFAULT NULL,
  `enddate_3` varchar(45) DEFAULT NULL,
  `spec_ratetype_4` varchar(45) DEFAULT NULL,
  `spec_rate_4` varchar(45) DEFAULT NULL,
  `startdate_4` varchar(45) DEFAULT NULL,
  `enddate_4` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`out_standing_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `out_standing`
--

LOCK TABLES `out_standing` WRITE;
/*!40000 ALTER TABLE `out_standing` DISABLE KEYS */;
INSERT INTO `out_standing` VALUES
('1673185543-000b983d9e','M6026','INVENTORY',NULL,'MG','2022/01/24',NULL,'038095','MMLA36E67MG038095','15S4C5QTMB030053','668330','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-002d1ba6b3','M6026','INVENTORY',NULL,'MG','2022/07/27',NULL,'027286','MMLA36E43NG027286','15S4CFKTN7050035','606250','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-00bbf93810','M6026','INVENTORY',NULL,'MG','2022/11/30',NULL,'035016','MMLW74563NG035016','15S4CGJTNB170020','891430','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-01a059d0a5','M6026003','INVENTORY',NULL,'MG','2022/03/31',NULL,'017722','MMLA36E42NG017722','15S4CFKTN3160024','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-0399f8d47b','H1065','LOAN',NULL,'HONDA','2022/11/28',NULL,'101023-3','MRHRW6830NP101023','K24V53451534','1483407.72','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-03b42e0438','M6026002','INVENTORY',NULL,'MG','2022/03/31',NULL,'017694','MMLA36E41NG017694','15S4CFKTN3150090','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-056a926a0a','M6026004','INVENTORY',NULL,'MG','2022/04/29',NULL,'020496','MML1CDL24NG020496','20D4N9RTN4220010','707480','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-0726fc4780','H1143','LOAN',NULL,'HONDA','2022/11/28',NULL,'102092','MRHCV3640NP102092','LFB11331336','1745039.28','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-07c38f3fce','M6026002','INVENTORY',NULL,'MG','2022/04/29',NULL,'016115','MMLA36E67NG016115','15S4CFKTN2280023','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-087cfc6929','M6026002','INVENTORY',NULL,'MG','2022/03/31',NULL,'018455','MML1DEJ25NG018455','20D4N9RTN3160002','531050','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-08bdeed605','M6026003','INVENTORY',NULL,'MG','2022/04/29',NULL,'020337','MMLA36E61NG020337','15S4CFKTN4260038','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-08f8df64da','M6026','INVENTORY',NULL,'MG','2022/01/24',NULL,'038516','MMLA36E65MG038516','15S4C5QTMB080084','668330','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-0c095f708c','M6026003','INVENTORY',NULL,'MG','2022/03/31',NULL,'017718','MMLA36E40NG017718','15S4CFKTN3150087','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-0d688ac3cb','M6026','INVENTORY',NULL,'MG','2022/05/26',NULL,'021457','MMLA36E47NG021457','15S4CFKTN5030022','606250','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-0e60f0c7d4','M6026003','INVENTORY',NULL,'MG','2022/01/28',NULL,'012075','MMLA36E43NG012075','15S4C5QTN1220079','581030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-0ea520c56c','M6026','INVENTORY',NULL,'MG','2022/05/30',NULL,'017142-1','MMLA36E64NG017142','15S4CFKTN3090028','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-0fbc619d9f','H1065','LOAN',NULL,'HONDA','2022/11/30',NULL,'100369-2','MRHRV5890PT100369','LEC61200523','1147680.69','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-102e2bf87b','M6026003','INVENTORY',NULL,'MG','2022/03/31',NULL,'016039','MMLA36E66NG016039','15S4CFKTN2240022','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-111cd85794','M6026','INVENTORY',NULL,'MG','2022/07/21',NULL,'027934','MMLW74E61NG027934','15S4CGFTN7090076','775030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-12087d7980','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'100313-3','MRHRV5890PT100313','LEC61200425','1147680.69','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-1327d5441c','M6026004','INVENTORY',NULL,'MG','2022/06/16',NULL,'024328','MMLW74E60NG024328','15S4CGFTN6070072','775030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-13870b307b','M6026','INVENTORY',NULL,'MG','2022/11/30',NULL,'041406','MMLW74562NG041406','15S4CGJTNB230019','901130','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-157ec6ea67','M6026','INVENTORY',NULL,'MG','2022/05/25',NULL,'021678-D','MMLW74E61NG021678','15S4CALTN5090010','679150','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-160d237ae5','H1065','LOAN',NULL,'HONDA','2022/11/24',NULL,'101485-1','MRHGN3680NT101485','LEB81201450','819609','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-1845ef6764','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'101605-1','MRHGN3680NT101605','LEB81201606','809639.82','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-18c3bd761e','V1013001','INVENTORY',NULL,'FOTON TRUCK','2021/03/31',NULL,'010110-1','LVCB3RBB6KG010110','ISF3.8s315476410887','534375','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-1ab8bf3067','H1065','LOAN',NULL,'HONDA','2022/10/31',NULL,'101651-','MRHGN1620NT101651','P10A61313773','565241.43','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-1bb9f72250','H1133','LOAN',NULL,'HONDA','2022/11/28',NULL,'100068-2','MRHRV5890PT100068','LEC61200078','1147824.7','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-1c9b90b925','M6026002','INVENTORY',NULL,'MG','2022/07/27',NULL,'028915','MMLA36E42NG028915','15S4CFKTN7150049','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-1e56212afc','M6026','INVENTORY',NULL,'MG','2022/04/29',NULL,'019385','MMLW74E69NG019385','15S4CALTN4050062','775030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-1f241eb7ef','V1013001','INVENTORY',NULL,'FOTON TRUCK','2021/09/30',NULL,'070193','LVBV4JBBXMY070193','ISF3.8S315477200878','657045','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-2541437d6c','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'100274','MRHRV5890PT100274','LEC61200393','1147680.69','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-2a21e5e65a','M6026002','INVENTORY',NULL,'MG','2022/04/29',NULL,'017202','MMLA36E67NG017202','15S4CFKTN3110030','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-2a7cc624aa','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'100300-3','MRHRV5890PT100300','LEC61200406','1147680.69','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-2d3f54425c','H1143','LOAN',NULL,'HONDA','2022/11/10',NULL,'105875','MRHRV5860NT105875','LEC61016172','1041363.83','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-2ed4ef1976','M6030','INVENTORY',NULL,'MG','2022/06/29',NULL,'025479','MMLAA4264NG025479','15E4EFDTN6170017','1045440','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-310ded8cdf','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'100252','MRHRV5890PT100252','LEC61200303','1143693.02','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-31cb9708fe','M6026','INVENTORY',NULL,'MG','2022/03/31',NULL,'015152','MMLA36E68NG015152','15S4C5QTN2180009','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-3367c5f084','M6026004','INVENTORY',NULL,'MG','2022/05/31',NULL,'022071','MMLA36E32NG022071','15S4CFKTN5120015','567450','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-336f8d459e','V1013001','INVENTORY',NULL,'FOTON TRUCK','2021/09/30',NULL,'070192','LVBV4JBB8MY070192','ISF3.8S315477200884','324886.75','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-3478ce34e2','V1013001','INVENTORY',NULL,'FOTON TRUCK','2022/10/31',NULL,'067267','LVBV4JBB2NW067267','ISF3.8s316877250819','1050600','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-36074d2f1e','M6026','INVENTORY',NULL,'MG','2021/07/19',NULL,'027888','MML1CDY22MG027888','20D4N8NTM5150004','306705','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-38c814f78f','M6026','INVENTORY',NULL,'MG','2022/05/03',NULL,'019145','MMLW74E33NG019145','15S4CALTN3300031','716830','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-398f2dfa27','H1065','LOAN',NULL,'HONDA','2022/10/10',NULL,'100428-2','MRHRW5810NP100428','K24V53451119','1333008.71','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-3a446edfc4','H1065','LOAN',NULL,'HONDA','2022/11/14',NULL,'100692-3','MRHFE4640PP100692','LFC21002994','1099434.85','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-3c843de3f7','H1065','LOAN',NULL,'HONDA','2022/11/30',NULL,'100336','MRHRV5890PT100336','LEC61200470','1137711.51','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-3d5b201ac1','M6026002','INVENTORY',NULL,'MG','2022/05/25',NULL,'021983','MMLW74E66NG021983','15S4CALTN5100001','775030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-3d8fc8da3e','M6026002','INVENTORY',NULL,'MG','2022/04/29',NULL,'018804','MMLA36E67NG018804','15S4CFKTN3250064','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-4266d3c7f5','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'100047-2','MRHRV5890PT100047','LEC61200049','1147680.69','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-4298407519','H1143','LOAN',NULL,'HONDA','2022/11/14',NULL,'101999','MRHGN1640NT101999','P10A6135972','587852.97','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-4650bb3b3b','M6026','INVENTORY',NULL,'MG','2022/04/29',NULL,'020225','MMLAA4263NG020225','15E4EFDTN4190026','1112640','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-4672230642','M6026','INVENTORY',NULL,'MG','2022/03/31',NULL,'018126-D','MMLAA4262NG018126','15E4EFDTN3230008','990150','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-4e5c87176d','M6026','INVENTORY',NULL,'MG','2022/11/30',NULL,'216550','LSJWH4094NN216550','TZ180XS0951A122828A00001567','929000','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-4fc083b557','M6030','INVENTORY',NULL,'MG','2022/03/31',NULL,'014913','MMLA36E63NG014913','15S4C5QTN2140148','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-5554d55234','M6026003','INVENTORY',NULL,'MG','2022/06/29',NULL,'025390','MMLA36E4XNG025390','15S4CFKTN6170003','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-555ad6edd3','M6026002','INVENTORY',NULL,'MG','2022/01/24',NULL,'010765','MMLA36E65NG010765','15S4C5QTN1110091','668330','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-564f72611a','M6030','INVENTORY',NULL,'MG','2022/05/31',NULL,'023440','MMLAA4260NG023440','15E4EFDTN5260018','1112640','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-5805cf1bb1','M6026','INVENTORY',NULL,'MG','2021/07/19',NULL,'027899','MML1CDY27MG027899','20D4N8NTM6080012','460057.5','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-597fdb0a7f','M6026','INVENTORY',NULL,'MG','2022/01/24',NULL,'011317','MMLW74E67NG011317','15S4CALTN1170071','775030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-59e3e5cc69','M6026','INVENTORY',NULL,'MG','2022/05/31',NULL,'023397','MMLW74E36NG023397','15S4CGFTN5260021','716830','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-5c0edfaa4b','M6026','INVENTORY',NULL,'MG','2021/08/31',NULL,'030644','MML1CDY20MG030644','20D4N8NTM7150026','613410','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-5dd541b602','M6026','INVENTORY',NULL,'MG','2022/03/31',NULL,'015206','MMLA36E65NG015206','15S4C5QTN2170052','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-6631552852','H1065','LOAN',NULL,'HONDA','2022/11/28',NULL,'100708-2','MRHFE4640PP100708','LFC21003182','1095447.18','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-67cd06ac99','M6026003','INVENTORY',NULL,'MG','2021/10/29',NULL,'032585','MML1CDY29MG032585','20D4N8NTM8200015','408940','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-67cdcee469','H1065','LOAN',NULL,'HONDA','2022/09/26',NULL,'040614','MHRDG3880PJ040614','L15ZF1470686','939173.34','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-687f358161','M6026002','INVENTORY',NULL,'MG','2022/04/29',NULL,'020832','MMLA36E60NG020832','15S4CFKTN4270044','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-68e1c32906','M6026004','INVENTORY',NULL,'MG','2022/04/29',NULL,'020068','MMLA36E42NG020068','15S4CFKTN4270062','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-6b76809cc0','H1133','LOAN',NULL,'HONDA','2022/11/28',NULL,'100029','MRHRV5850PT100029','LEC61200098','944872.17','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-6be4867e79','H1065','LOAN',NULL,'HONDA','2022/11/21',NULL,'040722','MHRDG3880PJ040722','L15ZF1470774','943161.01','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-6cfeabc99b','V1013001','INVENTORY',NULL,'FOTON TRUCK','2022/02/28',NULL,'004483','LVAV2JBB3ME004483','ISF2.8s3129T77008436','302223','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-6f6445e118','H1065','LOAN',NULL,'HONDA','2022/11/30',NULL,'100194-5','MRHRV5890PT100194','LEC61200258','1137711.51','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-6f6b83383c','M6026','INVENTORY',NULL,'MG','2022/05/26',NULL,'022759','MMLA36E46NG022759','15S4CFKTN5180070','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-710e510847','M6026003','INVENTORY',NULL,'MG','2022/04/29',NULL,'020863','MMLA36E60NG020863','15S4CFKTN4280056','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-7112f38743','H1143','LOAN',NULL,'HONDA','2022/11/28',NULL,'100012','MRHRV5850PT100012','LEC61200107','944872.17','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-722781024f','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'100048-4','MRHRV5890PT100048','LEC61200057','1147680.69','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-72a33fcf27','M6026004','INVENTORY',NULL,'MG','2022/04/29',NULL,'019942','MMLA36E44NG019942','15S4CFKTN4180060','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-776a4d54aa','M6026004','INVENTORY',NULL,'MG','2022/04/29',NULL,'018867','MML1CDL23NG018867','20D4N9RTN3170010','707480','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-77ca1bde1c','M6026','INVENTORY',NULL,'MG','2021/12/17',NULL,'036982','MML1CDY26MG036982','20D4N8NTMA160016','408940','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-78b49eaa7c','M6026002','INVENTORY',NULL,'MG','2022/06/29',NULL,'024957','MMLA36E49NG024957','15S4CFKTN6200027','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-7b3f1caace','M6026','INVENTORY',NULL,'MG','2022/07/27',NULL,'027363','MMLA36E46NG027363','15S4CFKTN7060038','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-7e22faf766','M6026004','INVENTORY',NULL,'MG','2022/04/29',NULL,'016758','MMLA36E47NG016758','15S4CFKTN3110015','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-7e3e3f2f0b','M6026','INVENTORY',NULL,'MG','2022/05/30',NULL,'022037','MMLA36E41NG022037','15S4CFKTN5120007','606250','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-7fa97d8db7','H1133','LOAN',NULL,'HONDA','2022/11/07',NULL,'040673','MHRDG3880PJ040673','L15ZF1470750','943305.01','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-80cc1c64e6','M6030','INVENTORY',NULL,'MG','2022/03/31',NULL,'018506','MMLA36E41NG018506','15S4CFKTN3230045','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-87a58a5331','M6026','INVENTORY',NULL,'MG','2022/06/29',NULL,'024170','MMLA36E60NG024170','15S4CFKTN6030025','687730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-897080e394','H1133','LOAN',NULL,'HONDA','2022/09/26',NULL,'040030','MHRDG3860PJ040030','L15ZF1470235','889184.34','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-8cbf2d18b3','M6030','INVENTORY',NULL,'MG','2022/09/30',NULL,'035048','MMLW74565NG035048','15S4CGJTN9220008','901130','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-8f60d4ae16','M6026','INVENTORY',NULL,'MG','2021/08/26',NULL,'030568','MML1CDY2XMG030568','20D4N8NTM7200004','613410','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-8f6a6403ce','V1013001','INVENTORY',NULL,'FOTON TRUCK ','2022/06/27',NULL,'023301','LVBV3JBBXNY023301','ISF2.8S3129T77122892','602170','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-90e130e885','M6026','INVENTORY',NULL,'MG','2022/05/25',NULL,'017215','MMLA36E65NG017215','15S4CFKTN3090079','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-93b99da5cc','M6030','INVENTORY',NULL,'MG','2022/03/31',NULL,'016066','MMLA36E69NG016066','15S4CFKTN2240026','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-9989214e3d','M6026','INVENTORY',NULL,'MG','2022/06/27',NULL,'025288','MMLA36E48NG025288','15S4CFKTN6150122','606250','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-9c49606f1e','M6026','INVENTORY',NULL,'MG','2022/07/27',NULL,'027595','MMLA36E45NG027595','15S4CFKTN7070069','606250','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-a4bde2b09f','H1065','LOAN',NULL,'HONDA','2022/11/29',NULL,'100278','MRHRV5890PT100278','LEC61200402','1147680.69','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-a7914c9dea','M6026004','INVENTORY',NULL,'MG','2022/05/31',NULL,'022835','MMLA36E47NG022835','15S4CFKTN5200016','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-a7c54f366c','M6030','INVENTORY',NULL,'MG','2022/11/16',NULL,'038570','MMLW74560NG038570','15S4CGJTNA040013','901130','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-a7c7f7cc34','M6026004','INVENTORY',NULL,'MG','2022/05/26',NULL,'021129-D','MMLA36E6XNG021129','15S4CFKTN4280135','594150','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-a816874bff','M6030','INVENTORY',NULL,'MG','2022/03/31',NULL,'018041-D','MMLAA4265NG018041','15E4EFDTN3210022','990150','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-a8a818a571','M6030','INVENTORY',NULL,'MG','2022/03/31',NULL,'017862','MMLA36E38NG017862','15S4CFKTN3210047','551930','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-a9cbbbcee0','M6030','INVENTORY',NULL,'MG','2022/08/17',NULL,'030228-D','MMLW74564NG030228','15S4CGJTN803K022','789650','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-afe7937c8c','V1013001','INVENTORY',NULL,'FOTON TRUCK','2021/11/29',NULL,'076729','LVBV4JBB0MY076729','ISF3.8s315477206554','620415','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-b126a923f1','M6026002','INVENTORY',NULL,'MG','2021/10/21',NULL,'036488','MMLW74E3XMG036488','15S4CALTMA140025','537622.5','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-b1a664bd1f','M6026002','INVENTORY',NULL,'MG','2022/11/30',NULL,'035057','MMLW74566NG035057','15S4CGJTNB180025','891430','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-b2f0643389','M6026002','INVENTORY',NULL,'MG','2022/01/24',NULL,'010685','MMLA36E67NG010685','15S4C5QTN1110092','668330','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-b510cc69c9','M6026','INVENTORY',NULL,'MG','2022/05/30',NULL,'022720','MMLA36E41NG022720','15S4CFKTN5190020','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-b652d13134','V1013001','INVENTORY',NULL,'FOTON TRUCK','2022/06/30',NULL,'023302','LVBV3JBB1NY023302','ISF2.8S3129T77122900','630070','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-b95d45c5f0','M6026003','INVENTORY',NULL,'MG','2022/06/29',NULL,'025494','MMLW74E33NG025494','15S4CGFTN6150021','755630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-bd96027c49','M6026','INVENTORY',NULL,'MG','2022/05/31',NULL,'023332','MMLW74E30NG023332','15S4CGFTN5260043','716830','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-bed13a9388','H1065','LOAN',NULL,'HONDA','2022/10/10',NULL,'101394-2','MRHGN1620NT101394','P10A61310475','565241.43','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-bf58da5d4b','M6026','INVENTORY',NULL,'MG','2022/11/30',NULL,'040962','MMLW74565NG040962','15S4CGJTNB180028','901130','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-bf95f78307','H1143','LOAN',NULL,'HONDA','2022/11/14',NULL,'102109','MRHGN1640NT102109','P10A61316403','587852.97','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-c10b0354a1','H1065','LOAN',NULL,'HONDA','2022/10/10',NULL,'100760','MRHRW6830NP100760','K24V53451214','1535641.23','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-c1e0f85c5c','M6026','INVENTORY',NULL,'MG','2022/11/30',NULL,'041296','MMLW7456XNG041296','15S4CGJTNB210015','891430','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-c2ca41b37e','M6026004','INVENTORY',NULL,'MG','2021/09/30',NULL,'035068','MMLA36E60MG035068','15S4C5QTM9130043','334165','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-c3a8340c69','M6026','INVENTORY',NULL,'MG','2022/06/29',NULL,'024060','MML1CEL21NG024060','20D4N9STN5310007','670680','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-c6a8381086','M6026002','INVENTORY',NULL,'MG','2021/11/26',NULL,'039629','MMLA36E43MG039629','15S4C5QTMB180029','435772.5','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-c79c8d8fb2','M6026','INVENTORY',NULL,'MG','2022/03/31',NULL,'017681','MMLA36E43NG017681','15S4CFKTN3150072','590730','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ca449191d9','M6026','INVENTORY',NULL,'MG','2022/06/29',NULL,'025650','MMLA36E4XNG025650','15S4CFKTN6180005','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-cc6615a4b4','M6026','INVENTORY',NULL,'MG','2022/02/28',NULL,'012731','MMLA36E69NG012731','15S4C5QTN1260029','668330','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-cd1820c61d','V1013001','INVENTORY',NULL,'FOTON TRUCK','2022/10/12',NULL,'092200','LVBV6PEB6MT092200','ISGe335077467442','119220.3500000001','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-cf708b4170','H1133','LOAN',NULL,'HONDA','2022/10/10',NULL,'100771-1','MRHRW6830NP100771','K24V53451226','1535785.23','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-d286bb6f43','M6030','INVENTORY',NULL,'MG','2022/08/31',NULL,'032466-D','MMLAA4767NG032466','15E4EAPTN8220059','1109150','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-d7339df20a','H1133','LOAN',NULL,'HONDA','2022/09/23',NULL,'101442-2','MRHGN1620NT101442','P10A61311251','559403.94','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-d747a5f0d0','V1013001','INVENTORY',NULL,'FOTON TRUCK','2022/06/30',NULL,'023306','LVBV3JBB9NY023306','ISF2.8S3129T77122902','602170','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-d8551822a0','H1133','LOAN',NULL,'HONDA','2022/09/05',NULL,'040089','MHRDG3880PJ040089','L15ZF1470092','939317.34','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-d999ffe612','H1065','LOAN',NULL,'HONDA','2022/10/31',NULL,'101356-1','MRHGN3680NT101356','LEB81201380','809639.82','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-dc31b1244a','M6026','INVENTORY',NULL,'MG','2022/11/30',NULL,'218603-D','LSJWH4099NN218603','TZ180XS0951A122829A00000297','910063','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-dd28b07a86','M6026002','INVENTORY',NULL,'MG','2022/03/31',NULL,'014670','MMLA36E36NG014670','15S4C5QTN2150086','551930','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-dec7ee9b74','M6026','INVENTORY',NULL,'MG','2022/05/31',NULL,'023473','MMLAA4264NG023473','15E4EFDTN5300001','1112640','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-df9ad68326','M6030','INVENTORY',NULL,'MG','2022/03/31',NULL,'014754','MMLA36E69NG014754','15S4C5QTN2140046','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-e4bc3f7819','M6026','INVENTORY',NULL,'MG','2022/05/25',NULL,'021230','MMLA36E6XNG021230','15S4CFKTN5040083','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-e60296075b','M6026003','INVENTORY',NULL,'MG','2021/07/22',NULL,'025502','MMLAA4268MG025502','15E4EAFTM5240027','419625','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-e76866812b','M6026','INVENTORY',NULL,'MG','2022/04/29',NULL,'016960','MMLA36E60NG016960','15S4CFKTN3080080','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-e897ca1912','M6026004','INVENTORY',NULL,'MG','2022/03/31',NULL,'018986','MMLW74E30NG018986','15S4CALTN3290002','755630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ea0aab5542','M6026003','INVENTORY',NULL,'MG','2022/03/31',NULL,'016025','MMLA36E66NG016025','15S4CFKTN2240009','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ea5a06e61c','V1013001','INVENTORY',NULL,'FOTON TRUCK','2021/11/29',NULL,'076730','LVBV4JBB7MY076730','ISF3.8s315477206561','620415','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-eadc0ba3e2','M6026003','INVENTORY',NULL,'MG','2022/05/25',NULL,'022162','MMLW74E37NG022162','15S4CALTN5120047','716830','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-eb799ba409','M6026','INVENTORY',NULL,'MG','2022/03/31',NULL,'018503','MMLW74E66NG018503','15S4CALTN3230011','775030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ebfdf916e5','M6026002','INVENTORY',NULL,'MG','2022/07/27',NULL,'027624','MMLA36E48NG027624','15S4CFKTN7060086','606250','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ec6f4e2299','M6026003','INVENTORY',NULL,'MG','2022/03/31',NULL,'016023','MMLA36E62NG016023','15S4CFKTN2250036','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ec96e64375','M6026','INVENTORY',NULL,'MG','2022/05/31',NULL,'023416','MMLAA4263NG023416','15E4EFDTN5300003','1112640','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ec9f41e9a5','M6030','INVENTORY',NULL,'MG','2022/08/24',NULL,'027475-D','MMLA36E46NG027475','15S4CFKTN7070034','577150','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ecbf3e6852','M6026002','INVENTORY',NULL,'MG','2022/06/29',NULL,'024997','MML1DEJ25NG024997','20D4N9RTN6130020','531050','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ee82db1136','M6026','INVENTORY',NULL,'MG','2022/05/26',NULL,'021250','MMLA36E47NG021250','15S4CFKTN4290047','606250','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-ee8391e032','H1133','LOAN',NULL,'HONDA','2022/09/19',NULL,'101497-1','MRHGN1640NT101497','P10A61310976','587852.97','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'','','','','','','','','','','','','','','','',''),
('1673185543-f29dbf5748','V1013001','INVENTORY',NULL,'FOTON TRUCK ','2022/06/27',NULL,'023300','LVBV3JBB8NY023300','ISF2.8S3129T 77122887','630070','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'2','MLR','0','1','180','MLR','1.5','181','270','MLR','2','271','999','','','',''),
('1673185543-f621a09a4f','M6026','INVENTORY',NULL,'MG','2021/08/17',NULL,'029884','MML1CEN21MG029884','20D4N8MTM5240005','339940','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-f87182449a','M6030','INVENTORY',NULL,'MG','2022/08/31',NULL,'031651','MMLW74569NG031651','15S4CGJTN819K002','891430','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-fa91c364c5','M6026004','INVENTORY',NULL,'MG','2022/01/31',NULL,'013009','MMLW74E66NG013009','15S4CALTN1280019','775030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-fb8538b233','M6026004','INVENTORY',NULL,'MG','2022/05/31',NULL,'022837','MMLA36E40NG022837','15S4CFKTN5200013','658630','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-fc5552375a','M6026004','INVENTORY',NULL,'MG','2022/01/27',NULL,'011670','MMLA36E6XNG011670','15S4C5QTN1190028','668330','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-fd0e8db962','M6026','INVENTORY',NULL,'MG','2022/05/25',NULL,'017448','MMLA36E66NG017448','15S4CFKTN3110022','678030','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','',''),
('1673185543-fef97678a2','M6026','INVENTORY',NULL,'MG','2021/12/24',NULL,'024063','MMLAA4762MG024063','15E4EAPTM5140020','659115','2023-01-08 20:45:43','1626270274-2316',NULL,NULL,'1','MLR','0','1','180','MLR','0.6','181','240','MLR','1.1','241','999','','','','');
/*!40000 ALTER TABLE `out_standing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `payment_id` varchar(30) NOT NULL,
  `payment_dealer_code` varchar(45) DEFAULT NULL,
  `payment_mid` varchar(45) DEFAULT NULL,
  `payment_paydate_1` varchar(45) DEFAULT NULL,
  `payment_paydate_2` varchar(45) DEFAULT NULL,
  `payment_paydate_3` varchar(45) DEFAULT NULL,
  `payment_paydate_4` varchar(45) DEFAULT NULL,
  `payment_paydate_5` varchar(45) DEFAULT NULL,
  `payment_paydate_6` varchar(45) DEFAULT NULL,
  `payment_amount_1` varchar(45) DEFAULT NULL,
  `payment_amount_2` varchar(45) DEFAULT NULL,
  `payment_amount_3` varchar(45) DEFAULT NULL,
  `payment_amount_4` varchar(45) DEFAULT NULL,
  `payment_amount_5` varchar(45) DEFAULT NULL,
  `payment_amount_6` varchar(45) DEFAULT NULL,
  `payment_create_at` datetime DEFAULT NULL,
  `payment_create_by` varchar(20) DEFAULT NULL,
  `payment_update_at` datetime DEFAULT NULL,
  `payment_update_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES
('1673187207-01a4d2f1b0','H1065','040722','2022/11/29',NULL,NULL,NULL,NULL,NULL,'943161.01','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-0d89731261','M6026','027899','2022/11/01','2022/11/29',NULL,NULL,NULL,NULL,'153352.5','306705','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-29a575fcab','H1133','040089','2022/11/28',NULL,NULL,NULL,NULL,NULL,'939317.34','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-34e4189b75','M6026003','025502','2022/11/02',NULL,NULL,NULL,NULL,NULL,'419625','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-367e7fdeb1','M6026','025288','2022/11/18',NULL,NULL,NULL,NULL,NULL,'606250','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-38be077490','M6026','036982','2022/11/21',NULL,NULL,NULL,NULL,NULL,'408940','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-624d4a1779','H1133','100771-1','2022/11/21',NULL,NULL,NULL,NULL,NULL,'1535785.23','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-6d4d030326','M6026','021250','2022/11/29','2022/11/29',NULL,NULL,NULL,NULL,'39.74','606210.26','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-72bbbcd3c6','M6026002','039629','2022/11/01',NULL,NULL,NULL,NULL,NULL,'145257.5','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-823ecefddd','V1013001','004483','2022/11/30',NULL,NULL,NULL,NULL,NULL,'151125','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-870b6f27c4','M6026002','036488','2022/11/01',NULL,NULL,NULL,NULL,NULL,'179207.5','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-9ec30e7a5a','M6026002','017202','2022/11/29','2022/11/29',NULL,NULL,NULL,NULL,'46918.07','631111.93','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-a1d0f4fdcb','M6030','014913','2022/11/22',NULL,NULL,NULL,NULL,NULL,'678030','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-b0fc65d1f7','M6026','030644','2022/11/01',NULL,NULL,NULL,NULL,NULL,'204470','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-b253d7d9df','M6026','022720','2022/11/01','2022/11/01',NULL,NULL,NULL,NULL,'52330.58','606299.42','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-b3d2d50bd4','M6026','027888','2022/11/02',NULL,NULL,NULL,NULL,NULL,'306705','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-b5ece60468','H1065','100692-3','2022/11/29',NULL,NULL,NULL,NULL,NULL,'1099434.85','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-b8b0ebc153','M6026004','018867','2022/11/08',NULL,NULL,NULL,NULL,NULL,'707480','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-c05777c682','H1065','100760','2022/11/16',NULL,NULL,NULL,NULL,NULL,'1535641.23','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-c637d7d171','M6026','030568','2022/11/01',NULL,NULL,NULL,NULL,NULL,'204470','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-ce2c46f862','H1065','040614','2022/11/03',NULL,NULL,NULL,NULL,NULL,'939173.34','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL),
('1673187207-f35afde2e0','H1143','105875','2022/11/29',NULL,NULL,NULL,NULL,NULL,'1041363.83','0','0','0','0','0','2023-01-08 21:13:27','1626270274-2316',NULL,NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(20) NOT NULL,
  `user_username` varchar(45) DEFAULT NULL,
  `user_password` text DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_mobile_number` varchar(45) DEFAULT NULL,
  `user_status` int(1) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `user_create_at` datetime DEFAULT NULL,
  `user_update_at` datetime DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_last_login` datetime DEFAULT NULL,
  `user_token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
('1626270274-2316','admin','$2b$10$KkBpiebCdya1leckxlHUXO6l/hKWNrL.tx7rWB2jfacdDmFvn9wyO','Supper Admin','0',1,'admin','2021-07-14 20:44:34',NULL,'','2023-01-08 22:16:14','2f62633af16197154e183ed0003ac7448d70e3dd');
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

-- Dump completed on 2023-01-21 13:05:55
