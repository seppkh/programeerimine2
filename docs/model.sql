-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema schedule
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema schedule
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `schedule` DEFAULT CHARACTER SET utf8 ;
USE `schedule` ;

-- -----------------------------------------------------
-- Table `schedule`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL,
  `dateUpdated` DATETIME NULL,
  `dateDeleted` DATETIME NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `schedule`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdBy` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NULL,
  `dateUpdated` DATETIME NULL,
  `dateDeleted` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `createdBy_idx` (`createdBy` ASC) VISIBLE,
  CONSTRAINT `createdBy2`
    FOREIGN KEY (`createdBy`)
    REFERENCES `schedule`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `schedule`.`teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdBy` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NULL,
  `dateUpdated` DATETIME NULL,
  `dateDeleted` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `createdBy_idx` (`createdBy` ASC) VISIBLE,
  CONSTRAINT `createdBy1`
    FOREIGN KEY (`createdBy`)
    REFERENCES `schedule`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `schedule`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdBy` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NULL,
  `dateUpdated` DATETIME NULL,
  `dateDeleted` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `createdBy_idx` (`createdBy` ASC) VISIBLE,
  CONSTRAINT `createdBy4`
    FOREIGN KEY (`createdBy`)
    REFERENCES `schedule`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `schedule`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdBy` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `EAP` INT NOT NULL,
  `dateCreated` DATETIME NULL,
  `dateUpdated` DATETIME NULL,
  `dateDeleted` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `createdBy_idx` (`createdBy` ASC) VISIBLE,
  CONSTRAINT `createdBy3`
    FOREIGN KEY (`createdBy`)
    REFERENCES `schedule`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `schedule`.`lessons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdBy` INT NOT NULL,
  `startTime` DATETIME NOT NULL,
  `endTime` DATETIME NOT NULL,
  `duration` INT NOT NULL,
  `courseId` INT NOT NULL,
  `subjectId` INT NOT NULL,
  `teacherId` INT NOT NULL,
  `roomId` INT NOT NULL,
  `comment` MEDIUMTEXT NULL,
  `dateCreated` DATETIME NULL,
  `dateUpdated` DATETIME NULL,
  `dateDeleted` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `course_id_idx` (`courseId` ASC) VISIBLE,
  INDEX `teacher_id_idx` (`teacherId` ASC) VISIBLE,
  INDEX `subject_id_idx` (`subjectId` ASC) VISIBLE,
  INDEX `room_id_idx` (`roomId` ASC) VISIBLE,
  INDEX `createdBy_idx` (`createdBy` ASC) VISIBLE,
  CONSTRAINT `course_id`
    FOREIGN KEY (`courseId`)
    REFERENCES `schedule`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `teacher_id`
    FOREIGN KEY (`teacherId`)
    REFERENCES `schedule`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `subject_id`
    FOREIGN KEY (`subjectId`)
    REFERENCES `schedule`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `room_id`
    FOREIGN KEY (`roomId`)
    REFERENCES `schedule`.`rooms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `createdBy5`
    FOREIGN KEY (`createdBy`)
    REFERENCES `schedule`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
