var memberNumber = localStorage.getItem('MemberID');
var environmentName = "coalitionappgb.herokuapp.com";


function basicAuth(){
	return window.btoa(username+":"+password);
}



//Registro de Usuário
function registerUser(ContactFirstName,ContactLastName,EmailAddress,WorkPhoneNumber,ContactPassword, ReferredByNumber){

	console.log(ReferredByNumber);
	if(ReferredByNumber == ''){refNum = null;}
	else{refNum = "\""+ReferredByNumber+"\""}
	console.log(refNum);

	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url":"https://"+environmentName+"/registerMember",
		"method":"POST",
		"headers":{
			"content-type":"application/json"
		},
		"dataType":"json",
		"data": "{\r\n\"ContactFirstName\": \""+ContactFirstName+"\",\r\n\"ContactLastName\": \""+ContactLastName+"\",\r\n\"EmailAddress\": \""+EmailAddress+"\",\r\n\"WorkPhoneNumber\": \""+WorkPhoneNumber+"\",\r\n\"ContactPassword\":\""+ContactPassword+"\",\r\n   \"ReferredByNumber\": "+refNum+"\r\n}"
	});
}

function popupError(errorType){
	document.getElementById('popupError').style.display='block';
	$(".popup-error-header").html('Encontramos um Erro');
	$(".popup-error-desc").html(errorType);
}

/*GET MEMBER INFORMATION*/
function getMember(){
	return 	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environmentName+"/getMember/"+memberNumber,
		"method": "GET",
		"headers": {
			"content-type":"application/json"
		}

	})
}

/*GET MEMBER BALANCE*/
function getMemberBalance(){
	return 	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environmentName+"/getMemberBalance/"+memberNumber,
		"method": "GET",
		"headers": {
			"content-type":"application/json"
		}

	})
}


/*REDEEM POINTS - doing*/
function redeemMemberPoints(memberNum, product, amount, pointsRedeem){
	return 	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environmentName+"/createTransaction/",
		"method": "GET",
		"headers": {
			"content-type":"application/json"
		},
		"dataType":"json",
		"data": "{\r\n\"MemberNumber\": \""+memberNum+"\",\r\n\"TypeCode\": \"ORA_TXN_RED\",\r\n\"SubTypeCode\": \"ORA_RED_PROD\",\r\n\"ProductNumber\": \""+product+"\",\r\n \"AmountValue\": "+amount+",\r\n\"Points\": \""+pointsRedeem+"\",\r\n  \"Comments\": \""+null+"\"\r\n}"

	})
}

/*MemberNumber
ProgramName

TypeCode
SubTypeCode

ProductNumber
AmountValue

Points

Comments*/


/*REDEEM POINTS - doing*/
/*Example: redeemPoints("300000176076197", "Bitz", "Crédito de R$100,00 em compras na Etna", "100", "1")*/
function redeemPoints(memberNum, pointType, product, amount, pointsRedeem){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyTransactions",
		"method": "POST",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Content-Language": "en",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n\"MemberNumber\": \""+memberNum+"\",\r\n\"ProgramName\": \""+loyaltyProgram+"\",\r\n\"TypeCode\": \"ORA_TXN_RED\",\r\n\"SubTypeCode\": \"ORA_RED_PROD\",\r\n\"PointTypeName\": \""+pointType+"\",\r\n\"ProductNumber\": \""+product+"\",\r\n \"AmountValue\": "+amount+",\r\n\"Points\": \""+pointsRedeem+"\"\r\n}"
	})
}












/*CREATE TRANSACTION*/
function createTransaction(transactionType, transactionSubType, memberNum, pointType, amount, comments){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyTransactions",
		"method": "POST",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Content-Language": "en",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n  \"MemberNumber\": \""+memberNum+"\",\r\n  \"ProgramName\": \""+loyaltyProgram+"\",\r\n  \"TypeCodeName\": \""+transactionType+"\",\r\n  \"PointTypeName\": \""+pointType+"\",\r\n  \"AmountValue\": "+amount+",\r\n  \"SubTypeName\": \""+transactionSubType+"\",\r\n  \"QualifyingPointUsed\": \"Y\",\r\n  \"Comments\": \""+comments+"\"\r\n}"
	})
}

//check
function createTransaction18C(transactionType, transactionSubType, memberNum, pointType, amount, comments){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyTransactions",
		"method": "POST",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Content-Language": "en",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n  \"MemberNumber\": \""+memberNum+"\",\r\n  \"ProgramName\": \""+loyaltyProgram+"\",\r\n  \"QualifyingPointUsed\": \"Y\",\r\n  \"TypeCode\": \""+transactionType+"\",\r\n  \"PointTypeName\": \""+pointType+"\",\r\n  \"AmountValue\": "+amount+",\r\n  \"SubTypeCode\": \""+transactionSubType+"\",\r\n  \"Comments\": \""+comments+"\"\r\n}"
	})
}

/*CREATE TRANSACTION DATA FOR BITZ*/
function createTransactionFake(transactionType, transactionSubType, memberNum, pointType, amount, comments, points){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyTransactions",
		"method": "POST",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Content-Language": "en",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n  \"MemberNumber\": \""+memberNum+"\",\r\n  \"ProgramName\": \""+loyaltyProgram+"\",\r\n  \"QualifyingPointUsed\": \"Y\",\r\n  \"TypeCode\": \""+transactionType+"\",\r\n  \"PointTypeName\": \""+pointType+"\",\r\n  \"AmountValue\": "+amount+",\r\n \"Points\":  \""+points+"\", \r\n  \"SubTypeCode\": \""+transactionSubType+"\",\r\n  \"Comments\": \""+comments+"\"\r\n}"

	})
}

/*GET TRANSACTIONS FROM MEMBER*/
//check
function getTransaction(memberNum){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyMembers/"+memberNum+"/child/MemberTransactions/",
		"method": "GET",
		"headers": {
			"Authorization": "Basic "+basicAuth()+""
		}
		})
}



/*REDEEM POINTS - doing*/
/*Example: redeemPoints("300000176076197", "Bitz", "Crédito de R$100,00 em compras na Etna", "100", "1")*/
function redeemPoints(memberNum, pointType, product, amount, pointsRedeem){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyTransactions",
		"method": "POST",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Content-Language": "en",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n\"MemberNumber\": \""+memberNum+"\",\r\n\"ProgramName\": \""+loyaltyProgram+"\",\r\n\"TypeCode\": \"ORA_TXN_RED\",\r\n\"SubTypeCode\": \"ORA_RED_PROD\",\r\n\"PointTypeName\": \""+pointType+"\",\r\n\"ProductNumber\": \""+product+"\",\r\n \"AmountValue\": "+amount+",\r\n\"Points\": \""+pointsRedeem+"\"\r\n}"
	})
}

/*TRANSFER POINTS*/
/*transferPoints('300000176077636', '300000176077711', '2')*/
function transferPoints(fromMemberNum, toMemberNum, transferValue){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyTransactions",
		"method": "POST",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Content-Language": "en",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n\"MemberNumber\": \""+fromMemberNum+"\",\r\n\"ProgramName\": \""+loyaltyProgram+"\",\r\n\"TypeCode\": \"ORA_TXN_RED\",\r\n\"SubTypeCode\": \"ORA_RED_TRAN\",\r\n\"PointTypeName\":\""+pointType+"\",\r\n\"AmountValue\":1,\r\n\"Points\": \""+transferValue+"\",\r\n\"ToMemberNumber\": \""+toMemberNum+"\"\r\n}"
	})
}



//DUMB TRANSACTION
function dumbTransaction(memberNum){
	if(memberNum == null){memberNum = memberNumber;}
	return new Promise(function(resolve,reject) {
		createTransaction18C("ORA_TXN_ACC", "ORA_ACC_MCR", memberNum, pointType, "0", "").done(function(res){
			resolve(res);
		}).fail(function(err){
			createTransaction18C("ORA_TXN_ACC", "ORA_ACC_MCR", memberNum, pointType, "0", "");
			reject(err);
		});
	})
}

/*GET TRANSACION VOUCHERS*/
/*Example: getLastMemberVouchersInfo('300000176077255');*/
function getLastMemberVouchersInfo(transactionNumber){	
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyTransactions/"+transactionNumber+"/child/Vouchers",
		"method": "GET",
		"headers": {
			"authorization": "Basic "+basicAuth()+""
		}
	});
}

