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

app.post('/products/:name', function(req, res){
	var prodcutName = req.params.name; 
	currentId++;
	products.push({
		id: currentId,
		name: prodcutName
	});
	 console.log(products.length);
})

app.put('/products/:id', function(res, res){
	var id = req.params.id;
	var newName = req.body.newName;
	
	products.forEach(function(item, index){
		if(item['id'] == Number(id)){
			item['name'] = newName;
		}
	})
	res.send('Successfully updated');
})

app.delete('/products/:id', function(req, res){
	var id = req.params.id;
	products.forEach(function(item, index){
		
		if(item['id'] == Number(id)){
			products.splice(index, 1);
		}
	})
	res.send("Successfully deleted!");
})

app.listen(3000, function(){
	console.log('Server listening on 3000')
});
