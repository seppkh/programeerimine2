
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




-- -----------------------------------------------------
-- Insert SEED
-- -----------------------------------------------------

USE `schedule`;

INSERT INTO users(firstName, lastName, email, password, role, dateCreated) VALUES
  ('Admin', 'Admin', 'admin@admin.ee', '$2b$10$nevnzRS0jBjFh.KEYSoQ6u75M7FdLA7vXEgbbV9iHfU7W/.6W9hFa', 'Admin', Now()),
  ('Juku', 'Juurikas', 'juku@juurikas.ee', '$2b$10$AkiS2VBzORkDESiXYOc2L.dFgZBykCDAnb5R1F41wp0sSfcPmhl9C', 'User', Now());
  
  INSERT INTO teachers(createdBy, name, dateCreated) VALUES
  (1, 'Martti Raavel', Now()),
  (1, 'Mari Kuli', Now()),
  (1, 'Andrus Rinde', Now()),
  (1, 'Priidu Paomets', Now()),
  (1, 'Jaagup Kippar', Now()),
  (1, 'Laura Hein', Now());
  
  INSERT INTO subjects(createdBy, name, EAP, dateCreated) VALUES
  (1, 'Programmeerimine 2', 3, Now()),
  (1, 'Veebirakendused', 3, Now()),
  (1, 'Veebiraamistikud', 3, Now()),
  (1, 'Kujundusgraafika', 4, Now()),
  (1, 'Erialane inglise keel', 6, Now()),
  (1, 'Andmebaasid', 3, Now()),
  (1, 'Multimeedium', 4, Now());
  
  INSERT INTO rooms(createdBy, name, dateCreated) VALUES
  (1, 'Arvutilabor 203', Now()),
  (1, 'Arvutilabor 205', Now()),
  (1, 'Auditoorium 207', Now()),
  (1, 'Auditoorium 301', Now());
  
  INSERT INTO courses(createdBy, name, dateCreated) VALUES
  (1, 'Rakendusinformaatika 1', Now()),
  (1, 'Rakendusinformaatika 2', Now());
  
  INSERT INTO lessons(createdBy, startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment, dateCreated) VALUES
  (1, '2021-12-16 10:00:00', '2021-12-16 13:15:00', 4,2, 1,1,3,null,Now()),
  (1, '2021-12-17 14:15:00', '2021-12-17 17:30:00', 4,2, 4,6,1,"Eksam",Now()),
  (1, '2021-12-18 10:00:00', '2021-12-18 13:15:00', 4,2, 5,2,4,null,Now()),
  (1, '2021-12-18 14:15:00', '2021-12-18 17:30:00', 4,2, 2,5,3,"Toimub ka zoomis",Now()),
  (1, '2021-12-18 10:00:00', '2021-12-18 13:15:00', 4,1, 7,3,2,null,Now());