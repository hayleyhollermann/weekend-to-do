CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250),
	"complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" ("task")
	VALUES('Grocery shopping');
	
INSERT INTO "tasks" ("task")
	VALUES('Watch football');
	
INSERT INTO "tasks" ("task")
	VALUES('Complete Assignment');
	
INSERT INTO "tasks" ("task")
	VALUES('Do laundry');
	
INSERT INTO "tasks" ("task")
	VALUES('Pay car insurance');
	
INSERT INTO "tasks" ("task")
	VALUES('Decide on Halloween costume');
	
INSERT INTO "tasks" ("task")
	VALUES('Pick up Hartley from parents house');
	
INSERT INTO "tasks" ("task")
	VALUES('Meal prep for the week');
	

	


SELECT * FROM "tasks"