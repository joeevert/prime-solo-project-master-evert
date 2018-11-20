CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

--user info
CREATE TABLE user_info (
	id SERIAL PRIMARY KEY,
	username VARCHAR(80) UNIQUE NOT NULL,
	password VARCHAR(1000) NOT NULL,
	first_name VARCHAR(25) NOT NULL,
	last_name VARCHAR(25) NOT NULL,
	latitude INT,
	longitude INT,
	contact_info VARCHAR(150),
	profile_pic VARCHAR(150)
);


--user's seed inventory
CREATE TABLE user_seed_inventory (
	id SERIAL PRIMARY KEY,
	seed_description VARCHAR(250) NOT NULL,
	quantity INT NOT NULL,
	seed_id INT NOT NULL,
	user_id INT NOT NULL,
	date_added DATE NOT NULL
);


--seed info
CREATE TABLE seeds (
	id SERIAL PRIMARY KEY,
	seed_name VARCHAR(50) NOT NULL,
	quantity INT NOT NULL,
	user_id INT NOT NULL
);


--messages between users
CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	message VARCHAR(500) NOT NULL,
	sent_to INT REFERENCES "user_info",
	received_by INT REFERENCES "user_info",
	date DATE NOT NULL,
	status BOOLEAN DEFAULT FALSE
);