/*CREATE HOUSEHOLD*/
function createHousehold(name){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/households/",
		"method": "POST",
		"headers": {
			"authorization": "Basic "+basicAuth()+"",
			"content-type": "application/json"
		},
		"processData": false,
		"data": "{\n\t\"HouseholdName\": \""+name+"\"\n}"
	})
}

/*GET HOUSEHOLD*/
function getHousehold(name){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/households/647313",
		"method": "GET",
		"headers": {
			"authorization": "Basic "+basicAuth()+"",
		}
	})
}


/*UPDATE HOUSEHOLD*/
function updateHousehold(PartyNumberKey,householdOwnerID, newMemberID){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/households/"+PartyNumberKey+"/child/Relationship",
		"method": "POST",
		"headers": {
			"authorization": "Basic "+basicAuth()+"",
			"content-type": "application/json"
		},
		"processData": false,
		"data": "{\n        \"PartyId\": "+householdOwnerID+",\n        \"SubjectPartyId\": "+newMemberID+",\n        \"SubjectTableName\": \"HZ_PARTIES\",\n        \"SubjectType\": \"PERSON\",\n        \"Role\": \"CHILD\"\n}"
	})
}

/*

create
{
"HouseholdName": "Grupo do Renan"
}

getHousehold
PartyNumberKey

getMember
PrConId

update
"PartyId": 300000176078057, //Primary Contact
"SubjectPartyId": 300000176078042,
"SubjectTableName": "HZ_PARTIES",
"SubjectType": "PERSON",
"Role": "CHILD"


households/647302/child/Relationship
{
	"SubjectPartyId" : "300000176078057",//SubjectPartyId
	"SubjectTableName" : "HZ_PARTIES", //SubjectTableName
	"SubjectType" : "PERSON", //SubjectType
	"RelationshipType": "HOUSEHOLD",
	"RelationshipCode": "ORA_CHILD_IN"
}*/


/*GET MEMBER INFORMATION*/
//checking
function getMemberPoints(info){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyMembers/"+memberNumber+"",
		"method": "GET",
		"headers": {
			"authorization": "Basic "+basicAuth()+""
		}
	}

	switch(info){
		case "tier":
		$.ajax(settings).done(function (response) {
/*				document.getElementsByClassName("level-val")[0].innerHTML = response.TierName;
				
				//O Ambiente ecor está com problema na API
				if(response.TierName == null){
  					document.getElementsByClassName("level-val")[0].innerHTML = "Intermediate";
  				}*/
  			})
		break;
		case "balance":
		$.ajax(settings).done(function (response) {
			document.getElementsByClassName("points-val")[0].innerHTML = response.PointTypeAAvlVal;


		})
		break;
		case "NBO":
		$.ajax(settings).done(function (response) {
			/*$(".NBO").addClass("hide");*/
			//console.log(eval("response."+NBO));
			if(eval("response."+NBO) == 1){$("#cardNBO1").removeClass("hide")}
				if(eval("response."+NBO) == 6){$("#cardNBO6").removeClass("hide")}
					if(eval("response."+NBO) == 7){$("#cardNBO7").removeClass("hide")}
						if(eval("response."+NBO) == 2){$("#creditcardNBO").removeClass("hide")}
							if(eval("response."+NBO) == 4){$("#lojaNBO").removeClass("hide")}
								if(eval("response."+NBO) == 5){$("#surveyNBO").removeClass("hide")}
						//console.log(response);
				})
		break;
		case "ThirdVoucher17D":
		$.ajax(settings).done(function (response) {
			if(response.PointTypeFVal == 1){
				document.getElementById("Mc BigTasty").classList.remove("color_disabled");
				document.getElementById("Mc BigTasty").classList.remove("secret");
			}
		})
		break;
		default:
		return $.ajax(settings);
		break;
	}
}

/*GET SPECIFIC MEMBER INFORMATION*/
function getSpecificMember(memberID){
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyMembers/"+memberID+"",
		"method": "GET",
		"headers": {
			"authorization": "Basic "+basicAuth()+""
		}
	}
	return $.ajax(settings);
}

function getSpecificMemberBalance(memberID){	
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyMembers/"+memberID+"/child/pointbalances",
		"method": "GET",
		"headers": {
		"authorization": "Basic "+basicAuth()+"",
		"content-type": "application/vnd.oracle.adf.resourceitem+json"
		}
	});
}



/*GET MEMBER VOUCHERS INFO*/
function getMemberVouchersInfo(){	
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyMembers/"+memberNumber+"/child/MemberVouchers",
		"method": "GET",
		"headers": {
			"authorization": "Basic "+basicAuth()+""
		}
	});
}

/*GET MEMBER REFERRALS*/
function getMemberReferrals(){	
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyMembers/"+memberNumber+"/child/MemberReferrals",
		"method": "GET",
		"headers": {
			"authorization": "Basic "+basicAuth()+""
		}
	});
}

/*GET SPECIFIC VOUCHERS*/
/*Example: getSpecificVoucher("300000176077312").then(function(res){console.log(res)})*/
function getSpecificVoucher(voucherNumber){	
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyMembers/"+memberNumber+"/child/vouchers/"+voucherNumber,
		"method": "GET",
		"error": function(xhr, status, error){console.log(xhr.status +" - "+status+" - "+error)},
		"headers": {
			"authorization": "Basic "+basicAuth()+""
		}
	});
}


/*GET MEMBER INFORMATION 18C*/
function getMemberPoints18C(){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://adc4-zevg-fa-ext.oracledemos.com/crmRestApi/resources/latest/loyMembers/"+memberNumber+"",
		"method": "GET",
		"error": function(xhr, status, error){popupError(xhr.status+" - "+error);console.log(xhr);console.log(status);console.log(error)},
		"headers": {
			"authorization": "Basic am9obi5kdW5iYXI6cGp2NzY2ODk=",
			"content-type": "application/vnd.oracle.adf.resourceitem+json"
		}
	})
}

//ASSIGN VOUCHER TO A MEMBER
function AssignMemberVoucher(voucherType, memberNumber, qty){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyVouchers",
		"method": "POST",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n   \"VoucherType\": \""+voucherType+"\",\r\n   \"MemberNumber\": \""+memberNumber+"\",\r\n   \"ExpirationDt\": \"2020-05-06T11:59:15+00:00\",\r\n   \"voucherStatus\": \"Available\",\r\n   \"Quantity\": "+qty+",\r\n   \"VoucherBasis\": \"Redemption\"\r\n}"		
	});
}

//UPDATE VOUCHER STATUS
function UpdateVoucherStatus(voucherID, voucherStatus){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/crmRestApi/resources/latest/loyaltyVouchers/"+voucherID,
		"method": "PATCH",
		"headers": {
			"Content-Type": "application/vnd.oracle.adf.resourceitem+json",
			"Authorization": "Basic "+basicAuth()+""
		},
		"data": "{\r\n   \"voucherStatus\": \""+voucherStatus+"\"\r\n}"
	});
}




//REGISTER FRIEND MEMBER
//check
function registerFriendMember(firstName, lastName, cellphone, email, loyaltyProgram, refByNumber){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+environment+".oracledemos.com/salesApi/resources/latest/loyaltyMembers",
		"method": "POST",
		"headers": {
			"authorization": "Basic "+basicAuth()+"",
			"content-type": "application/vnd.oracle.adf.resourceitem+json"
		},
		"dataType"  : "json",
		"data": "{\r\n   \"ProgramName\": \""+loyaltyProgram+"\",\r\n   \"ContactFirstName\": \""+firstName+"\",\r\n   \"ContactLastName\": \""+lastName+"\",\r\n   \"WorkPhoneNumber\": \""+cellphone+"\",\r\n   \"EmailAddress\": \""+email+"\",\r\n   \"ReferredByNumber\": \""+refByNumber+"\"\r\n}"

	})
}

