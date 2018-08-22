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


				$('<h1>'+user.display_name+'</h1>').appendTo('.container .name')
				$('<p>'+user.sections["About Me"]+'</p>').appendTo('.container .blurb')
				$('<p> Address: '+user.location+'</p>').appendTo('.container .contact')
				$('<p> Occupation: '+user.occupation+'</p>').appendTo('.container .contact')
				$('<p> <i class="fab fa-twitter-square"></i> '+user.twitter+'</p>').appendTo('.container .contact')
				$('<p> <i class="fab fa-squarespace"></i> '+user.website+'</p>').appendTo('.container .contact')
			} // res stands for response
	
		});	

		let urlProjects = 'https://api.behance.net/v2/users/hmengert40a84/projects?client_id='+key;

		$.ajax({
			url:urlProjects,
			dataType:'jsonp', // p means padded json . 
			success:function(res){ // res stands for response
			
			_(res.projects).each(function(project){ //looping through the lsit of projects to get each project
					console.log(project);
					$('<li>'+project.name+'	<img src="'+project.covers.original+'" alt=""> <a href="project.html?id='+project.id+'">see more</a></li>')//
					//we have added in question mark this is called a query string , you can add stuff after this .creating html for each project, can create in html then cut across 
					// project name - if we do console log above and look we can see each project has a name in Dom/
						.appendTo('ul.project-thumbs'); //adding to ul with the projects calss in the HTML. 
			});

		}		

		});	

	}

		if($('#projects').length > 0){ 
		// if statements are so that the relevant javascript will only run on the correct page because
		//both pages are using the same script. if we didnt do this it means the javascrit will break because the right ids/classes arent in the html
		let pageURL = new URL(document.location);

		let params = pageURL.searchParams;
		let id = params.get('id');  //these 3 lines found in the documentation of browser

		let urlProject = 'http://www.behance.net/v2/projects/'+id+'?api_key='+key;
		

		$.ajax({
			url:urlProject,
			dataType:'jsonp',
			success:function(res){
				console.log(res);
				let project = res.project;

				$('<h1>'+project.name+'</h1>').appendTo('.project-container')
				$('<p>'+project.description+'</p>').appendTo('.project-container')
				$('<h3>'+moment.unix(project.published_on).fromNow()+'</h3>').appendTo('.project-container')
				$('<img src="'+project.covers.original+'" alt="">').appendTo('.project-container')

			}

		});

		let urlProjectComments = 'https://api.behance.net/v2/projects/'+id+'/comments?client_id='+id;

		$.ajax({
			url:urlProjectComments,
			dataType:'jsonp',
			success:function(res){
				console.log(res);
				let project = res.project;

				// $('<h1>'+project.name+'</h1>').appendTo('.project-container')
				// $('<p>'+project.description+'</p>').appendTo('.project-container')
				// $('<h3>'+moment.unix(project.published_on).fromNow()+'</h3>').appendTo('.project-container')
				//  when you want to create a date you will utilise moment.unix, you will put your project.published_on inbetween the brackets to know what unit to transform into a date 
				// /* fromNow will give you how many days/months/years ago that date was that you created using unix. */
				// $('<img src="'+project.covers.original+'" alt="">').appendTo('.project-container')

			}

		});
	


	}
});