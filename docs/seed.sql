/* 
select * from lessons;
delete from lessons;
ALTER TABLE lessons AUTO_INCREMENT = 1;
*/

USE schedule;

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

