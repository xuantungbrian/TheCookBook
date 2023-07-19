CREATE TABLE IF NOT EXISTS User (  
    Name char(50),
    ID INT  PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS NutritionValue (
    ID INT,
    Calories INT,
    Protein INT,
    Fat INT,
    PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS RecipesContain (
    Difficulty CHAR(50),
    Name CHAR(50),
    NutID INT NOT NULL,
    PRIMARY KEY (Name),
    FOREIGN KEY (NutID) REFERENCES NutritionValue(ID)
		ON DELETE NO ACTION
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Makes (
    ID INT,
    RecName CHAR(50),
    PRIMARY KEY (ID, RecName),
    Foreign Key (RecName) References RecipesContain(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    Foreign Key (ID) References User(ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS  Eatery (
    Name CHAR(50),
    Culture CHAR(50),
    FoodType CHAR(50),
    PRIMARY KEY (Name)
);
CREATE TABLE IF NOT EXISTS  GoTo (
    ID INT,
    Name CHAR(50),
    PRIMARY KEY (ID, Name),
    FOREIGN KEY (ID) REFERENCES User(ID)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Name) REFERENCES Eatery(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  BranchHas2 (
    PostalCode CHAR(50),
    Province CHAR(2),
    City CHAR(50),
    PRIMARY KEY (PostalCode)
);
CREATE TABLE IF NOT EXISTS  BranchHas1 (
    DriveThrough INT,
    Street CHAR(50),
    PostalCode CHAR(50),
    UnitNumber INT,
    Selfservice INT,
    EatName CHAR(50) NOT NULL,
    PRIMARY KEY (Street, PostalCode, UnitNumber, EatName),
    FOREIGN KEY (PostalCode) REFERENCES BranchHas2(PostalCode)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (EatName) REFERENCES Eatery(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS  Equipment (
    Name CHAR(50),
    Material CHAR(50),
    PRIMARY KEY (Name) 
);
CREATE TABLE IF NOT EXISTS  Uses (
    EquipName CHAR(50),
    RecName CHAR(50),
    PRIMARY KEY (EquipName , RecName),
    FOREIGN KEY (EquipName) REFERENCES Equipment (Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (RecName) REFERENCES RecipesContain (Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS  Own (
    ID INT,
    EquipName CHAR(50),
    PRIMARY KEY(ID, EquipName),
    FOREIGN KEY (ID) REFERENCES User(ID)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (EquipName) REFERENCES Equipment(Name)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Ingredient (
    Name CHAR(50),
    Origin CHAR(50),
    PRIMARY KEY(Name)
);

CREATE TABLE IF NOT EXISTS  Possess (
    ID INT,
    IngName CHAR(50),
    PRIMARY KEY(ID, IngName),
    FOREIGN KEY (ID) REFERENCES User(ID)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (IngName) REFERENCES Ingredient(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Meat (
    Animal CHAR(50),
    Cut CHAR(50),
    FreeRange INT,
    Name CHAR(50),
    PRIMARY KEY(Name),
    FOREIGN KEY (Name) REFERENCES Ingredient(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Vegetable (
    Organic CHAR(50),
    Name CHAR(50),
    PRIMARY KEY(Name),
    FOREIGN KEY (Name) REFERENCES Ingredient(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Others (
    GlutenFree INT,
    Name CHAR(50),
    PRIMARY KEY(Name),
    FOREIGN KEY (Name) REFERENCES Ingredient(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Cook (
    RecName CHAR(50),
    IngName CHAR(50),
    Unit CHAR(50),
    Quantity INT,
    PRIMARY KEY(RecName, IngName),
    FOREIGN KEY (RecName) REFERENCES RecipesContain(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (IngName) REFERENCES Ingredient(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  Preservation (
    Methods CHAR(50),
    Time CHAR(50),
    PRIMARY KEY(Methods, Time)
);
CREATE TABLE IF NOT EXISTS  Requires (
    RecName CHAR(50),
    PreserveMethod CHAR(50),
    PRIMARY KEY(RecName , PreserveMethod ),
    FOREIGN KEY (RecName) REFERENCES RecipesContain(Name)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (PreserveMethod) REFERENCES Preservation(Methods)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


INSERT IGNORE INTO User(Name, ID) VALUES
('Daniel', '1'),
('Eric', '2'),
('Tung', '3'),
('Albert', '4'),
('Sam', '5');


INSERT IGNORE INTO NutritionValue(ID, Calories, Protein, Fat) VALUES
('1', '70', '2', '1'),
('2', '300', '30', '20'),
('3', '350', '4', '20'),
('4', '140', '12', '10'),
('5', '240', '12', '15');

INSERT IGNORE INTO RecipesContain(Difficulty, Name, NutID) VALUES
('Easy', 'Zucchini Smoothie', 1),
('Hard', 'Grilled Tomahawk Steak', 2),
('Medium', 'Maple Cupcakes', 3),
('Easy', 'Scrambled Eggs', 4),
('Easy', 'Scotch Eggs', 5);

INSERT IGNORE INTO Makes(ID, RecName) VALUES
('1', 'Zucchini Smoothie'),
('2', 'Zucchini Smoothie'),
('3', 'Zucchini Smoothie'),
('4', 'Grilled Tomahawk Steak'),
('5', 'Maple Cupcakes');

INSERT IGNORE INTO Eatery(Name, Culture, FoodType) VALUES
('Sula Indian Restaurant', 'Indian', 'Traditional Restaurant'),
('Tim Hortons', 'Western', 'Fast food'),
('McDonalds', 'Western', 'Fast food'),
('Starbucks', 'Western', 'Coffee'),
('French Table', 'French', 'Traditional Restaurant');

INSERT IGNORE INTO GoTo(ID, Name) VALUES
('1', 'Sula Indian Restaurant'),
('2', 'Starbucks'),
('3', 'Tim Hortons'),
('4', 'French Table'),
('5', 'McDonalds');

INSERT IGNORE INTO Equipment(Name, Material) VALUES
('Oven', 'Stainless steel'),
('Mixers', 'Stainless steel'),
('Cutting board', 'Wood'),
('Refrigerator', 'Stainless steel'),
('Spatula', 'Stainless steel');

INSERT IGNORE INTO Ingredient(Name, Origin) VALUES
('Canola Oil', 'AB'),
('Salt', 'AB'),
('Rice', 'NS'),
('Tomatoes', 'ON'),
('Potatoes', 'BC'),
('Beef Rib', 'AB'),
('Beef Loin', 'AB'),
('Fish Tail', 'NS'),
('Chicken Wing', 'ON'),
('Chicken Breast', 'ON'),
('Carrots', 'AB'),
('Corn', 'AB'),
('Peas', 'AB'),
('Onions', 'AB'),
('Zucchini', 'AB');

INSERT IGNORE INTO Preservation(Time, Methods) VALUES
('3m', 'Blanching'),
('15s', 'Pasteurization'),
('15m', 'Sterilization'),
('1d', 'Cool storage'),
('2d', 'Fermentation');

INSERT IGNORE INTO Meat(Animal, Cut, FreeRange, Name) VALUES
('Cow', 'Rib', '1', 'Beef Rib'),
('Cow', 'Loin', '1', 'Beef Loin'),
('Fish', 'Tail', '0', 'Fish Tail'),
('Chicken', 'Breast', '0', 'Chicken Breast'),
('Chicken', 'Wing', '1', 'Chicken Wing');

INSERT IGNORE INTO Vegetable(Organic, Name) VALUES
('1', 'Potatoes'),
('1', 'Carrots'),
('1', 'Corn'),
('1', 'Peas'),
('1', 'Onions');

INSERT IGNORE INTO Others(GlutenFree, Name) VALUES
('1', 'Canola oil'),
('1', 'Tomatoes'),
('1', 'Rice'),
('1', 'Salt'),
('1', 'Zucchini');

INSERT IGNORE INTO BranchHas2(PostalCode, Province, City) VALUES
('V5L 3X2', 'BC', 'Vancouver'),
('V5P 3W2', 'BC', 'Vancouver'),
('V5V 4E7', 'BC', 'Vancouver'),
('V5R 3L9', 'BC', 'Vancouver'),
('M5V 3M2', 'ON', 'Toronto');

INSERT IGNORE INTO BranchHas1(DriveThrough, Street, PostalCode, UnitNumber, Selfservice, EatName) VALUES
('0', 'Commercial Drive', 'V5L 3X2', '1128', '0', 'Sula Indian Restaurant'),
('1', 'Fraser St', 'V5V 4E7', '4064', '1', 'Tim Hortons'),
('1', 'Victoria Dr', 'V5P 3W2', '5661', '1', 'McDonalds'),
('0', 'Catherines St', 'V5P 3W2', '1128', '1', 'Starbucks'),
('0', 'Calgary St', 'V5L 3X2', '2068', '0', 'French Table');

INSERT IGNORE INTO Uses(EquipName, RecName) VALUES
('Mixers', 'Zucchini Smoothie'),
('Cutting board', 'Grilled Tomahawk Steak'),
('Oven', 'Maple Cupcakes'),
('Spatula', 'Scrambled Eggs'),
('Spatula', 'Scotch Eggs');

INSERT IGNORE INTO Own(ID, EquipName) VALUES
('1', 'Mixers'),
('2', 'Mixers'),
('3', 'Mixers'),
('4', 'Cutting board'),
('5', 'Oven');

INSERT IGNORE INTO Possess(ID, IngName) VALUES
('1', 'Zucchini'),
('2', 'Zucchini'),
('3', 'Zucchini'),
('4', 'Beef Loin'),
('5', 'Canola Oil');

INSERT IGNORE INTO Cook(RecName, IngName, Unit, Quantity) VALUES
('Zucchini Smoothie', 'Zucchini', 'Gram', '100'),
('Grilled Tomahawk Steak', 'Beef Loin', 'Gram', '200'),
('Maple Cupcakes', 'Canola Oil', 'TableSpoon', '3'),
('Scrambled Eggs', 'Canola Oil', 'TableSpoon', '1'),
('Scotch Eggs', 'Canola Oil', 'TableSpoon', '2');

INSERT IGNORE INTO Requires(RecName, PreserveMethod) VALUES
('Zucchini Smoothie', 'Cool storage'),
('Grilled Tomahawk Steak', 'Cool storage'),
('Maple Cupcakes', 'Cool storage'),
('Scrambled Eggs', 'Cool storage'),
('Scotch Eggs', 'Cool storage');

 




