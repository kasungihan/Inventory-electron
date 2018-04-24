var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : null, // or the original password : 'apaswword'
  database : 'inventory'
});

 connection.connect();

function viewLastId(callback) {
    connection.query('SELECT id FROM add_item ORDER BY id DESC LIMIT 0, 1', function(err, result, field) {
    callback(result);
  });
}

function viewItemId(callback) {
    connection.query('SELECT item_no, item_name FROM add_item WHERE status = '+ 1 +' ORDER BY id DESC', function(err, result, field) {
    callback(result);
  });
}

function insertNewItem(data, setTableId, callback) {

  connection.query('INSERT INTO add_item SET ?', data, function(err, res) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    callback(res);
    console.log("Query succesfully executed");

  });

  if(setTableId.status == 1) {

    connection.query('INSERT INTO stock (item_no) VALUES ("'+ setTableId.item_no +'")', function(err, res) {
      if(err){
          console.log("An error ocurred performing the query.");
          console.log(err);
          return;
      }
      console.log("Query succesfully executed");

    });
  }

}

function viewNewItem(callback) {

  connection.query('SELECT * FROM add_item ORDER BY id DESC, id ASC', function(err, result, field) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    callback(result);
  });

}

function insertItem(data, id, callback) {

	connection.query('UPDATE stock SET ? WHERE item_no = ?',[data, id], function(err, res) {
	  if(err){
	      console.log("An error ocurred performing the query.");
	      console.log(err);
	      return;
	  }
    callback(res);
	  console.log("Query succesfully executed");
	});

}

function viewItem(callback) {

  connection.query('SELECT * FROM stock INNER JOIN add_item ON stock.item_no = add_item.item_no', function(err, result, field) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    callback(result);
  });

}

function insertInvoice(data, callback) {

  connection.query('INSERT INTO invoice SET ?', data, function(err, res) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }
    callback(res);
    console.log("Query succesfully executed");
  });

}

function insertInvoiceDetails(id, data) {
   
   var inv_id = id;
   var val = []

  for (var i = 0; i < data.item_id.length; i++) {
  
    val.push([data.item_id[i], data.qty[i], data.price[i], data.dis[i], data.amount[i]]);
 
  }

   connection.query("INSERT INTO invoice_details (item_id, qty, price, dis, amount) VALUES ?", [val],  function(err, res) {
      if(err){
          console.log("An error ocurred performing the query.");
          console.log(err);
          return;
      }
      console.log("Query succesfully executed");
    });

connection.end()

}