function sendSMS(cel_num, mensagem){
  //var cel_num = "11997732486";
  //var mensagem = "Mensagem%20de%20testeGB7"
  return $.ajax({
  	"async": true,
  	"crossDomain": true,
  	"url": "https://www.paposms.com/webservice/1.0/send/?user=gianbiga%40gmail.com&pass=oracle123&numbers="+cel_num+"&message="+mensagem,
  	"method": "POST",
  	"headers": {
  		"authorization": "Basic QUMwNjNhYTNmNzcwMjA0ZGUxZWRlMWU0NDNlOWJmNjIwOTpjNDhiNTFkYmRkOTU4MzMzYWY5Y2QzMmZhNTQwNzk2NA=="
  	}
  })
}


//GET URL PARAMETERS
function getURLParameters(parameter){
	url_string = window.location.href;
	var url = new URL(url_string);
	var param = url.searchParams.get(parameter);
	return param;
}


/*LOADING*/
function showLoading(){
	document.getElementsByTagName("header")[0].classList.add("loading-background");
	document.getElementsByClassName("logo2")[0].classList.add("loading-logo");
	document.getElementsByClassName("loader")[0].classList.remove("hide");
	document.getElementsByClassName("loader__ball")[0].classList.remove("hide");
}
function hideLoading(){
	document.getElementsByTagName("header")[0].classList.remove("loading-background");
	document.getElementsByClassName("logo2")[0].classList.remove("loading-logo");
	document.getElementsByClassName("loader")[0].classList.add("hide");
	document.getElementsByClassName("loader__ball")[0].classList.add("hide");	
}


function hideshowByClass(className, method){
	switch(method){
		case 'hide':
		$("."+className).each(function(index,value){value.classList.add("hide");})
		break;
		case 'show':
		$("."+className).each(function(index,value){value.classList.remove("hide");})
		break;
	}
}

function hideshowById(idName, method){
	switch(method){
		case 'hide':
		$("#"+idName).each(function(index,value){value.classList.add("hide");})
		break;
		case 'show':
		$("#"+idName).each(function(index,value){value.classList.remove("hide");})
		break;
	}
}

function inputID(className){
	/*Alimenta IDs da SkillTree com os produtos definidos em environment.js*/
	var productsArray = [
	prod_1_1, prod_1_2, prod_1_3, prod_2_1, prod_2_2, prod_2_3, prod_3_1, prod_3_2, prod_3_3, prod_3_4, prod_4_1, prod_4_2, prod_4_3];

	$.each($("."+className), function(index,value){
		value.id = productsArray[index];
	});
}


/*Oracle Commerce Cloud APIs*/
/*Get Product From Specific Collection*/
function getOCCProductsFromCollection(collectionName){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+OCCenvironment+".oracleoutsourcing.com/ccstoreui/v1/products?categoryId="+collectionName,
		"method": "GET",
		"headers": {
		}
	})
}

/*Get Specific Product From Specific Collection*/
function getOCCSpecificProductFromCollection(collectionName, id){
	return $.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+OCCenvironment+".oracleoutsourcing.com/ccstoreui/v1/products?categoryId="+collectionName+"&q=id%20co%20%22"+id+"%22",
		"method": "GET",
		"headers": {
		}
	})
}

//REGISTER MEMBER OCC
function registerOCC(firstName, lastName, password, email, loyaltyProgram){
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://"+OCCenvironment+".oracleoutsourcing.com/ccstoreui/v1/profiles",
		"method": "POST",
		"headers": {
			"content-type": "application/json"
		},
		"dataType"  : "json",
		"data": "{\"email\":\"" + email + "\",\"password\":\"" + password + "\",\"firstName\":\"" + firstName + "\",\"lastName\":\"" + lastName + "\",\"receiveEmail\":\"no\",\"shippingAddresses\":[],\"locale\":\"en\",\"loyaltyMemberNumber\": \"" + loyaltyProgram + "\"}"
	}).done(function(res){
		//console.log("retorno: occ", res);
		dumbTransaction().then(function(data){location.href='voucher.html'});
	});
}

// LOGIN OCC
function insertCartOCC(productId) {
	var user = localStorage.getItem("email");
	var pass = localStorage.getItem("password");
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://ucf4-occ0077-occ.oracledemos.com/ccstoreui/v1/login",
		"method": "POST",
		"headers": {
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		"data": "grant_type=password&username=" + user + "&password="+pass
	}).done(function (response) {
		//console.log( "respostaLogin: ", response);
		localStorage.setItem("access_token",response.access_token);    
		$.ajax({
			"async": true,
			"crossDomain": true,
			"url": "https://ucf4-occ0077-occ.oracledemos.com/ccstoreui/v1/orders/current",
			"method": "POST",
			"headers": {
				"Authorization": "Bearer " + response.access_token,
				"content-type": "application/json"
			},
			"data": "{\"shoppingCart\":{\"items\":[{\"productId\":\"" + productId + "\",\"quantity\":1,\"catRefId\":\"" + productId + "\",\"stockStatus\":true,\"stockState\":\"IN_STOCK\",\"commerceItemQuantity\":1,\"priceListGroupId\":\"defaultPriceGroup\"}]},\"op\":\"create\"}"
		}).done(function (response) {
			//console.log("respostaCart: ", response);
		});
	});
};



/*TESTE*/

