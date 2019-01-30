module.exports = function (app) {
    'use strict';

	const axios = require('axios');
	var btoa = require('btoa');
	var env = require('../config/environment.js');
	var bodyParser = require('body-parser');
	var ls = require('local-storage');

	//O body parser é necessário para fazer os POSTs
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//Create Base Path for Loyalty Calls
	var loyaltyInstance = axios.create({
		baseURL: "https://"+loyalty.environment+".oracledemos.com/salesApi/resources/latest",
		headers: {
			'authorization': "Basic "+env.basicAuth()+"",
			'Content-Type': "application/json",
			'Content-Type':"application/vnd.oracle.adf.resourceitem+json"
		},
		dataType  : "json"
	})

	//Create Base Path for Commerce Cloud Calls
	var commerceInstance = axios.create({
		baseURL: "https://"+commerce.environment+".oracledemos.com",
		headers: {
			'Content-Type': "application/json"
		},
		dataType  : "json"
	})

	//Get Loyalty Member
	app.get('/getMember',function(req, res){

		loyaltyInstance.get('/loyaltyMembers/'+loyalty.memberNumber,{
		})
		.then(function(response){
			console.log(response.data);
			res.send(response.data);
		})
		.catch(function(err){
			console.log(err);
		})

	})


	//Criação de um novo usuário
	app.post('/registerMember',function(req, res){

		ls.remove('MemberID');

		//Cria usuário no Loyalty
		loyaltyInstance.post('/loyaltyMembers/',{
			ProgramName : loyalty.loyaltyProgram,
			ContactFirstName : req.body.ContactFirstName,
			ContactLastName: req.body.ContactLastName,
			WorkPhoneNumber: req.body.WorkPhoneNumber,
			EmailAddress: req.body.EmailAddress
		})
		.then(function(response1){

			//Cria usuário no OCC
			commerceInstance.post('/ccstoreui/v1/profiles',{
				email : req.body.EmailAddress,
				password : req.body.ContactPassword,
				firstName : req.body.ContactFirstName,
				lastName : req.body.ContactLastName,
				receiveEmail : "no",
				shippingAddresses : [],
				locale : "en",
				loyaltyMemberNumber : loyalty.memberNumber
			})
			.then(function(response2){

				console.log(response1.data.MemberNumber);

				ls.set('email',req.body.EmailAddress);	
				ls.set('password',req.body.ContactPassword);	
				ls.set('MemberID',response1.data.MemberNumber);
				loyalty.memberNumber = ls.get('MemberID');
				ls.set('PushTransferPoints', '0');
				ls.set('LevelPopUp', '0');
				console.log(ls.get('MemberID'));
				res.send(ls.get('password'));
				/*res.redirect('/templates/voucher.html');*/
			})
			.catch(function(err){
				console.log(err);
				res.redirect('/templates/register.html');
			})

		})
		.catch(function(err){
			console.log('Errado -->',err);
			res.redirect('/templates/register.html');
		})
	})

	//Create Transaction
	app.post('/createTransaction',function(req, res){
		loyaltyInstance.post('/loyTransactions/',{
			MemberNumber : loyalty.memberNumber,
			ProgramName : loyalty.loyaltyProgram,
			PointTypeName : loyalty.pointType,
			TypeCode : req.body.TypeCode,
			SubTypeCode : req.body.SubTypeCode,
			AmountValue : req.body.AmountValue,
			Comments : req.body.Comments
		})
		.then(function(response){
			console.log('Certo -->', response.data);
			res.send(response.data);
		})
		.catch(function(err){
			console.log('Errado -->',err);
			res.send(err);
		})
	})


	//Create Transaction
	app.get('/getTransactions',function(req, res){
		loyaltyInstance.get('/loyMembers/'+loyalty.memberNumber+'/child/MemberTransactions/')
		.then(function(response){
			console.log('Certo -->', response.data);
			res.send(response.data);
		})
		.catch(function(err){
			console.log('Errado -->',err);
			res.send(err);
		})
	})

    module.exports = app;
};
