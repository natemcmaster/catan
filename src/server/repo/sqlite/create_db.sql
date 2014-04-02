CREATE TABLE "commands" (
"id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL ,
"game_id" INTEGER NOT NULL , 
"json_blob" BLOB, 
foreign key(game_id) references games(id) on delete cascade 
);

CREATE TABLE "games" (
"id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , 
"current_state" BLOB, "original_state" BLOB, 
"last_command_id" INTEGER DEFAULT -1, 
foreign key(last_command_id) references commands(id) on delete set null
);

CREATE TABLE "users" (
"id" INTEGER PRIMARY KEY  NOT NULL ,
"username" VARCHAR NOT NULL  DEFAULT (null) ,
"password" VARCHAR NOT NULL  DEFAULT (null) 
);