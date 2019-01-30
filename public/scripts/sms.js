function enviaSMS(cel_num, mensagem){
  //var cel_num = "11997732486";
  //var mensagem = "Mensagem%20de%20testeGB7"
  var url = "https://www.paposms.com/webservice/1.0/send/?user=gianbiga%40gmail.com&pass=oracle123&numbers="+cel_num+"&message="+mensagem;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "POST",
    "headers": {
      "authorization": "Basic QUMwNjNhYTNmNzcwMjA0ZGUxZWRlMWU0NDNlOWJmNjIwOTpjNDhiNTFkYmRkOTU4MzMzYWY5Y2QzMmZhNTQwNzk2NA==",
      "cache-control": "no-cache",
      "postman-token": "4b7c31f1-7199-8af5-9b57-eda33872ecb3"
    }
  }

  $.ajax(settings).done(function (response) {
    console.log("response");

  });
$( document ).ajaxComplete(function() {
  $( ".log" ).text( "Triggered ajaxComplete handler." );
  $("form").submit();
});
}


function enviaSMSAsync(cel_num, mensagem){
  //var cel_num = "11997732486";
  //var mensagem = "Mensagem%20de%20testeGB7"
  var url = "https://www.paposms.com/webservice/1.0/send/?user=gianbiga%40gmail.com&pass=oracle123&numbers="+cel_num+"&message="+mensagem;
   var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "POST",
    "headers": {
      "authorization": "Basic QUMwNjNhYTNmNzcwMjA0ZGUxZWRlMWU0NDNlOWJmNjIwOTpjNDhiNTFkYmRkOTU4MzMzYWY5Y2QzMmZhNTQwNzk2NA==",
      "cache-control": "no-cache",
      "postman-token": "4b7c31f1-7199-8af5-9b57-eda33872ecb3"
    }
  }
  return $.ajax(settings);
}