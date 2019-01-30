$(document).ready(function(){

	var settings1 = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://ucf3-fap0185-fa-ext.oracledemos.com/salesApi/resources/latest/loyaltyMembers/300000157827905/child/MemberTransactions",
	  "method": "GET",
	  "headers": {
		"authorization": "Basic Z2VvcmdlLmdyYW50OlVJSTg1NTY5"
	  }
	}	

	$.ajax(settings1).done(function (response1) {
		for(i=0;i<response1.items.length;i++){
		var transacao = response1.items[i].TransactionNumber;
		console.log('items 1-> ', response1.items);

				var settings3 = {
				  "async": true,
				  "crossDomain": true,
				  "url": 'https://ucf3-fap0185-fa-ext.oracledemos.com/salesApi/resources/11.13.0.0/loyaltyTransactions/'+transacao,
				  "method": "GET",
				  "headers": {
					"authorization": "Basic Z2VvcmdlLmdyYW50OlVJSTg1NTY5"
				  }
				}	

				$.ajax(settings3).done(function (response2) {
					console.log('item no response2 -> ', response2);

					var template = $("#tpl");
					var container = $(".extrato");

					var creationDate = moment(response2.CreationDate).format('L');

					var points = 0;
					var $text = "";
					var date = "Made on " + creationDate;
					console.log(date);
					var log = response2.ProcessingLog;
					var log2 = log.substring(17,30);
					points = Math.round(log2.substring(0, log2.search("Points")));
					///console.log(points);
					$text = "New Purchase";

					$.each(response1.items, function(i, item) {
						if (item.TransactionNumber == response2.TransactionNumber) {
							$text = item.SubTypeCode;
							
							if($text == "Product")
								$text = "New Purchase: " + response2.ProductNumber;

							if($text == "Crédito Manual" && response2.Comments == "Review")
								$text = "Review";

							return false;
						}
					}); 
						
					var row = template.clone();
					row.find(".cell-type").addClass("accrual");
					row.find(".quantity strong").text(points);
					row.find("h4").text($text);
					row.find("p").text(date);
					
					row.removeClass("hide");
					
					container.append(row);
					container.append($("<hr>"));
					
		
				});


	};

});
});

