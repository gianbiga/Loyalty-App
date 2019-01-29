var VoucherIDClicked;
var VoucherProdClicked;

/*Guarda variáveis quando clica no popup*/
var displayNameVoucherClicked;
var voucherValueVoucherClicked;
var listPriceVoucherClicked;

var voucherImage;

var buttonFlag;
var buttonLink;

function productPopup(product, id){

	var actButton = document.getElementById("prod-button");

	//If this is a "disabled" discount
	if((document.getElementById(id).getElementsByTagName("span")[0].getAttribute("class")).search("color_disabled")>0){
		actButton.classList.add("color_disabled");
		document.getElementById("prod-img").classList.add("color_disabled");
		actButton.classList.remove("hide");
	}
	else{
		actButton.disabled = false;
		actButton.classList.remove("color_disabled");
		document.getElementById("prod-img").classList.remove("color_disabled");
		actButton.classList.remove("hide");
	}

	//If this is a "secret" discount
	if((document.getElementById(id).getElementsByTagName("span")[0].getAttribute("class")).search("secret")>0){
		product = "secret";
		actButton.classList.add("hide");
		document.getElementById("prod-img").classList.remove("color_disabled");
	}

	//If this discount was already checked
	if((document.getElementById(id).getElementsByTagName("span")[0].getAttribute("class")).search("check")>0){
		product = "check";
		actButton.classList.add("hide");
		document.getElementById("prod-img").classList.remove("color_disabled");
	}

	switch(product){
		case 'bath':
		header = "Banho e Tosa Grátis";
		title = "Banho e Tosa";
		image = "../images/badges/promotion/banhoetosa.png"
		description = "Foi-se o tempo em que o banho se restringia apenas a cuidar da higiene dos cães";
		break;

		case 'bone':
		header = "90% de Desconto";
		title = "Osso";
		image = "../images/badges/promotion/osso.jpg"
		description = "Limpa os dentes, controla o tártaro, combate o mau hálito e excelente para a saúde das gengivas.";
		break;

		case 'steak':
		header = "90% de Desconto";
		title = "Bifinho";
		image = "../images/badges/promotion/steak.jpg"
		description = "O melhor modo de recompensar seu pet é com um saboroso bifinho.";
		break;

		case 'normalfood':
		header = "75% de Desconto";
		title = "Ração Carne";
		image = "../images/badges/promotion/dogfood.jpg"
		description = "Além do delicioso sabor de carne, contém proteína de fácil absorção, que deixa os pelos mais brilhantes";
		break;

		case 'specialfood':
		header = "75% de Desconto";
		title = "Ração Prescrita";
		image = "../images/badges/promotion/dogfoodspecial.jpg"
		description = " Proteínas hidrolisadas altamente digestíveis e hipoalergênicas e complexo patenteado que ajuda a reforçar a barreira cutânea";
		break;

		case 'premiumfood':
		header = "75% de Desconto";
		title = "Ração Premium";
		image = "../images/badges/promotion/dogfoodpremium.jpg"
		description = "Proporciona crescimento equilibrado, nutritivo e saboroso e auxilia na saúde intestinal";
		break;

		case 'clothe':
		header = "Roupinha Grátis";
		title = "Roupinha";
		image = "../images/badges/promotion/roupinha.jpg"
		description = "Seu pet lindo e charmoso! Inclui botões para ajustes nas laterais e diversos tamanhos";
		break;

		case 'secret':
		header = "Benefício Secreto";
		title = "Bloqueado";
		image = "../images/badges/secret.jpg"
		description = "Você ainda não desbloqueou esse desconto! Ganhe pontos e retire seu prêmio!";
		break;

		case 'check':
		header = "Desconto Já Utilizado";
		title = "Prezado Cliente";
		image = "../images/badges/promotion/happyface.png"
		description = "Você já utilizou os descontos desse nível! Avance para as próximas etapas e conquiste outros benefícios!";
		break;

		/*MISSÕES*/

		case 'firststeps':
		header = "Primeiros Passos";
		title = "Como Usar";
		image = "../images/badges/firstSteps.jpg"
		description = "Você ganha essa medalha quando resgatar o seu primeiro voucher! <br><br>É um incentivo para você continuar com a gente =)";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'invitefriend':
		header = "Convide um Amigo";
		title = "Como Usar";
		image = "../images/badges/friendRef.jpg"
		description = "Convide um amigo para o programa e ganhe pontos! <br> <br> Para convidar o amigo, clique no botão abaixo e compartilhe o link através do whatsapp ou facebook. <br><br>Assim que seu amigo se registrar, você completará essa missão e ganhará pontos! ";
		buttonFlag = 0;
		buttonLink = "invite.html";
		break;

		case 'gpalover':
		header = "Havaianas Lover";
		title = "Como Usar";
		image = "../images/badges/GPALover.jpg"
		description = "Você compra muitos produtos da Havaianas? <br>Então você pode ser considerado um Havaianas Lover. <br><br>Comprando apenas 1 produto do Havaianas, você ganha essa medalha e alguns pontos para resgatar em benefícios!";
		buttonFlag = 0;
		buttonLink = "products.html";
		break;

		case 'collaboration':
		header = "Colaboração";
		title = "Como Usar";
		image = "../images/badges/socialMedia.png"
		description = "Gosta dos nossos serviços?<br> Então que tal dar um like nas nossas redes sociais? <br><br>Curta nossa página no Facebook ou Instagram e ganha pontos!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'different':
		header = "Diferente";
		title = "Como Usar";
		image = "../images/badges/secret.jpg"
		description = "Você já utilizou os descontos desse nível! <br><br>Avance para as próximas etapas e conquiste outros benefícios!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'family':
		header = "Família";
		title = "Como Usar";
		image = "../images/badges/family.jpg"
		description = "Sabia que você pode convidar pessoas da sua família para compartilhar os benefícios do programa? <br><br>Clique no botão abaixo e convide um familiar para unir pontos e benefícios!";
		buttonFlag = 0;
		buttonLink = "household.html";
		break;

		case 'furniture':
		header = "Decorador";
		title = "Como Usar";
		image = "../images/badges/furniture.jpg"
		description = "Você gosta de decorar a sua casa?<br><br> Confira nossos vouchers especiais que vão te ajudar a ter uma casa mais bonita! <br><br>lém disso, resgatando 3 vouchers de decoração você ganha pontos!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'popular':
		header = "Popular";
		title = "Como Usar";
		image = "../images/badges/secret.jpg"
		description = "Você já utilizou os descontos desse nível! <br><br>Avance para as próximas etapas e conquiste outros benefícios!";
		buttonFlag = 0;
		buttonLink = "";
		break;


		case 'hiker':
		header = "Hiker";
		title = "Como Usar";
		image = "../images/badges/hiker.jpg"
		description = "Visite mais de 10 lojas diferentes de ganhe essa medalha, além de um presente especial nosso! <br><br> Para desativar, basta fazer uma compra de qualquer produto em 10 lojas diferentes! Boa sorte!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'congrats':
		header = "Parabéns!";
		title = "Como Usar";
		image = "../images/badges/birthday.jpg"
		description = "É o mês do seu aniversário? <br><br>Nós temos um presente para você!<br><br> Se você resgatar qualquer produto no mês do seu aniversário, nós te daremos 10 pontos para gastar em mais benefícios!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'giver':
		header = "Doação";
		title = "Como Usar";
		image = "../images/badges/giver.jpg"
		description = "Você tem um amigo que acabou de começar no programa? <br><br>Ou que está quase conseguindo pontos para resgatar um produto?<br><br> Você sabia que pode doar alguns de seus pontos para ele? Clique no botão abaixo e doe!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'service':
		header = "Atendimento";
		title = "Como Usar";
		image = "../images/badges/service.jpg"
		description = "Está com dúvida sobre algum de nossos serviços? <br><br>Basta clicar no ícone de atendimento no menu inferior do aplicativo e procurar pelas suas respostas. <br><br>Se avaliar nossos atendimento pelo menos 1 vez, você ganha pontos!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		case 'expert':
		header = "Expert";
		title = "Como Usar";
		image = "../images/badges/expert.jpg"
		description = "Você é um expert! <br><br>Chegou até o nível final e utilizou vários benefícios! <br><br>Para provar nosso agradecimento, iremos entregar um presente na sua casa! CLique no botão abaixo e confirme seus dados!";
		buttonFlag = 0;
		buttonLink = "";
		break;

		default:
		header = "Desculpe";
		title = "Desconto Não Encontrado";
		image = "../images/badges/promotion/defaultdog.jpg"
		description = "Não existe nada igual. Dois hambúrgeres, alface, queijo, molho especial, cebola, picles num pão com gergelim";

	}
	document.getElementById("prod-header").innerHTML = header;
	document.getElementById("prod-title").innerHTML = title;
	document.getElementsByClassName("w3-modal-content-mission")[0].style.backgroundImage = "url("+image+")";
	document.getElementById("prod-desc").innerHTML = description;
	document.getElementById('popup').style.display='block';

console.log(buttonLink);


	//ACTIVATE VOUCHER
/*	getMemberVouchersInfo().then(function(results){
		$.each(results.items, function(index, res){
			if(res.VoucherType == document.getElementById(id).getElementsByTagName("span")[0].id){
				VoucherIDClicked = res.LoyMemVchrId;
				VoucherProdClicked = res.VoucherType;
				//console.log(VoucherIDClicked);
			}
		});
	})*/

	/*redeemPoints(memberNumber, "Bitz", title, "100", "1")*/

}


