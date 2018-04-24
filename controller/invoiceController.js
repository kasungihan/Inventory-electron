(function() {
	var mysql = require('mysql');

	myApp.controller('InvoiceController', function($scope){

		 $scope.names = [];
		    
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
		  $scope.invoice = {
		    items: [{
		      item_id: $scope.names[1],
		      qty: 1,
		      price: 0,
		      dis: 0
		    }]
		  };
		  $scope.add = function(){
		    $scope.invoice.items.push({
		      item_id: $scope.names[1],
		      qty: 1,
		      price: 0,
		      dis: 0
		    });
		  },
		  $scope.remove = function(index){
		    $scope.invoice.items.splice(index, 1);
		  },
		  $scope.subTotal = function(){
		    var total = 0;
		    angular.forEach($scope.invoice.items, function(item){
		      total += item.qty * item.price;
		    })
		    return total;
		  },
		  $scope.discount = function(total){
		    $scope.details.total = (total - $scope.details.discount);
		  },
		  $scope.addConnection = function(invoiceData, details) {
		      var invData = angular.copy(invoiceData);
		      var invDetails = angular.copy(details);

		     	// Add the credentials to access your database
				var connection = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : null,
				  database : 'inventory'
				});

				connection.connect();

				 connection.query("INSERT INTO invoice_details SET ?", invData,  function(err, res) {
			      if(err){
			          console.log("An error ocurred performing the query.");
			          console.log(err);
			          return;
			      }
			     });
			     
			     connection.query('INSERT INTO invoice SET ?', invDetails, function(err, res) {
				    if(err){
				        console.log("An error ocurred performing the query.");
				        console.log(err);
				        return;
				    }
				  });

				//'UPDATE `stock` SET `qty`= `qty` - 10 WHERE id=1'
				for (var i = 0 in invData) {
					connection.query("UPDATE `stock` SET `qty`= `qty` - "+invData[i].qty+" WHERE item_no='"+invData[i].item_id+"'", function (err, result) {
					    if (err) throw err;
					    console.log(result.affectedRows + " record(s) updated");
					  });
				}
				

				connection.end();
		    }
		    
	});

})();