var getProductsJSON = 
{
    "totalResults": 12,
    "offset": 0,
    "limit": 250,
    "links": [
        {
            "rel": "self",
            "href": "https://ucf4-occ0077-occ.oracledemos.com:443/ccstoreui/v1/products?categoryId=ofertasEspeciais"
        }
    ],
    "category": {
        "longDescription": null,
        "route": "/ofertas-especiais/category/ofertasEspeciais",
        "categoryImages": [],
        "displayName": "Ofertas Especiais",
        "repositoryId": "ofertasEspeciais",
        "active": true,
        "description": null,
        "id": "ofertasEspeciais"
    },
    "items": [
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 20,
                "europe": 20
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$100,00 em compras na Rihappy",
            "id": "20BITZRIHAPPY100",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$100,00 em compras na Rihappy",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=100&width=100"
            ],
            "creationDate": "2018-12-13T13:09:38.000Z",
            "route": "/cr%C3%A9dito-de-r-10000-em-compras-na-rihappy/product/20BITZRIHAPPY100",
            "relatedArticles": [],
            "voucherValue": "100",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=100&width=100",
            "displayName": "Crédito de R$100,00 em compras na Rihappy",
            "description": "Crédito de R$100,00 em compras na Rihappy",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$100,00 em compras na Rihappy",
            "saleVolumePrice": null,
            "childSKUs": [],
            "relatedMediaContent": [],
            "voucherType": null,
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "20BITZRIHAPPY100",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 20
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 20,
                "europe": 20
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v1283101344574865348/products/voucherNespresso.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$99,90 na Nespresso",
            "id": "20BITZNESPRESSO99",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$99,90 na Nespresso",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v1283101344574865348/products/voucherNespresso.png&height=100&width=100"
            ],
            "creationDate": "2018-12-13T13:06:42.000Z",
            "route": "/cr%C3%A9dito-de-r-9990-na-nespresso/product/20BITZNESPRESSO99",
            "relatedArticles": [],
            "voucherValue": "99.90",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v1283101344574865348/products/voucherNespresso.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v1283101344574865348/products/voucherNespresso.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=100&width=100",
            "displayName": "Crédito de R$99,90 na Nespresso",
            "description": "Crédito de R$99,90 na Nespresso",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v1283101344574865348/products/voucherNespresso.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$99,90 na Nespresso",
            "saleVolumePrice": null,
            "childSKUs": [],
            "relatedMediaContent": [],
            "voucherType": null,
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v5060440944527356525/products/nespressoLogo.png",
                "/ccstore/v1/images/?source=/file/v1283101344574865348/products/voucherNespresso.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "20BITZNESPRESSO99",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 20
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 20,
                "europe": 20
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v4205908207136234654/products/voucherHavaianas.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Sandálias Havaianas Vários Modelos (1 par)",
            "id": "20BITZSANDALIAS",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "nonNavigableCategory",
                    "fixedParentCategories": []
                },
                {
                    "repositoryId": "destaques",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "nonNavigableCategory",
                            "fixedParentCategories": []
                        }
                    ]
                },
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "produtos",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=475&width=475",
            "seoUrlSlugDerived": "Sandálias Havaianas Vários Modelos (1 par)",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v4205908207136234654/products/voucherHavaianas.png&height=100&width=100"
            ],
            "creationDate": "2018-11-21T13:49:50.000Z",
            "route": "/sand%C3%A1lias-havaianas-v%C3%A1rios-modelos-1-par/product/20BITZSANDALIAS",
            "relatedArticles": [],
            "voucherValue": "100",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v4205908207136234654/products/voucherHavaianas.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4205908207136234654/products/voucherHavaianas.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=100&width=100",
            "displayName": "Sandálias Havaianas Vários Modelos (1 par)",
            "description": "Sandálias Havaianas Vários Modelos (1 par)",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png",
            "promoCategory": "blackFriday",
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4205908207136234654/products/voucherHavaianas.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Sandálias Havaianas Vários Modelos (1 par)",
            "saleVolumePrice": null,
            "childSKUs": [
                {
                    "productFamily": null,
                    "dynamicPropertyMapLong": {},
                    "primaryThumbImageURL": null,
                    "bundleLinks": [],
                    "largeImage": null,
                    "smallImage": null,
                    "listVolumePrice": null,
                    "displayName": null,
                    "salePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryFullImageURL": null,
                    "listPrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "productListingSku": null,
                    "largeImageURLs": [],
                    "productLine": null,
                    "listVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryLargeImageURL": null,
                    "smallImageURLs": [],
                    "model": null,
                    "thumbnailImage": null,
                    "barcode": null,
                    "saleVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "salePriceEndDate": null,
                    "saleVolumePrice": null,
                    "salePriceStartDate": null,
                    "images": [],
                    "quantity": null,
                    "unitOfMeasure": null,
                    "salePrice": null,
                    "primaryMediumImageURL": null,
                    "fullImageURLs": [],
                    "dynamicPropertyMapBigString": {},
                    "active": true,
                    "thumbImageURLs": [],
                    "mediumImageURLs": [],
                    "repositoryId": "20BITZSANDALIAS",
                    "primarySourceImageURL": null,
                    "primarySmallImageURL": null,
                    "sourceImageURLs": [],
                    "listPrice": 20,
                    "configurable": false
                }
            ],
            "relatedMediaContent": [],
            "voucherType": "Perc",
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v1442388812412140975/products/sandaliashavaianas.png",
                "/ccstore/v1/images/?source=/file/v4205908207136234654/products/voucherHavaianas.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "20BITZSANDALIAS",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 20
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 20,
                "europe": 20
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v2881350882676760882/products/voucherGPA.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Vale Compra no Pão de Açúcar Minuto de R$20,00",
            "id": "20BITZVALEPAODEACUCAR20",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "nonNavigableCategory",
                    "fixedParentCategories": []
                },
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "produtos",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=475&width=475",
            "seoUrlSlugDerived": "Vale Compra no Pão de Açúcar Minuto de R$20,00",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v2881350882676760882/products/voucherGPA.png&height=100&width=100"
            ],
            "creationDate": "2018-11-21T13:49:51.000Z",
            "route": "/vale-compra-no-p%C3%A3o-de-a%C3%A7%C3%BAcar-minuto-de-r-2000/product/20BITZVALEPAODEACUCAR20",
            "relatedArticles": [],
            "voucherValue": "20",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v2881350882676760882/products/voucherGPA.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v2881350882676760882/products/voucherGPA.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=100&width=100",
            "displayName": "Vale Compra no Pão de Açúcar Minuto de R$20,00",
            "description": "Vale Compra no Pão de Açúcar Minuto de R$20,00",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v2881350882676760882/products/voucherGPA.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Vale Compra no Pão de Açúcar Minuto de R$20,00",
            "saleVolumePrice": null,
            "childSKUs": [
                {
                    "productFamily": null,
                    "dynamicPropertyMapLong": {},
                    "primaryThumbImageURL": null,
                    "bundleLinks": [],
                    "largeImage": null,
                    "smallImage": null,
                    "listVolumePrice": null,
                    "displayName": null,
                    "salePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryFullImageURL": null,
                    "listPrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "productListingSku": null,
                    "largeImageURLs": [],
                    "productLine": null,
                    "listVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryLargeImageURL": null,
                    "smallImageURLs": [],
                    "model": null,
                    "thumbnailImage": null,
                    "barcode": null,
                    "saleVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "salePriceEndDate": null,
                    "saleVolumePrice": null,
                    "salePriceStartDate": null,
                    "images": [],
                    "quantity": null,
                    "unitOfMeasure": null,
                    "salePrice": null,
                    "primaryMediumImageURL": null,
                    "fullImageURLs": [],
                    "dynamicPropertyMapBigString": {},
                    "active": true,
                    "thumbImageURLs": [],
                    "mediumImageURLs": [],
                    "repositoryId": "20BITZVALEPAODEACUCAR20",
                    "primarySourceImageURL": null,
                    "primarySmallImageURL": null,
                    "sourceImageURLs": [],
                    "listPrice": 20,
                    "configurable": false
                }
            ],
            "relatedMediaContent": [],
            "voucherType": "Abso",
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v7057220319508348301/products/paodeacucarminutologo.png",
                "/ccstore/v1/images/?source=/file/v2881350882676760882/products/voucherGPA.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "20BITZVALEPAODEACUCAR20",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 20
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 40,
                "europe": 40
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$200,00 em compras na Rihappy",
            "id": "40BITZRIHAPPY200",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$200,00 em compras na Rihappy",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=100&width=100"
            ],
            "creationDate": "2018-12-13T13:10:38.000Z",
            "route": "/cr%C3%A9dito-de-r-20000-em-compras-na-rihappy/product/40BITZRIHAPPY200",
            "relatedArticles": [],
            "voucherValue": "200",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=100&width=100",
            "displayName": "Crédito de R$200,00 em compras na Rihappy",
            "description": "Crédito de R$200,00 em compras na Rihappy",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$200,00 em compras na Rihappy",
            "saleVolumePrice": null,
            "childSKUs": [],
            "relatedMediaContent": [],
            "voucherType": null,
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "40BITZRIHAPPY200",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 40
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 20,
                "europe": 20
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v5341199959649622531/products/voucherFuller.jpeg&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Cerveja Fuller London Pride Garrafa 500ml",
            "id": "20BITZCERVEJAFULLER500ML",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "destaques",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "nonNavigableCategory",
                            "fixedParentCategories": []
                        }
                    ]
                },
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "produtos",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=475&width=475",
            "seoUrlSlugDerived": "Cerveja Fuller London Pride Garrafa 500ml",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v5341199959649622531/products/voucherFuller.jpeg&height=100&width=100"
            ],
            "creationDate": "2018-11-21T13:49:50.000Z",
            "route": "/cerveja-fuller-london-pride-garrafa-500ml/product/20BITZCERVEJAFULLER500ML",
            "relatedArticles": [],
            "voucherValue": "100",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v5341199959649622531/products/voucherFuller.jpeg&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v5341199959649622531/products/voucherFuller.jpeg&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=100&width=100",
            "displayName": "Cerveja Fuller London Pride Garrafa 500ml",
            "description": "Cerveja Fuller London Pride Garrafa 500ml",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v5341199959649622531/products/voucherFuller.jpeg&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Cerveja Fuller London Pride Garrafa 500ml",
            "saleVolumePrice": null,
            "childSKUs": [
                {
                    "productFamily": null,
                    "dynamicPropertyMapLong": {},
                    "primaryThumbImageURL": null,
                    "bundleLinks": [],
                    "largeImage": null,
                    "smallImage": null,
                    "listVolumePrice": null,
                    "displayName": null,
                    "salePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryFullImageURL": null,
                    "listPrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "productListingSku": null,
                    "largeImageURLs": [],
                    "productLine": null,
                    "listVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryLargeImageURL": null,
                    "smallImageURLs": [],
                    "model": null,
                    "thumbnailImage": null,
                    "barcode": null,
                    "saleVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "salePriceEndDate": null,
                    "saleVolumePrice": null,
                    "salePriceStartDate": null,
                    "images": [],
                    "quantity": null,
                    "unitOfMeasure": null,
                    "salePrice": null,
                    "primaryMediumImageURL": null,
                    "fullImageURLs": [],
                    "dynamicPropertyMapBigString": {},
                    "active": true,
                    "thumbImageURLs": [],
                    "mediumImageURLs": [],
                    "repositoryId": "20BITZCERVEJAFULLER500ML",
                    "primarySourceImageURL": null,
                    "primarySmallImageURL": null,
                    "sourceImageURLs": [],
                    "listPrice": 20,
                    "configurable": false
                }
            ],
            "relatedMediaContent": [],
            "voucherType": "Perc",
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v6145968980771932717/products/cervejafuller.jpg",
                "/ccstore/v1/images/?source=/file/v5341199959649622531/products/voucherFuller.jpeg"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "20BITZCERVEJAFULLER500ML",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 20
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 40,
                "europe": 40
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$80,00 em compras na Livraria Cultura",
            "id": "40BITZLIVCULT80",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$80,00 em compras na Livraria Cultura",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=100&width=100"
            ],
            "creationDate": "2018-11-21T13:49:50.000Z",
            "route": "/cr%C3%A9dito-de-r-8000-em-compras-na-livraria-cultura/product/40BITZLIVCULT80",
            "relatedArticles": [],
            "voucherValue": "80",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
            "displayName": "Crédito de R$80,00 em compras na Livraria Cultura",
            "description": "Crédito de R$80,00 em compras na Livraria Cultura",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
            "promoCategory": "blackFriday",
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$80,00 em compras na Livraria Cultura",
            "saleVolumePrice": null,
            "childSKUs": [
                {
                    "productFamily": null,
                    "dynamicPropertyMapLong": {},
                    "primaryThumbImageURL": null,
                    "bundleLinks": [],
                    "largeImage": null,
                    "smallImage": null,
                    "listVolumePrice": null,
                    "displayName": null,
                    "salePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryFullImageURL": null,
                    "listPrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "productListingSku": null,
                    "largeImageURLs": [],
                    "productLine": null,
                    "listVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryLargeImageURL": null,
                    "smallImageURLs": [],
                    "model": null,
                    "thumbnailImage": null,
                    "barcode": null,
                    "saleVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "salePriceEndDate": null,
                    "saleVolumePrice": null,
                    "salePriceStartDate": null,
                    "images": [],
                    "quantity": null,
                    "unitOfMeasure": null,
                    "salePrice": null,
                    "primaryMediumImageURL": null,
                    "fullImageURLs": [],
                    "dynamicPropertyMapBigString": {},
                    "active": true,
                    "thumbImageURLs": [],
                    "mediumImageURLs": [],
                    "repositoryId": "40BITZLIVCULT80",
                    "primarySourceImageURL": null,
                    "primarySmallImageURL": null,
                    "sourceImageURLs": [],
                    "listPrice": 40,
                    "configurable": false
                }
            ],
            "relatedMediaContent": [],
            "voucherType": "Abso",
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "40BITZLIVCULT80",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 40
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 60,
                "europe": 60
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$300,00 em compras na Rihappy",
            "id": "60BITZRIHAPPY300",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$300,00 em compras na Rihappy",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=100&width=100"
            ],
            "creationDate": "2018-12-13T13:11:28.000Z",
            "route": "/cr%C3%A9dito-de-r-30000-em-compras-na-rihappy/product/60BITZRIHAPPY300",
            "relatedArticles": [],
            "voucherValue": "300",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=100&width=100",
            "displayName": "Crédito de R$300,00 em compras na Rihappy",
            "description": "Crédito de R$300,00 em compras na Rihappy",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$300,00 em compras na Rihappy",
            "saleVolumePrice": null,
            "childSKUs": [],
            "relatedMediaContent": [],
            "voucherType": null,
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v6387936049953766343/products/RihappyLogo.png",
                "/ccstore/v1/images/?source=/file/v6156502536905168078/products/voucherRihappy.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "60BITZRIHAPPY300",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 60
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 60,
                "europe": 60
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$100,00 em compras na Livraria Cultura",
            "id": "60BITZLIVCULT100",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$100,00 em compras na Livraria Cultura",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=100&width=100"
            ],
            "creationDate": "2018-11-21T13:49:50.000Z",
            "route": "/cr%C3%A9dito-de-r-10000-em-compras-na-livraria-cultura/product/60BITZLIVCULT100",
            "relatedArticles": [],
            "voucherValue": "100",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
            "displayName": "Crédito de R$100,00 em compras na Livraria Cultura",
            "description": "Crédito de R$100,00 em compras na Livraria Cultura",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$100,00 em compras na Livraria Cultura",
            "saleVolumePrice": null,
            "childSKUs": [
                {
                    "productFamily": null,
                    "dynamicPropertyMapLong": {},
                    "primaryThumbImageURL": null,
                    "bundleLinks": [],
                    "largeImage": null,
                    "smallImage": null,
                    "listVolumePrice": null,
                    "displayName": null,
                    "salePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryFullImageURL": null,
                    "listPrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "productListingSku": null,
                    "largeImageURLs": [],
                    "productLine": null,
                    "listVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryLargeImageURL": null,
                    "smallImageURLs": [],
                    "model": null,
                    "thumbnailImage": null,
                    "barcode": null,
                    "saleVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "salePriceEndDate": null,
                    "saleVolumePrice": null,
                    "salePriceStartDate": null,
                    "images": [],
                    "quantity": null,
                    "unitOfMeasure": null,
                    "salePrice": null,
                    "primaryMediumImageURL": null,
                    "fullImageURLs": [],
                    "dynamicPropertyMapBigString": {},
                    "active": true,
                    "thumbImageURLs": [],
                    "mediumImageURLs": [],
                    "repositoryId": "60BITZLIVCULT100",
                    "primarySourceImageURL": null,
                    "primarySmallImageURL": null,
                    "sourceImageURLs": [],
                    "listPrice": 60,
                    "configurable": false
                }
            ],
            "relatedMediaContent": [],
            "voucherType": "Abso",
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "60BITZLIVCULT100",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 60
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 20,
                "europe": 20
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v7132454588073279859/products/voucherGymPass.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$99,90 no Gympass",
            "id": "20BITZCREDITO99GYMPASS",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$99,90 no Gympass",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v7132454588073279859/products/voucherGymPass.png&height=100&width=100"
            ],
            "creationDate": "2018-11-21T13:49:50.000Z",
            "route": "/cr%C3%A9dito-de-r-9990-no-gympass/product/20BITZCREDITO99GYMPASS",
            "relatedArticles": [],
            "voucherValue": "99.9",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v7132454588073279859/products/voucherGymPass.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v7132454588073279859/products/voucherGymPass.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=100&width=100",
            "displayName": "Crédito de R$99,90 no Gympass",
            "description": "Crédito de R$99,90 no Gympass",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png",
            "promoCategory": "blackFriday",
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v7132454588073279859/products/voucherGymPass.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$99,90 no Gympass",
            "saleVolumePrice": null,
            "childSKUs": [
                {
                    "productFamily": null,
                    "dynamicPropertyMapLong": {},
                    "primaryThumbImageURL": null,
                    "bundleLinks": [],
                    "largeImage": null,
                    "smallImage": null,
                    "listVolumePrice": null,
                    "displayName": null,
                    "salePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryFullImageURL": null,
                    "listPrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "productListingSku": null,
                    "largeImageURLs": [],
                    "productLine": null,
                    "listVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "primaryLargeImageURL": null,
                    "smallImageURLs": [],
                    "model": null,
                    "thumbnailImage": null,
                    "barcode": null,
                    "saleVolumePrices": {
                        "defaultPriceGroup": null,
                        "europe": null
                    },
                    "salePriceEndDate": null,
                    "saleVolumePrice": null,
                    "salePriceStartDate": null,
                    "images": [],
                    "quantity": null,
                    "unitOfMeasure": null,
                    "salePrice": null,
                    "primaryMediumImageURL": null,
                    "fullImageURLs": [],
                    "dynamicPropertyMapBigString": {},
                    "active": true,
                    "thumbImageURLs": [],
                    "mediumImageURLs": [],
                    "repositoryId": "20BITZCREDITO99GYMPASS",
                    "primarySourceImageURL": null,
                    "primarySmallImageURL": null,
                    "sourceImageURLs": [],
                    "listPrice": 20,
                    "configurable": false
                }
            ],
            "relatedMediaContent": [],
            "voucherType": "Abso",
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v4040744730602144941/products/gympasslogo.png",
                "/ccstore/v1/images/?source=/file/v7132454588073279859/products/voucherGymPass.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "20BITZCREDITO99GYMPASS",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 20
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 80,
                "europe": 80
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$120,00 em compras na Livraria Cultura",
            "id": "80BITZLIVCULT80",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$120,00 em compras na Livraria Cultura",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=100&width=100"
            ],
            "creationDate": "2018-11-27T17:30:59.000Z",
            "route": "/cr%C3%A9dito-de-r-12000-em-compras-na-livraria-cultura/product/80BITZLIVCULT80",
            "relatedArticles": [],
            "voucherValue": "120",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
            "displayName": "Crédito de R$120,00 em compras na Livraria Cultura",
            "description": "Crédito de R$120,00 em compras na Livraria Cultura",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
            "promoCategory": "blackFriday",
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$120,00 em compras na Livraria Cultura",
            "saleVolumePrice": null,
            "childSKUs": [],
            "relatedMediaContent": [],
            "voucherType": null,
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "80BITZLIVCULT80",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 80
        },
        {
            "listVolumePrice": null,
            "excludeFromSitemap": false,
            "relatedProducts": null,
            "orderLimit": null,
            "listPrices": {
                "defaultPriceGroup": 150,
                "europe": 150
            },
            "type": null,
            "largeImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=940&width=940"
            ],
            "listVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "sellerId": null,
            "setId": null,
            "primaryImageAltText": "Crédito de R$150,00 em compras na Livraria Cultura",
            "id": "150BITZLIVCULT150",
            "brand": null,
            "parentCategories": [
                {
                    "repositoryId": "ofertasEspeciais",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "produtos",
                            "fixedParentCategories": [
                                {
                                    "repositoryId": "rootCategory",
                                    "fixedParentCategories": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "repositoryId": "blackFriday",
                    "fixedParentCategories": [
                        {
                            "repositoryId": "rootCategory",
                            "fixedParentCategories": []
                        }
                    ]
                }
            ],
            "height": null,
            "defaultProductListingSku": null,
            "unitOfMeasure": null,
            "primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
            "seoUrlSlugDerived": "Crédito de R$150,00 em compras na Livraria Cultura",
            "showInSupport": false,
            "weight": null,
            "active": true,
            "thumbImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=100&width=100"
            ],
            "creationDate": "2018-12-06T14:42:31.000Z",
            "route": "/cr%C3%A9dito-de-r-15000-em-compras-na-livraria-cultura/product/150BITZLIVCULT150",
            "relatedArticles": [],
            "voucherValue": "40",
            "mediumImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=475&width=475",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=475&width=475"
            ],
            "primarySourceImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "parentCategory": null,
            "sourceImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "primarySmallImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
            "avgCustRating": null,
            "serviceCloudID": null,
            "longDescription": null,
            "primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=100&width=100",
            "displayName": "Crédito de R$150,00 em compras na Livraria Cultura",
            "description": "Crédito de R$150,00 em compras na Livraria Cultura",
            "salePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryFullImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
            "promoCategory": null,
            "primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=940&width=940",
            "smallImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png&height=300&width=300",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png&height=300&width=300"
            ],
            "shippingSurcharges": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "saleVolumePrices": {
                "defaultPriceGroup": null,
                "europe": null
            },
            "primaryImageTitle": "Crédito de R$150,00 em compras na Livraria Cultura",
            "saleVolumePrice": null,
            "childSKUs": [],
            "relatedMediaContent": [],
            "voucherType": null,
            "salePrice": null,
            "fullImageURLs": [
                "/ccstore/v1/images/?source=/file/v5431921182895063473/products/livrariaculturalogo.png",
                "/ccstore/v1/images/?source=/file/v4013379274903172102/products/voucherLivrariaCultura.png"
            ],
            "length": null,
            "blueKaiViewTag": null,
            "variantValuesOrder": {},
            "notForIndividualSale": false,
            "topSeller": 0,
            "serviceCloudServiceProductID": null,
            "repositoryId": "150BITZLIVCULT150",
            "width": null,
            "shippingSurcharge": null,
            "productImagesMetadata": [
                {},
                {}
            ],
            "configurable": false,
            "listPrice": 150
        }
    ]
}

























