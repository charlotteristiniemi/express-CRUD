var connection = require('../connection');

connection.connect(); //connect to database


/*
 * GET Home Page.	
 */

exports.home = function (req, res) {

	connection.query( 'SELECT * FROM Stories' , function (err1, row1, field1) {

		if (err1) console.log(err1);

		connection.query( 'SELECT * FROM Categories' , function (err2, row2, field2) {
	
			if (err2) console.log(err2);

			res.render('index',{page_title:"Startsida", data:row1, cData:row2});
		});
	});
};


/*
 * GET Add New Story Page.	
 */

exports.add = function (req, res) {

	connection.query( 'SELECT CategoryName, CategoryID FROM Categories' , function (err, row, field) {

		if (err) console.log(err);

		res.render('add_new_story',{page_title:"Lägg till ny rolig historia!", data:row});
	
	});
};


/*
 * POST Save New Story, saving content to DB and redirect to Home Page.
 */

 exports.save = function (req, res) {
 	
 	var input = req.body;

 	var data = {
 		title 		: input.title,
 		categoryid: input.categoryid,
 		story 		: input.story
 	};

 	// console.log(input);
 	// console.log(data);

 	connection.query( "INSERT INTO Stories (CategoryID, Title, Content) " +
 		"VALUES ('" + data.categoryid + "', '" + data.title + "', '" + data.story + "');", function (err, row, field) {
 		
 		if (err) console.log(err);
 		res.sendStatus(200);
  });
 };

 /*
 	* GET Edit Story Page.	
 	*/

exports.edit = function (req, res) {

	var storyId = req.params.id;

	connection.query( 'SELECT * FROM Stories WHERE StoryID =' + storyId + ';' , function (err1, row1, field1) {

		if (err1) console.log(err1);

		connection.query( 'SELECT * FROM Categories' , function (err2, row2, field2) {
	
			if (err2) console.log(err2);

			res.render('edit_story',{page_title:"Ändra rolig historia!", data:row1, cData:row2});
		});
	});
};


 /*
 	* GET Delete Story Page.	
 	*/

exports.delete = function (req, res) {

	var storyId = req.params.id;

	connection.query( 'DELETE FROM Stories WHERE StoryID = ?',  [storyId], function (err, row, field) {

		res.redirect('/');
	});
};


/*
 * PUT Update Story, saving content to DB and redirect to Home Page.
 */

 exports.update = function (req, res) {
 	
 	var input = req.body;
 	var storyid = req.params.id;

 	var data = {
 		title 		: input.title,
 		categoryid: input.categoryid,
 		story 		: input.story
 	};

 	connection.query( "UPDATE Stories "+
 		"SET CategoryID='" + data.categoryid + "', Title='" + data.title + "', Content='" + data.story + "' "+
 		"WHERE StoryID=" + storyid + ";", function (err, row, field) {
 		
 		if (err) console.log(err);

 		res.sendStatus(200); //SKA FUNGERA MEN GÖR DET EJ??????
  });
 };


/*
 * POST Filter or Sort or Search
 */

exports.filterSortSearch = function (req, res) {

	if(req.body.filter !== undefined) {
		//Gör filtergrejer 
		filter(req.body.filter, res);
	}
	else if (req.body.sort !== undefined) {
		//Gör soretiringsgrejer
		sort(req.body.sort, res);
	}
	else {
		//Gör sökgrejer
		search(req.body.search, res);
	}
};


/*
 * Functions
 */

// Filter
function filter(filterType, res) {
	
	connection.query( "SELECT * FROM Stories WHERE CategoryID='" + filterType + "';", function (err1, row1, field1) {
	
		if (err1) console.log(err1);
	
		connection.query( 'SELECT * FROM Categories' , function (err2, row2, field2) {
	
			if (err2) console.log(err2);

			res.render('index',{page_title:"Startsida", data:row1, cData:row2});
		});
	});
};

// Sort
function sort(sortType, res) {

	switch (sortType){
		case 1: 
			sortType = 'Title ASC';
			break;
		case 2: 
			sortType = 'Title DESC';
			break;
		case 3: 
			sortType = 'StoryID DESC';
			break;
		case 4: 
			sortType = 'StoryID ASC';
			break;
		default: 
			sortType = 'Title ASC';
			break;
	}

	connection.query( "SELECT * FROM Stories ORDER BY " + sortType + ";", function (err1, row1, field1) {
	
		if (err1) console.log(err1);
	
		connection.query( 'SELECT * FROM Categories' , function (err2, row2, field2) {
	
			if (err2) console.log(err2);

			res.render('index',{page_title:"Startsida", data:row1, cData:row2});
		});
	});
};

// Search
function search(searchType, res) {
	
	connection.query( "SELECT * FROM Stories WHERE Title LIKE '%" + searchType + "%';", function (err1, row1, field1) {
	
		if (err1) console.log(err1);
	
		connection.query( 'SELECT * FROM Categories' , function (err2, row2, field2) {
	
			if (err2) console.log(err2);

			res.render('index',{page_title:"Startsida", data:row1, cData:row2});
		});
	});
};
