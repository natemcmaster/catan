-- warning: this complete resets the database

PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS commands;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS players;

CREATE TABLE "commands" (
"id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL ,
"game_id" INTEGER NOT NULL , 
"json_blob" BLOB, 
foreign key(game_id) references games(id) on delete cascade 
);

CREATE TABLE "games" (
"id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , 
"current_state" BLOB, 
"original_state" BLOB, 
"last_command_id" INTEGER DEFAULT -1
);

CREATE TABLE "users" (
"id" INTEGER PRIMARY KEY  NOT NULL ,
"username" VARCHAR NOT NULL  DEFAULT (null) ,
"password" VARCHAR NOT NULL  DEFAULT (null) 
);

CREATE TABLE "players" (
"user_id" INTEGER NOT NULL ,
"game_id" INTEGER NOT NULL ,
foreign key(user_id) REFERENCES users(id) on delete cascade,
foreign key(game_id) REFERENCES games(id) on delete cascade
);

INSERT INTO users (username,password,id) VALUES('Sam','sam',0);
INSERT INTO users (username,password,id) VALUES('Brooke','brooke',1);
INSERT INTO users (username,password,id) VALUES('Quinn','quinn',3);
INSERT INTO users (username,password,id) VALUES('Mark','mark',5);
INSERT INTO users (username,password,id) VALUES('Nate','nate',39);
INSERT INTO users (username,password,id) VALUES('Jared','jared',40);
INSERT INTO users (username,password,id) VALUES('Spence','spence',41);
INSERT INTO users (username,password,id) VALUES('Alan','alan',42);
INSERT INTO users (username,password,id) VALUES('Chris','chris',43);
