--seed categories
CREATE TABLE "seeds" (
  "id" SERIAL PRIMARY KEY,
  "seed_category" VARCHAR(50) NOT NULL
);

--user info
CREATE TABLE "user_info" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(100) NOT NULL,
  "first_name" VARCHAR(25),
  "last_name" VARCHAR(25),
  "latitude" NUMERIC,
  "longitude" NUMERIC,
  "formatted_address" VARCHAR(300),
  "profile_pic" VARCHAR(150)
);

--user's seed inventory
CREATE TABLE "user_seed_inventory" (
  "id" SERIAL PRIMARY KEY,
  "description" VARCHAR(250),
  "quantity" INT DEFAULT 0,
  "seed_id" INT REFERENCES "seeds",
  "user_id" INT REFERENCES "user_info",
  "date_added" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--messages between users
CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "message" VARCHAR(500) NOT NULL,
  "sent_by" INT REFERENCES user_info,
  "received_by" INT REFERENCES user_info,
  "line_item" INT REFERENCES user_seed_inventory,
  "quantity" INT DEFAULT 0,
  "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "status" BOOLEAN DEFAULT FALSE
);


--data for seed categories
INSERT INTO seeds ("seed_category")
VALUES
('Artichoke'),
('Arugula'),
('Asian Greens'),
('Bean'),
('Beet'),
('Broccoli'),
('Brussels Sprouts'),
('Cabbage'),
('Carrot'),
('Cauliflower'),
('Celery'),
('Collard'),
('Corn'),
('Cowpea'),
('Cucumber'),
('Eggplant'),
('Endive'),
('Garden Huckleberry'),
('Garlic'),
('Gourd'),
('Ground Cherry'),
('Kale'),
('Kohlrabi'),
('Leek'),
('Lettuce'),
('Lima Bean'),
('Melon'),
('Okra'),
('Onion'),
('Orach'),
('Pea'),
('Pepper'),
('Potatoes'),
('Radish'),
('Runner Bean'),
('Rutabaga'),
('Salsify'),
('Shallots'),
('Sorghum'),
('Soybean'),
('Spinach'),
('Squash'),
('Sunberry'),
('Swiss Chard'),
('Tomatillo'),
('Tomato'),
('Turnip'),
('Watermelon');