function getId(title) {
	var resArr = getProductsJSON.items.filter(
		function(val)
			{return val.displayName === title});
	if (resArr.length > 0) {
		return resArr[0].id;
	}
	else 
		return null;
}

function voucherPopup(header, title, image, id){
	var actButton = document.getElementById("prod-button");

	document.getElementById("prod-header").innerHTML = header;
	document.getElementById("prod-title").innerHTML = title;
	document.getElementById("prod-img").setAttribute("src",image);
	/*document.getElementById("prod-desc").innerHTML = description;*/
	document.getElementById('popup').style.display='block';
    //console.log(getId(header));
	insertCartOCC(getId(header));

	console.log(id);

//GENERATE VOUCHER
/*displayNameVoucherClicked = getProductsJSON.items[1].displayName;
listPriceVoucherClicked = getProductsJSON.items[1].listPrice;
voucherValueVoucherClicked = getProductsJSON.items[1].voucherValue;
voucherImage = image;*/

/* OCC*/
getOCCSpecificProductFromCollection(productCollection, id).then(function(res){
	displayNameVoucherClicked = res.items[0].displayName;
	listPriceVoucherClicked = res.items[0].listPrice;
	voucherValueVoucherClicked = res.items[0].voucherValue;

	console.log(displayNameVoucherClicked);
console.log(listPriceVoucherClicked);
console.log(voucherValueVoucherClicked);
})

}

function voucherSuccessPopup(voucherDescription, voucherNumber){
	$("#popupVoucherSuccess").find(".popup-voucher-header").text("Voucher Resgatado com Sucesso!");
	$("#popupVoucherSuccess").find(".popup-voucher-title").text(voucherNumber);
	$("#popupVoucherSuccess").find(".popup-product-desc").text("Utilize o número acima para obter o seu "+voucherDescription+" no parceiro responsável");
	$("#popupVoucherSuccess").find(".popup-voucher-product").attr('src',voucherImage)
	document.getElementById('popupVoucherSuccess').style.display='block';
}


function voucherInformationPopup(voucherNumber){
	getSpecificVoucher(voucherNumber).then(function(res){
		$("#popupVoucherSuccess").find(".popup-voucher-header").text(res.ProductNumber);
		$("#popupVoucherSuccess").find(".popup-voucher-title").text(voucherNumber);
		$("#popupVoucherSuccess").find(".popup-product-desc").text("Utilize o número acima para obter o seu "+res.Description+" no parceiro responsável");
		$("#popupVoucherSuccess").find(".popup-voucher-product").attr('src',voucherImage)
		document.getElementById('popupVoucherSuccess').style.display='block';
	})


}


