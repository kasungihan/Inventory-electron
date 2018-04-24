(function() {
	var mysql = require('mysql');

	myApp.controller('AddStockController', function($scope){

		 $scope.names = [];
		 $scope.item = { qty: 0, investment: 0};
		    
		  $scope.init = function () {

		  	var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : null,
				  database : 'inventory'
				});
		  	connection.connect();

		    connection.query("SELECT item_no, item_name FROM add_item WHERE status = "+ 1 +" ORDER BY id DESC", function(err, res) {
		      if(err){
		          console.log("An error ocurred performing the query.");
		          console.log(err);
		          return;
		      }
		      $scope.names = res;
		     });
		    
		    connection.end();
		  };

		  $scope.addStock = function(item) {
		      var item = angular.copy(item);

		     	// Add the credentials to access your database
				var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : null,
				  database : 'inventory'
				});

				connection.connect();

				 connection.query('UPDATE stock SET ? WHERE item_no = ?',[item, item.item_no], function(err, res) {
					  if(err){
					      console.log("An error ocurred performing the query.");
					      console.log(err);
					      return;
					  }
					  console.log("Query succesfully executed");
					});

				connection.end();
		    }
		    
	});

})();