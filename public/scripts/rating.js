
function enviaPesquisa(){

	$(document).ready(function(){
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://ucf3-fap0185-fa-ext.oracledemos.com/crmRestApi/resources/11.13.17.08/loyaltyTransactions",
		  "method": "POST",
		  "headers": {
		    "Content-Type": "application/vnd.oracle.adf.resourceitem+json",
		    "Authorization": "Basic Z2VvcmdlLmdyYW50OlVJSTg1NTY5"
		  },
		  "data": "{\r\n  \"MemberNumber\": \"300000157820488\",\r\n  \"ProgramName\": \"Você Marche\",\r\n  \"TypeCodeName\": \"Acumulação\",\r\n  \"PointTypeName\": \"Pontos\",\r\n  \"AmountValue\": 74,\r\n  \"SubTypeName\": \"Crédito Manual\",\r\n  \"Comments\": \"Pesquisa\"\r\n}"
		}
		$.ajax(settings).done(function (response) {
		  console.log(response);
		  return true;
		});
	});

	document.getElementsByClassName("sendRating")[0].style.backgroundColor = "gray";
}