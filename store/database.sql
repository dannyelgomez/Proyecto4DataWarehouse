CREATE DATABASE DB_DATAWAREHOUSE;
USE DB_DATAWAREHOUSE;

-- Table Creation
CREATE TABLE region (
  region_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (150) NOT NULL
);

INSERT INTO
  region
VALUES
  (NULL,"Sur América"),
  (NULL,"Europa"),
  (NULL,"Asia"),
  (NULL,"África"),
  (NULL,"Norte América");

   
CREATE TABLE countries (
  countries_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (150) NOT NULL,
    region_id INT NOT NULL DEFAULT "0",
    FOREIGN KEY (region_id) REFERENCES region(region_id)
);

-- Populate countries table
INSERT INTO
  countries
VALUES
  (NULL,"Colombia",1),
  (NULL,"Brasil",1),
  (NULL,"Italia",2),
  (NULL,"Francia",2),
  (NULL,"China",3),
  (NULL,"Tailandoia",3),
  (NULL,"Nigeria",4),
  (NULL,"Egipto",4),
  (NULL,"Estados Unidos",5),
  (NULL,"Canadá",5);

  
CREATE TABLE cities (
  cities_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (150) NOT NULL,
  countries_id INT NOT NULL DEFAULT "0",
  FOREIGN KEY(countries_id) REFERENCES countries(countries_id)
);

-- Populate cities table
INSERT INTO
  cities
VALUES
  (NULL,"Medellín",1),
  (NULL,"Brasilia",2),
  (NULL,"Florencia",3),
  (NULL,"Lyon",4),
  (NULL,"Wuhan",5),
  (NULL,"Bangkok",6),
  (NULL,"Tabelot",7),
  (NULL,"Cairo",8),
  (NULL,"Miami",9),
  (NULL,"Ontario",10);

CREATE TABLE companies (
  companies_id INT PRIMARY KEY AUTO_INCREMENT,
  nit INT NOT NULL,
  name VARCHAR (150) NOT NULL,
  phone INT NOT NULL,
  email VARCHAR (150) NOT NULL,
  address VARCHAR (150) NOT NULL,
  cities_id INT NOT NULL DEFAULT "0",
  FOREIGN KEY(cities_id) REFERENCES cities(cities_id)
);

INSERT INTO
  companies
VALUES
  (NULL, 1, "Acámica", 1234567,"admin@acamica.com", "Calle 101 #14-45", 6),
  (NULL, 2, "Sumanti", 2345678,"admin@sumanti.com", "Cra 14 # 45-10", 9),
  (NULL, 3, "Bancolombia", 3456789,"admin@bancolombia.com","Calle 35 #66B-30", 1);
  

CREATE TABLE contacts (
  contacts_id INT PRIMARY KEY AUTO_INCREMENT,
  id INT,
  fullName VARCHAR (150) NOT NULL,
  email VARCHAR (150) NOT NULL,
  position VARCHAR (150) NOT NULL,
  channel VARCHAR (150) NOT NULL,
  interest INT NOT NULL,
  companies_id INT NOT NULL DEFAULT "0",
  FOREIGN KEY(companies_id) REFERENCES companies(companies_id)
);

-- Populate contacts table
INSERT INTO
  contacts
VALUES
  (NULL, 1357,"David Zapata","dzapata2@yahoo.es", "developer", "whatsapp", 60, 1);


  -- Table Creation
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR (60) NOT NULL,
  password VARCHAR (60) NOT NULL,
  first_name VARCHAR(60) NOT NULL,
  last_name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  role VARCHAR(15) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Populate users table
INSERT INTO
  users
VALUES
  (NULL,"daniel","danny123","Daniel", "Gómez","danny57@gmail.com",3007243432,"Cra 14 # 8-12",TRUE,FALSE)