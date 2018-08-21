$(function(){

	let key = 'dzZgAZranf7MqvWYJZPpgnFw9uaaZVcZ';



	if($('#index').length > 0){

		let urlUser = 'https://api.behance.net/v2/users/hmengert40a84?client_id='+key;
		$.ajax({
			url:urlUser,
			dataType:'jsonp', // p means padded json . 
			success:function(res){
				console.log(res)
				var user = res.user;


				$('<h1>'+user.display_name+'</h1>').appendTo('.container .left')
				$('<img src="'+user.images[50]+'" alt="">').appendTo('.container .right')
			} // res stands for response


			
	
		});	

	}
});