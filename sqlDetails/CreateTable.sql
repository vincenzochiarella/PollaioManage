-- MySQL Script generated by MySQL Workbench
-- Wed Jun 26 18:24:05 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Chickenshouse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Chickenshouse` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Chickenshouse` (
  `idchickenshouse` INT NOT NULL AUTO_INCREMENT,
  `owner` VARCHAR(45) NULL,
  `latitude` FLOAT NULL,
  `longitude` FLOAT NULL,
  `ipCamera` VARCHAR(45) NULL,
  `doorStatus` INT(1) NULL,
  PRIMARY KEY (`idchickenshouse`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`access` ;

CREATE TABLE IF NOT EXISTS `mydb`.`access` (
  `idaccess` INT NOT NULL,
  `users_idUser` INT NOT NULL,
  `chickenshouse_idchickenshouse` INT NOT NULL,
  PRIMARY KEY (`idaccess`),
  INDEX `fk_access_users_idx` (`users_idUser` ASC) VISIBLE,
  INDEX `fk_access_chickenshouse1_idx` (`chickenshouse_idchickenshouse` ASC) VISIBLE,
  CONSTRAINT `fk_access_users`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `mydb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_access_chickenshouse1`
    FOREIGN KEY (`chickenshouse_idchickenshouse`)
    REFERENCES `mydb`.`Chickenshouse` (`idchickenshouse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Temperatures`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Temperatures` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Temperatures` (
  `dateTime` DATETIME NOT NULL,
  `celsius` VARCHAR(45) NOT NULL,
  `chickenshouse_idchickenshouse` INT NOT NULL,
  PRIMARY KEY (`dateTime`),
  INDEX `fk_temperatures_chickenshouse1_idx` (`chickenshouse_idchickenshouse` ASC) VISIBLE,
  CONSTRAINT `fk_temperatures_chickenshouse1`
    FOREIGN KEY (`chickenshouse_idchickenshouse`)
    REFERENCES `mydb`.`Chickenshouse` (`idchickenshouse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`logDoorMovement`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`logDoorMovement` ;

CREATE TABLE IF NOT EXISTS `mydb`.`logDoorMovement` (
  `dateTime` DATETIME NOT NULL,
  `from` VARCHAR(45) NOT NULL,
  `to` VARCHAR(45) NOT NULL,
  `chickenshouse_idchickenshouse` INT NOT NULL,
  PRIMARY KEY (`dateTime`),
  INDEX `fk_logDoorMovement_chickenshouse1_idx` (`chickenshouse_idchickenshouse` ASC) VISIBLE,
  CONSTRAINT `fk_logDoorMovement_chickenshouse1`
    FOREIGN KEY (`chickenshouse_idchickenshouse`)
    REFERENCES `mydb`.`Chickenshouse` (`idchickenshouse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SunMoovement`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`SunMoovement` ;

CREATE TABLE IF NOT EXISTS `mydb`.`SunMoovement` (
  `dateSunMoovement` DATE NOT NULL,
  `sunrise` TIME NOT NULL,
  `sunset` TIME NOT NULL,
  `Chickenshouse_idchickenshouse` INT NOT NULL,
  PRIMARY KEY (`dateSunMoovement`),
  INDEX `fk_SunMoovement_Chickenshouse1_idx` (`Chickenshouse_idchickenshouse` ASC) VISIBLE,
  CONSTRAINT `fk_SunMoovement_Chickenshouse1`
    FOREIGN KEY (`Chickenshouse_idchickenshouse`)
    REFERENCES `mydb`.`Chickenshouse` (`idchickenshouse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;