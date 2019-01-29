//Pega Informações do Membro
$(document).ready(function(){
    //$("button").click(function(){
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://ucf3-fap0185-fa-ext.oracledemos.com/crmRestApi/resources/latest/loyaltyMembers/300000157820488",
	  "method": "GET",
	  "headers": {
		"authorization": "Basic Z2VvcmdlLmdyYW50OlVJSTg1NTY5"
	  }
	}

	$.ajax(settings).done(function (response) {
		$("#saldo").text(response.TierName);

	
 		if (response.PointTypeBVal == 1) {
			$("#primeira-compra").addClass('done');
		}

		 if (response.PointTypeDVal >= 1) {
			$("#primeiro-vinho").addClass('done');
		}

		if (response.PointTypeCVal >= 1) {
			console.log("c1",response.PointTypeCVal);
			$("#avaliador").addClass('done');
		}

		//Se comprou vinho, então recebe SMS com receita
		/*if(response.PointTypeEVal >= 1){
				if(localStorage.getItem("SMSReceita") != "Sim"){
					enviaSMS('11986539734','Ja%20pensou%20em%20experimentar%20o%20seu%20vinho%20com%20essa%20receita%20');
					//https://goo.gl/djE6z2
					localStorage.setItem("SMSReceita","Sim");
				}

		}*/

		//Se Comprou Vinho, então deixa card Sommelier a mostra e manda SMS
		if(response.PointTypeDVal >= 1){
			$("#card_sommelier").removeClass('hidden');
				if(localStorage.getItem("SMSSommelier") != "Sim"){
					enviaSMS('11997732486','Obrigado%por%20parexperimentar%20nossos%20Nivinhos!%20Veja%20o%que%20preparamos%20para%20voce');
					localStorage.setItem("SMSSommelier","Sim");
				}

		}

		//Se Cozinheiro, então deixa card Curso de Vinhos a mostra e manda SMS
		if(response.TierName == "Cozinheiro"){
			$("#card_clube_vinho").removeClass('hidden');
				if(localStorage.getItem("SMSTier") != "Sim"){
					enviaSMS('11997732486','Voce%20subiu%20para%20o%20Nivel'+'%20'+response.TierName+'!%20Veja%20o%20presente%20que%20te%20enviamos%21');
					localStorage.setItem("SMSTier","Sim");
				}

		}

		//SMS para Sommelier
		if(response.PointTypeDVal == 1){
			enviaSMS('11997732486','Obrigado%por%20parexperimentar%20nossos%20Nivinhos!%20Veja%20o%que%20preparamos%20para%20voce');			
		}

		//SMS para Cozinheiro
		if(response.PointTypeDVal == 1){
			enviaSMS('11997732486','Voce%20subiu%20para%20o%20Nivel'+'%20'+response.TierName+'!%20Veja%20o%20presente%20que%20te%20enviamos%21');
		}
	});
});


//Pega Vouchers do Membro
$(document).ready(function(){
    //$("button").click(function(){
		var vouchers = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://ucf3-fap0185-fa-ext.oracledemos.com/crmRestApi/resources/latest/loyaltyMembers/300000157820488/child/MemberVouchers",
		  "method": "GET",
		  "headers": {
			"authorization": "Basic Z2VvcmdlLmdyYW50OlVJSTg1NTY5"
		  }
		}


		$.ajax(vouchers).done(function (response) {
			contemVoucher = 0;
			for(i=0;i<response.items.length;i++){
				var voucherList = new Array(response.items.length); 
				voucherList[i] = response.items[i].VoucherType;
				//console.log("voucher" + i);
				//console.log(voucherList[i]);
	        //console.log(voucherList);

	        var produtos = document.getElementsByClassName("grid__item");
			//console.log(produtos[0].id);
			for(j=0;j<produtos.length;j++){
				//if($.inArray(produtos[j].id, voucherList) == -1){
					//console.log(produtos[j].id);
					if(produtos[j].id == voucherList[i]){
					//console.log("está");
					document.getElementById(produtos[j].id).classList.add("voucher");
					contemVoucher = 1;
				//}
			}
			}
				        }
			//document.getElementById("botao").click();
			$("#botao").trigger("click");

	        //if(pizza == 1){;document.getElementById("Desconto 15 Pizza").style.display = "";}
	        //if(azeite == 1){;document.getElementById("Desconto 25 Azeite").style.display = "";}
		});


});



function ajustarProdutos(){
	$(document).ready(function(){
		for(i=0; i<document.getElementsByClassName("grid__item shirts").length; i++){
   		// document.getElementsByClassName("grid__item shirts")[i].style.transform = "translateY(18%) ";
   		 //document.getElementsByClassName("grid__item shirts")[i].style.transitionDuration  = "unset";
   		 //titulo1.style.display = "none";
		 //titulo2.style.display = "none";
		 //titulo3.style.display = "none";
		}

	});
}
