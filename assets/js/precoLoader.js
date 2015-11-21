$(function(){
  $('.preco').each(function(index, element){
    var licensePlate = $(element).parent().siblings('.licensePlate').text();
    $.ajax({
      url: '/ajax/calculatePrice',
      method: 'POST'
    }).done(function(data){
      $('.preco').text('R$ '+data.price);
    });
  });
});
