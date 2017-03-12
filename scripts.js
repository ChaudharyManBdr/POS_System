$(function(){
	// GET/READ

	$("#get-button").on('click', function(){
		console.log("test");
				
	// ajax get/read
		$.ajax({
			url: '/products',
			method: 'GET',
			contentType: 'application/json',
			success: function(response){
				var data = response;
				displayItems(data);
			}
		})
	})

	function displayItems(data){
		var tbodyEl = $('tbody');
		tbodyEl.html('');		
		data.item.forEach(function(product){
			
			var content = '<tr>\
				<td class="id"> '+product.id+'\
				</td>\
				<td>\
					<input type="text" class="name" value="'+product.name+'">\
				</td>\
				<td>\
					<button class="update-button">UPDATE</button>\
					<button class="delete-button">DELETE</button>\
				</td>\
			</tr>';
			tbodyEl.append(content);
		 	
		})
	}

	//ajax add product
	$("#create-form").on('submit', function(event){
		event.preventDefault();
		var inputValue = $("#create-input").val();
		
		$.ajax({
			url: '/products',
			method: 'POST',
			contentType: 'applicatio/json',
			data: JSON.stringify({name: inputValue}),
			success: function(response){
				console.log(response);
				$("#create-input").val("");

				$("#get-button").click();
			}
		})
	})
	


	// ajax UPDATE/PUT
	$('table').on('click', '.update-button', function(){
		var rowEl = $(this).closest("tr");
		var id = rowEl.find('.id').text();
		var newName = rowEl.find('.name').val();

		$.ajax({
			url: '/products/' + id,
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({newName: newName}),
			success: function(response){
				console.log(response)
				$('#get-button').click();
			}
		})
	}

	// ajax delete

	$("table").on('click', '.delete-button', function(){
		var rowEl = $(this).closest("tr");
		var id = rowEl.find('.id').text();
 
		$.ajax({
			url: '/products/'+id,
			method: 'DELETE',
			contentType: 'application/json',
			success: function(response){
				console.log(response)
				$('#get-button').click();
			}
		})
	})
	





})