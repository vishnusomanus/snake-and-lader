
var user = {};

function setPosCss(num,player){
	var top = $('td.col_no_'+num).attr('data-top');
	var left = $('td.col_no_'+num).attr('data-left');
	$('span.user.user'+player).css({
		'left':left+'px',
		'top':top+'px'
	});	
}


function move(num,player,move_pos = []){

	if(num == 1){
		user['player' + player] = num;
		setPosCss(num,player);
	}
	else{
		var from = user['player' + player];
		if(move_pos.length == 0)
		for (var i = from; i <= num; i++) {
			var top = $('td.col_no_'+i).attr('data-top');
			var left = $('td.col_no_'+i).attr('data-left');
			move_pos.push({top:top,left:left})
		}
		$(move_pos).each(function(i,obj){
		  setTimeout(function() {
		          $('span.user.user'+player).css({
					'left':obj.left+'px',
					'top':obj.top+'px'
				});	
		      }, 500*i); 
		});
		user['player' + player] = num;	
	}

}



jQuery(document).ready(function($) {
	

	$(function(){
	var dice = $("#dice");
	dice.click(function(){
		$(".wrap").append("<div id='dice_mask'></div>");//add mask
		dice.attr("class","dice");//After clearing the last points animation
		dice.css('cursor','default');
		var num = Math.floor(Math.random()*6+1);//random num 1-6
		dice.animate({left: '+2px'}, 100,function(){
			dice.addClass("dice_t");
		}).delay(200).animate({top:'-2px'},100,function(){
			dice.removeClass("dice_t").addClass("dice_s");
		}).delay(200).animate({opacity: 'show'},600,function(){
			dice.removeClass("dice_s").addClass("dice_e");
		}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
			dice.removeClass("dice_e").addClass("dice_"+num);
			$("#result").html("Your throwing points are<span>"+num+"</span>");
			dice.css('cursor','pointer');
			$("#dice_mask").remove();//remove mask
		});
	});
});

$('td.col').each(function(i,obj){
	var pos = $(this).position(); 
	$(this).attr('data-left',pos.left).attr('data-top',pos.top);

});






});



