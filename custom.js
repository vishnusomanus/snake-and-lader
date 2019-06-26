
var user = {"player1":0,"player2":0,"player3":0,"player4":0,};

var user_data = {};

var snl = {
5: [{left:240,top:540},{left:120,top:240}],
14: [{left:360,top:480},{left:480,top:300}],
38: [{left:120,top:360},{left:60,top:360},{left:60,top:420},{left:120,top:240},{left:0,top:480}],
51: [{left:540,top:240},{left:540,top:540}],
53: [{left:420,top:240},{left:480,top:120}],
64: [{left:180,top:180},{left:120,top:60}],
76: [{left:240,top:120},{left:360,top:240}],
91: [{left:540,top:0},{left:420,top:120}],
97: [{left:180,top:0},{left:0,top:180}],

}

function setPosCss(num,player){
	var top = $('td.col_no_'+num).attr('data-top');
	var left = $('td.col_no_'+num).attr('data-left');
	$('span.user.user'+player).css({
		'left':left+'px',
		'top':top+'px'
	});	
}


function move(num,player,move_pos = []){
	if(user['player' + player] > 0 )
	if(num == 1){
		user['player' + player] = num;
		setPosCss(num,player);
	}
	else{
		var from = user['player' + player];
		if(move_pos.length == 0){
			user['player' + player] = num;
			for (var i = from; i <= num; i++) {
				var top = $('td.col_no_'+i).attr('data-top');
				var left = $('td.col_no_'+i).attr('data-left');
				move_pos.push({top:top,left:left})
			}	
		}

		if($('td.col_no_'+num).attr('data-goto')){
			move_pos = snl[num];
			user['player' + player] = $('td.col_no_'+num).attr('data-goto');
		}

		var i = 0;
		var interval = setInterval(function(){
			var obj = move_pos[i];
			$('span.user.user'+player).css({
					'left':obj.left+'px',
					'top':obj.top+'px'
			});	
			i++;
			if(i >= move_pos.length) clearInterval(interval);


		},500);

	}

}



jQuery(document).ready(function($) {
	

	$(function(){
	var dice = $("#dice");
	dice.click(function(){
		$(".wrap").append("<div id='dice_mask'></div>");
		dice.attr("class","dice");
		dice.css('cursor','default');
		var num = Math.floor(Math.random()*6+1);
		//num = 5;
		dice.animate({left: '+2px'}, 100,function(){
			dice.addClass("dice_t");
		}).delay(200).animate({top:'-2px'},100,function(){
			dice.removeClass("dice_t").addClass("dice_s");
		}).delay(200).animate({opacity: 'show'},600,function(){
			dice.removeClass("dice_s").addClass("dice_e");
		}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
			dice.removeClass("dice_e").addClass("dice_"+num);
			$("#result").html("Your throwing points are<span>"+num+"</span>");
			var turn = $('.wrap').data('turn');
			
			var prev_pos = parseInt(user['player' + turn]);
			if(user['player' + turn] == 0 && num == 1){
				user['player' + turn] = 1;
				$('.user' + turn).removeClass('hide');
			} 
			changed_num = prev_pos+parseInt(num);
			move(changed_num,turn);
			dice.css('cursor','pointer');
			$("#dice_mask").remove();
			if(num != 6){
				
				if(turn != 4){
					var trun_change = parseInt(turn)+1;
					$('.wrap').data('turn',trun_change);
					$('.wrap').removeClass('user1').removeClass('user2').removeClass('user3').removeClass('user4').addClass('user'+trun_change);
				}else{
					$('.wrap').data('turn',1);
					$('.wrap').removeClass('user1').removeClass('user2').removeClass('user3').removeClass('user4').addClass('user1');
				}
				

			}
		});
	});
});

$('td.col').each(function(i,obj){
	var pos = $(this).position(); 
	$(this).attr('data-left',pos.left).attr('data-top',pos.top);

});






});



