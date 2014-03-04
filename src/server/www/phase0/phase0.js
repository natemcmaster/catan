jQuery(function () {   
    
	jQuery.getJSON("server-REST.json", initPage);
   	jQuery("#Games").change(onGameChange);
  	jQuery("#Players").change(onPlayerChange);
   	jQuery("#REST-options").change(onRESTChange);
   	jQuery("#TryButton").click(tryIt);
   	jQuery("#login").click(login);
   	
});

function initPage(data){

	callOptions = new Array();
	allGames = new Array();
	
	var count = 0;
	jQuery.each(data, function(index,value) {
	
		callOptions[count] = value;
		count++;
		var addOptionString = '<option>' + value.url + ' -- ' + value.method + '</option>';
		jQuery('#REST-options').append(addOptionString);
	
	});
	getGames();
	
}

function getGames(){
	
	allGames = new Array();
	
	var playerJSON = jQuery.get("/games/list", function(data){
	
		var count = 0;
		jQuery.each(data, function(index,value){
			allGames[count]= value;
			jQuery("#Games").append('<option>'+value.title+'</option>');
			count++;	
		});
		
	});	
}

function onGameChange(e)  {
	jQuery('#Players').html('<option id="-1">Select Player</option>');
	jQuery('#loginPass').val('');
	var index = jQuery("#Games").prop("selectedIndex") -1;
	if(index == -1){
	
		jQuery("#Players").html('<option>Select Player</option>');
	
	}
	else{
	
		allGames[index].players.forEach(function(value){
			
				jQuery("#Players").append('<option>'+value.name+'</option>)');
			
		});

	}
}

function onPlayerChange(e){
	jQuery('#loginPass').val('');

}

function login(){
	
	var gameIndex = jQuery("#Games").prop("selectedIndex")-1;
	var playerIndex = jQuery("#Players").prop("selectedIndex")-1;
	
	jQuery('#loginResponse').html('');
	
	if(gameIndex >=0 && playerIndex >=0){
	
		var username = jQuery("#Players").val();
		var password = jQuery("#loginPass").val();
		var gameID = allGames[gameIndex].id;
		var playerColor = allGames[gameIndex].players[playerIndex].color;
		
		var loginInfo = {"username" : username, "password" : password};
		var joinInfo = {"color" : playerColor , "id" : gameID};

		jQuery.post("/user/login", loginInfo, function(data,status,xhr){
		
			jQuery.post("/games/join", joinInfo, function(data,status,xhr){
				jQuery('#loginResponse').html(username + ' logged in and joined ' +allGames[gameIndex].title);
											
			}).fail(function(jqXHR, textStatus, errorThrown){
				
				jQuery('#loginResponse').html(jqXHR.responseText);
			
			});			
		}).fail(function(jqXHR, textStatus, errorThrown){
				
				jQuery('#loginResponse').html(jqXHR.responseText);
				
			});
	
	}
	else{
		alert("Please Select a Player and a Game");
	}
	
	
	
	
}

function onRESTChange(e){

	var index = jQuery("#REST-options").prop("selectedIndex") -1;
	jQuery("#ResponseBody").html("");
	jQuery("#Description").html("");
	jQuery("#RequestMethod").html("");
	jQuery("#REST-args").html("");
	if(index >=0) {
	
		var currentSelection = callOptions[index];
		
		jQuery("#Description").html(currentSelection.description);
		jQuery("#RequestMethod").html(currentSelection.method);
		
	
		if(currentSelection.method == 'POST' && currentSelection.url != '/game/reset'){
		
			jQuery("#REST-args").html("<b>Arguments:</b></br>");
			
			if(currentSelection.type == "FORM"){
		
				var formString = '<form id="argsForm">';
				currentSelection.args.forEach(function (value){
			
				
					if(value.type == "STRING" || value.type == "INTEGER"){
					
						formString += value.name + ": " +'<input type = "text" name="'+value.name+'"></br>';
				
					}
					else if(value.type == "BOOLEAN"){
				
						formString += '<input type="checkbox" name="'+value.name+'"> ' +value.name+'</br>';
				
					}
					else if(value.type == "ENUMERATION"){
				
						formString += value.name+': <select name="'+value.name+'">';
						value.values.forEach(function(val){
						
							formString += '<option value="'+val+'">'+val+'</option>';
					
						});
						formString+='</select></br>'
				
					}
					else{
						alert("Argument type invalid");
					
					}
				
				});
				formString += "</form>";
				jQuery("#REST-args").append(formString);
			}
			else{
				var requestBody = '<textarea id="requestBody">'+JSON.stringify(currentSelection.template,null,'\t')+'</textarea>';
				jQuery("#REST-args").append(requestBody);
	
			}
		}	
	}
	

}

function tryIt(){
	var selectedIndex = jQuery("#REST-options").prop("selectedIndex")-1;
	if(selectedIndex != -1){
	
		var selectedOption = callOptions[selectedIndex];
		
		if(selectedOption.method == "GET"){
		
			jQuery.get(selectedOption.url, function(data,status,xhr){
			
				printResponse(data);
			
			});
			
		
		}
		else if(selectedOption.method == "POST"){
		
			if(selectedOption.url == '/game/reset'){
				jQuery.post(selectedOption.url).always(function(data,status,xhr){
					printResponse(data);
				});
			}
			else{
			
				if(selectedOption.type == "FORM"){
				
					var form = jQuery("#argsForm").serialize();
					
					jQuery.post(selectedOption.url, form).always(function(data,status,xhr){
						printResponse(data);
				});
				
				
				}
				else if(selectedOption.type == "JSON"){
				var requestBody = jQuery("#requestBody").val();
				jQuery.post(selectedOption.url, requestBody).always(function(data,status,xhr){
					printResponse(data);
				});
					
				}
			
			
			}
		
		}
		else{
			alert("Not Get of Post");
		}
		
	}

}

function printResponse(input){
	
	var output = JSON.stringify(input,null, '\t');
	jQuery("#ResponseBody").html('Response Body:</br><textarea readonly id="ResponseBody">'+output+'</textarea>');

}
