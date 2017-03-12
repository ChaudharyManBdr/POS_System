var express = require('express');
var app = express();

var bodyParser = require('body-parser')


app.use(express.static(__dirname));
app.use(bodyParser.json());

var products = [
	{
		id: 1,
		name: 'laptop'
	},
	{
		id: 2,
		name: 'charger'
	}
];

var currentId = 2;

app.get('/products', function(req, res){
	res.send({item: products});
})

app.post('/products', function(req, res){
	var prodcutName = req.body.name;
	currentId++;
	products.push({
		id: currentId,
		name: prodcutName
	})
})

app.put('/products/:id', function(res, res){
	var id = req.params.id;
	var newName = req.body.newName;

	var found = false;

	products.forEach(function(item, index){
		if(!found && item.id === Number(id)){
			item.name = newName;
		}
	})
	res.send('Successfully updated');
})

app.delete('/products/:id', function(req, res){
	var id = req.params.id;
	var found = false;

	products.forEach(function(item, index){
		if(!found && item.id === Number(id)){
			item.splice(index, 1);
		}
	})
	res.send("Successfully deleted!");
})

app.listen(3000, function(){
	console.log('Server listening on 3000')
});
