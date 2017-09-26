function Controller(model,view){
	this.model = model
	this.view = view
}

function Model(){}

function View(){}



Controller.prototype.run = function(){
	var controller = this,
			number_load = controller.model.number_rand().toString().split("")

	$("form").on("submit", function(e){
		var input = $("#number").val(),
				number_input = $("#number").val().split("")

		e.preventDefault()

		if(input === ""){
			controller.view.add_class_error()
	  	controller.view.message_error_validation("El Campo no puede estar Vacio.")
		}else if(input.length > 4){
			controller.view.add_class_error()
	  	controller.view.message_error_validation("No puedes ingresar mas de 4 numeros.")	
		}else if(input.length < 4){
			controller.view.add_class_error()
	  	controller.view.message_error_validation("No puedes ingresar menos de 4 numeros.")	
		}else if(input.match(/^(.)\1+$/g)){
			controller.view.add_class_error()
	  	controller.view.message_error_validation("No puedes repetir numeros.")	
		}else if(input.length === 4){
			controller.view.add_class_success()
	  	controller.view.hide_text_error()
			controller.compare_number(number_load,number_input)
		}
	})
}


Controller.prototype.compare_number = function(number_load,number_input){
		var controller = this,
				input = $("#number").val(),
				sum_input_picas = 0,
				sum_input_fijas = 0

		for(var i = 0; i < number_load.length; i++){
	    for(var j = 0; j < number_input.length; j++){
	      if(number_load[i] == number_input[j]){
	        if(i === j){
	        	sum_input_fijas += number_load[i].length
	        }else{
	        	sum_input_picas += number_load[i].length
					}
	  		}		
	    }
	 	}

	 	controller.view.complete_table(input,sum_input_picas,sum_input_fijas)

	 	if(sum_input_fijas === 4){
	 		controller.view.show_modal()	
	 	}

	 	controller.view.game_reset()

	 	// console.log("Picas: " + sum_input_picas)
		// console.log("Fijas: " + sum_input_fijas)
}

Model.prototype.number_rand = function(){
	var number =  Math.floor(1000 + Math.random() * 9000)
	console.log(number)
	return number
}

View.prototype.hide_text_error = function(){
	$(".error-text").hide()
}

View.prototype.add_class_success = function(){
	$("#number").removeClass("is-invalid").addClass("is-valid")
}

View.prototype.add_class_error = function(){
	$("#number").addClass("is-invalid")	
}

View.prototype.message_error_validation = function(message_error){
	$(".error-text").show().text(message_error)
}

View.prototype.show_modal = function(){
	$('#Mymodal').modal()		
}

View.prototype.complete_table = function(number,picas,fijas){
	$("#tabla-history").append("<tr><td>"+ number +"</td><td>"+ picas +"</td><td>"+ fijas +"</td></tr>")
}

View.prototype.game_reset = function(){
	$("#btn-play").on("click",function(){
		window.location.reload()
	})
}


var play = new Controller(new Model(), new View())
play.run()