var getBannerJSON =
{
	"totalResults": 4,
	"offset": 0,
	"limit": 250,
	"links": [
	{
		"rel": "self",
		"href": "https://ucf4-occ0077-occ.oracledemos.com:443/ccstoreui/v1/products?categoryId=destaques"
	}
	],
	"category": {
		"longDescription": null,
		"route": "/destaques/category/destaques",
		"categoryImages": [
		{
			"path": "/products/dogurbano.png",
			"metadata": {},
			"repositoryId": "m150036",
			"name": "/products/dogurbano.png",
			"url": "https://ucf4-occ0077-occ.oracledemos.com/file/v4148782049832226844/products/dogurbano.png",
			"tags": []
		},
		{
			"path": "/products/netshoes.png",
			"metadata": {},
			"repositoryId": "m150037",
			"name": "/products/netshoes.png",
			"url": "https://ucf4-occ0077-occ.oracledemos.com/file/v3979735441756571292/products/netshoes.png",
			"tags": []
		}
		],
		"displayName": "Destaques",
		"repositoryId": "destaques",
		"active": true,
		"description": null,
		"id": "destaques"
	},
	"items": [
	{
		"listVolumePrice": null,
		"excludeFromSitemap": false,
		"relatedProducts": null,
		"orderLimit": null,
		"listPrices": {
			"defaultPriceGroup": 20,
			"europe": 20
		},
		"type": null,
		"largeImageURLs": [
		"/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=940&width=940"
		],
		"listVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"setId": null,
		"primaryImageAltText": "Compre camiseta Babolat e ganhe 50% de desconto na segunda",
		"id": "20BITZCREDITOBABOLAT50PORC",
		"brand": "Babolat",
		"parentCategories": [
		{
			"repositoryId": "destaques",
			"fixedParentCategories": [
			{
				"repositoryId": "nonNavigableCategory",
				"fixedParentCategories": []
			}
			]
		},
		{
			"repositoryId": "produtos",
			"fixedParentCategories": [
			{
				"repositoryId": "rootCategory",
				"fixedParentCategories": []
			}
			]
		}
		],
		"height": null,
		"defaultProductListingSku": null,
		"unitOfMeasure": null,
		"primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=475&width=475",
		"seoUrlSlugDerived": "Compre camiseta Babolat e ganhe 50% de desconto na segunda",
		"showInSupport": false,
		"weight": null,
		"active": true,
		"thumbImageURLs": [
		"/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=100&width=100"
		],
		"creationDate": "2018-11-21T14:05:00.000Z",
		"route": "/compre-camiseta-babolat-e-ganhe-50-de-desconto-na-segunda/product/20BITZCREDITOBABOLAT50PORC",
		"relatedArticles": [],
		"voucherValue": null,
		"mediumImageURLs": [
		"/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=475&width=475"
		],
		"primarySourceImageURL": "/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=300&width=300",
		"parentCategory": null,
		"sourceImageURLs": [
		"/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=300&width=300"
		],
		"primarySmallImageURL": "/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=300&width=300",
		"avgCustRating": null,
		"serviceCloudID": null,
		"longDescription": "<p>Compre camiseta Babolat e ganhe 50% de desconto na segunda camiseta</p>",
		"primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=100&width=100",
		"displayName": "Compre camiseta Babolat e ganhe 50% de desconto na segunda",
		"description": "Compre camiseta Babolat e ganhe 50% de desconto na segunda",
		"salePrices": {
			"defaultPriceGroup": 16,
			"europe": null
		},
		"primaryFullImageURL": "/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png",
		"promoCategory": null,
		"primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=940&width=940",
		"smallImageURLs": [
		"/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png&height=300&width=300"
		],
		"shippingSurcharges": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"saleVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"primaryImageTitle": "Compre camiseta Babolat e ganhe 50% de desconto na segunda",
		"saleVolumePrice": null,
		"childSKUs": [
		{
			"productFamily": null,
			"dynamicPropertyMapLong": {},
			"primaryThumbImageURL": null,
			"bundleLinks": [],
			"largeImage": null,
			"smallImage": null,
			"listVolumePrice": null,
			"displayName": null,
			"salePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryFullImageURL": null,
			"listPrices": {
				"defaultPriceGroup": 20,
				"europe": 20
			},
			"productListingSku": null,
			"largeImageURLs": [],
			"productLine": null,
			"listVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryLargeImageURL": null,
			"smallImageURLs": [],
			"model": null,
			"thumbnailImage": null,
			"barcode": null,
			"saleVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"salePriceEndDate": null,
			"saleVolumePrice": null,
			"salePriceStartDate": null,
			"images": [],
			"quantity": null,
			"unitOfMeasure": null,
			"salePrice": 16,
			"primaryMediumImageURL": null,
			"fullImageURLs": [],
			"dynamicPropertyMapBigString": {},
			"active": true,
			"thumbImageURLs": [],
			"mediumImageURLs": [],
			"repositoryId": "20BITZCREDITOBABOLAT50PORC",
			"primarySourceImageURL": null,
			"primarySmallImageURL": null,
			"sourceImageURLs": [],
			"listPrice": 20,
			"configurable": false
		}
		],
		"relatedMediaContent": [],
		"voucherType": null,
		"salePrice": 16,
		"fullImageURLs": [
		"/ccstore/v1/images/?source=/file/v2464518065130219195/products/babolat.png"
		],
		"length": null,
		"blueKaiViewTag": null,
		"variantValuesOrder": {},
		"notForIndividualSale": false,
		"topSeller": 0,
		"serviceCloudServiceProductID": null,
		"repositoryId": "20BITZCREDITOBABOLAT50PORC",
		"width": null,
		"shippingSurcharge": null,
		"productImagesMetadata": [
		{}
		],
		"configurable": false,
		"listPrice": 20
	},
	{
		"listVolumePrice": null,
		"excludeFromSitemap": false,
		"relatedProducts": null,
		"orderLimit": null,
		"listPrices": {
			"defaultPriceGroup": 40,
			"europe": 40
		},
		"type": null,
		"largeImageURLs": [
		"/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=940&width=940",
		"/ccstore/v1/images/?source=/file/v6697831035354321661/products/shoulder.png&height=940&width=940"
		],
		"listVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"setId": null,
		"primaryImageAltText": "10% OFF na Shoulder",
		"id": "40BITZ10PORCOFFSHOULDER",
		"brand": "Shoulder",
		"parentCategories": [
		{
			"repositoryId": "moda",
			"fixedParentCategories": [
			{
				"repositoryId": "nonNavigableCategory",
				"fixedParentCategories": []
			}
			]
		},
		{
			"repositoryId": "destaques",
			"fixedParentCategories": [
			{
				"repositoryId": "nonNavigableCategory",
				"fixedParentCategories": []
			}
			]
		},
		{
			"repositoryId": "produtos",
			"fixedParentCategories": [
			{
				"repositoryId": "rootCategory",
				"fixedParentCategories": []
			}
			]
		}
		],
		"height": null,
		"defaultProductListingSku": null,
		"unitOfMeasure": null,
		"primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=475&width=475",
		"seoUrlSlugDerived": "10% OFF na Shoulder",
		"showInSupport": false,
		"weight": null,
		"active": true,
		"thumbImageURLs": [
		"/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=100&width=100",
		"/ccstore/v1/images/?source=/file/v6697831035354321661/products/shoulder.png&height=100&width=100"
		],
		"creationDate": "2018-11-21T14:05:00.000Z",
		"route": "/10-off-na-shoulder/product/40BITZ10PORCOFFSHOULDER",
		"relatedArticles": [],
		"voucherValue": null,
		"mediumImageURLs": [
		"/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=475&width=475",
		"/ccstore/v1/images/?source=/file/v6697831035354321661/products/shoulder.png&height=475&width=475"
		],
		"primarySourceImageURL": "/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=300&width=300",
		"parentCategory": null,
		"sourceImageURLs": [
		"/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=300&width=300",
		"/ccstore/v1/images/?source=/file/v6697831035354321661/products/shoulder.png&height=300&width=300"
		],
		"primarySmallImageURL": "/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=300&width=300",
		"avgCustRating": null,
		"serviceCloudID": null,
		"longDescription": "<p>10% OFF na Shoulder</p>",
		"primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=100&width=100",
		"displayName": "10% OFF na Shoulder",
		"description": "10% OFF na Shoulder",
		"salePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"primaryFullImageURL": "/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png",
		"promoCategory": null,
		"primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=940&width=940",
		"smallImageURLs": [
		"/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png&height=300&width=300",
		"/ccstore/v1/images/?source=/file/v6697831035354321661/products/shoulder.png&height=300&width=300"
		],
		"shippingSurcharges": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"saleVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"primaryImageTitle": "10% OFF na Shoulder",
		"saleVolumePrice": null,
		"childSKUs": [
		{
			"productFamily": null,
			"dynamicPropertyMapLong": {},
			"primaryThumbImageURL": null,
			"bundleLinks": [],
			"largeImage": null,
			"smallImage": null,
			"listVolumePrice": null,
			"displayName": null,
			"salePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryFullImageURL": null,
			"listPrices": {
				"defaultPriceGroup": 40,
				"europe": 40
			},
			"productListingSku": null,
			"largeImageURLs": [],
			"productLine": null,
			"listVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryLargeImageURL": null,
			"smallImageURLs": [],
			"model": null,
			"thumbnailImage": null,
			"barcode": null,
			"saleVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"salePriceEndDate": null,
			"saleVolumePrice": null,
			"salePriceStartDate": null,
			"images": [],
			"quantity": null,
			"unitOfMeasure": null,
			"salePrice": null,
			"primaryMediumImageURL": null,
			"fullImageURLs": [],
			"dynamicPropertyMapBigString": {},
			"active": true,
			"thumbImageURLs": [],
			"mediumImageURLs": [],
			"repositoryId": "40BITZ10PORCOFFSHOULDER",
			"primarySourceImageURL": null,
			"primarySmallImageURL": null,
			"sourceImageURLs": [],
			"listPrice": 40,
			"configurable": false
		}
		],
		"relatedMediaContent": [],
		"voucherType": null,
		"salePrice": null,
		"fullImageURLs": [
		"/ccstore/v1/images/?source=/file/v4391280924271489010/products/shoulder574x574.png",
		"/ccstore/v1/images/?source=/file/v6697831035354321661/products/shoulder.png"
		],
		"length": null,
		"blueKaiViewTag": null,
		"variantValuesOrder": {},
		"notForIndividualSale": false,
		"topSeller": 1,
		"serviceCloudServiceProductID": null,
		"repositoryId": "40BITZ10PORCOFFSHOULDER",
		"width": null,
		"shippingSurcharge": null,
		"productImagesMetadata": [
		{},
		{}
		],
		"configurable": false,
		"listPrice": 40
	},
	{
		"listVolumePrice": null,
		"excludeFromSitemap": false,
		"relatedProducts": null,
		"orderLimit": null,
		"listPrices": {
			"defaultPriceGroup": 40,
			"europe": 40
		},
		"type": null,
		"largeImageURLs": [
		"/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=940&width=940"
		],
		"listVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"setId": null,
		"primaryImageAltText": "Todo o site Glamour com 15% de desconto",
		"id": "40BITZSITEGLAMOUR15PORC",
		"brand": "Glamour",
		"parentCategories": [
		{
			"repositoryId": "moda",
			"fixedParentCategories": [
			{
				"repositoryId": "nonNavigableCategory",
				"fixedParentCategories": []
			}
			]
		},
		{
			"repositoryId": "destaques",
			"fixedParentCategories": [
			{
				"repositoryId": "nonNavigableCategory",
				"fixedParentCategories": []
			}
			]
		},
		{
			"repositoryId": "produtos",
			"fixedParentCategories": [
			{
				"repositoryId": "rootCategory",
				"fixedParentCategories": []
			}
			]
		}
		],
		"height": null,
		"defaultProductListingSku": null,
		"unitOfMeasure": null,
		"primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=475&width=475",
		"seoUrlSlugDerived": "Todo o site Glamour com 15% de desconto",
		"showInSupport": false,
		"weight": null,
		"active": true,
		"thumbImageURLs": [
		"/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=100&width=100"
		],
		"creationDate": "2018-11-21T14:05:01.000Z",
		"route": "/todo-o-site-glamour-com-15-de-desconto/product/40BITZSITEGLAMOUR15PORC",
		"relatedArticles": [],
		"voucherValue": null,
		"mediumImageURLs": [
		"/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=475&width=475"
		],
		"primarySourceImageURL": "/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=300&width=300",
		"parentCategory": null,
		"sourceImageURLs": [
		"/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=300&width=300"
		],
		"primarySmallImageURL": "/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=300&width=300",
		"avgCustRating": null,
		"serviceCloudID": null,
		"longDescription": "<p>Todo o site Glamour com 15% de desconto</p>",
		"primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=100&width=100",
		"displayName": "Todo o site Glamour com 15% de desconto",
		"description": "Todo o site Glamour com 15% de desconto",
		"salePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"primaryFullImageURL": "/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png",
		"promoCategory": null,
		"primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=940&width=940",
		"smallImageURLs": [
		"/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png&height=300&width=300"
		],
		"shippingSurcharges": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"saleVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"primaryImageTitle": "Todo o site Glamour com 15% de desconto",
		"saleVolumePrice": null,
		"childSKUs": [
		{
			"productFamily": null,
			"dynamicPropertyMapLong": {},
			"primaryThumbImageURL": null,
			"bundleLinks": [],
			"largeImage": null,
			"smallImage": null,
			"listVolumePrice": null,
			"displayName": null,
			"salePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryFullImageURL": null,
			"listPrices": {
				"defaultPriceGroup": 40,
				"europe": 40
			},
			"productListingSku": null,
			"largeImageURLs": [],
			"productLine": null,
			"listVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryLargeImageURL": null,
			"smallImageURLs": [],
			"model": null,
			"thumbnailImage": null,
			"barcode": null,
			"saleVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"salePriceEndDate": null,
			"saleVolumePrice": null,
			"salePriceStartDate": null,
			"images": [],
			"quantity": null,
			"unitOfMeasure": null,
			"salePrice": null,
			"primaryMediumImageURL": null,
			"fullImageURLs": [],
			"dynamicPropertyMapBigString": {},
			"active": true,
			"thumbImageURLs": [],
			"mediumImageURLs": [],
			"repositoryId": "40BITZSITEGLAMOUR15PORC",
			"primarySourceImageURL": null,
			"primarySmallImageURL": null,
			"sourceImageURLs": [],
			"listPrice": 40,
			"configurable": false
		}
		],
		"relatedMediaContent": [],
		"voucherType": null,
		"salePrice": null,
		"fullImageURLs": [
		"/ccstore/v1/images/?source=/file/v2169526835504860333/products/glamour.png"
		],
		"length": null,
		"blueKaiViewTag": null,
		"variantValuesOrder": {},
		"notForIndividualSale": false,
		"topSeller": 0,
		"serviceCloudServiceProductID": null,
		"repositoryId": "40BITZSITEGLAMOUR15PORC",
		"width": null,
		"shippingSurcharge": null,
		"productImagesMetadata": [
		{}
		],
		"configurable": false,
		"listPrice": 40
	},
	{
		"listVolumePrice": null,
		"excludeFromSitemap": false,
		"relatedProducts": null,
		"orderLimit": null,
		"listPrices": {
			"defaultPriceGroup": 60,
			"europe": 60
		},
		"type": null,
		"largeImageURLs": [
		"/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=940&width=940"
		],
		"listVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"setId": null,
		"primaryImageAltText": "30% OFF em 2 presentes na Carina Duek",
		"id": "60BITZ30PORCOFFCARINADUEK",
		"brand": "Carina Duek",
		"parentCategories": [
		{
			"repositoryId": "moda",
			"fixedParentCategories": [
			{
				"repositoryId": "nonNavigableCategory",
				"fixedParentCategories": []
			}
			]
		},
		{
			"repositoryId": "destaques",
			"fixedParentCategories": [
			{
				"repositoryId": "nonNavigableCategory",
				"fixedParentCategories": []
			}
			]
		},
		{
			"repositoryId": "produtos",
			"fixedParentCategories": [
			{
				"repositoryId": "rootCategory",
				"fixedParentCategories": []
			}
			]
		}
		],
		"height": null,
		"defaultProductListingSku": null,
		"unitOfMeasure": null,
		"primaryMediumImageURL": "/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=475&width=475",
		"seoUrlSlugDerived": "30% OFF em 2 presentes na Carina Duek",
		"showInSupport": false,
		"weight": null,
		"active": true,
		"thumbImageURLs": [
		"/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=100&width=100"
		],
		"creationDate": "2018-11-21T14:05:01.000Z",
		"route": "/30-off-em-2-presentes-na-carina-duek/product/60BITZ30PORCOFFCARINADUEK",
		"relatedArticles": [],
		"voucherValue": null,
		"mediumImageURLs": [
		"/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=475&width=475"
		],
		"primarySourceImageURL": "/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=300&width=300",
		"parentCategory": null,
		"sourceImageURLs": [
		"/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=300&width=300"
		],
		"primarySmallImageURL": "/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=300&width=300",
		"avgCustRating": null,
		"serviceCloudID": null,
		"longDescription": "<p>30% OFF em 2 presentes na Carina Duek</p>",
		"primaryThumbImageURL": "/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=100&width=100",
		"displayName": "30% OFF em 2 presentes na Carina Duek",
		"description": "30% OFF em 2 presentes na Carina Duek",
		"salePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"primaryFullImageURL": "/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png",
		"promoCategory": null,
		"primaryLargeImageURL": "/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=940&width=940",
		"smallImageURLs": [
		"/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png&height=300&width=300"
		],
		"shippingSurcharges": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"saleVolumePrices": {
			"defaultPriceGroup": null,
			"europe": null
		},
		"primaryImageTitle": "30% OFF em 2 presentes na Carina Duek",
		"saleVolumePrice": null,
		"childSKUs": [
		{
			"productFamily": null,
			"dynamicPropertyMapLong": {},
			"primaryThumbImageURL": null,
			"bundleLinks": [],
			"largeImage": null,
			"smallImage": null,
			"listVolumePrice": null,
			"displayName": null,
			"salePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryFullImageURL": null,
			"listPrices": {
				"defaultPriceGroup": 60,
				"europe": 60
			},
			"productListingSku": null,
			"largeImageURLs": [],
			"productLine": null,
			"listVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"primaryLargeImageURL": null,
			"smallImageURLs": [],
			"model": null,
			"thumbnailImage": null,
			"barcode": null,
			"saleVolumePrices": {
				"defaultPriceGroup": null,
				"europe": null
			},
			"salePriceEndDate": null,
			"saleVolumePrice": null,
			"salePriceStartDate": null,
			"images": [],
			"quantity": null,
			"unitOfMeasure": null,
			"salePrice": null,
			"primaryMediumImageURL": null,
			"fullImageURLs": [],
			"dynamicPropertyMapBigString": {},
			"active": true,
			"thumbImageURLs": [],
			"mediumImageURLs": [],
			"repositoryId": "60BITZ30PORCOFFCARINADUEK",
			"primarySourceImageURL": null,
			"primarySmallImageURL": null,
			"sourceImageURLs": [],
			"listPrice": 60,
			"configurable": false
		}
		],
		"relatedMediaContent": [],
		"voucherType": null,
		"salePrice": null,
		"fullImageURLs": [
		"/ccstore/v1/images/?source=/file/v4812971203064307234/products/carinaduek.png"
		],
		"length": null,
		"blueKaiViewTag": null,
		"variantValuesOrder": {},
		"notForIndividualSale": false,
		"topSeller": 0,
		"serviceCloudServiceProductID": null,
		"repositoryId": "60BITZ30PORCOFFCARINADUEK",
		"width": null,
		"shippingSurcharge": null,
		"productImagesMetadata": [
		{}
		],
		"configurable": false,
		"listPrice": 60
	}
	]
}