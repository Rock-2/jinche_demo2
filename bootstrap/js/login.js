$(document).ready(function(){
	$('#user_login_form').bootstrapValidator({
		message: '',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			username: {
				message: '',
				validators: {
					notEmpty: {
						message: '用户名不能为空！'
					},
				}
			},
			password:{
				message: '',
				validators: {
					notEmpty: {
						message: '密码不能为空！'
					},
				}
			},
		}
		
	});
	$("#user_login_btn").bind('click',function(){
		$('#user_login_form').bootstrapValidator('validate');
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();
		var remember = $("input[name='remember']").val();
		var autologin = $("input[name='autologin']:checked").val();
		var result  = $('#user_login_form').data('bootstrapValidator').isValid();
		
		if(result){
			var getTimestamp = new Date().getTime();
			$.ajax({
				type:"post",
				data:{username:username,password:password,remember:remember,autologin:autologin},
				url:'/login/index/checkLogin?_='+getTimestamp,
				dataType:'json',
				success:function(data){
					if(data.error != 0){
						$("#show_error_msg").removeClass("hide");
						$("#show_error_msg").html("<i class=\"icon fa fa-warning\"></i>提示："+data.content);
					}else{
						$("#show_error_msg").addClass("hide");
						$("#show_error_msg").html();
						location.reload();
					}
				}
			});
		}		
	});
	document.onkeydown=function(event){
		evt = (event) ? event : ((window.event) ? window.event : ""); //兼容IE和Firefox获得keyBoardEvent对象  
        var lKeyCode = evt.keyCode?evt.keyCode:evt.which;
		if (lKeyCode == 13){
			$("#user_login_btn").click();
        }
		if(evt == event) {  
			event.stopPropagation(); 
		}else if (evt == window.event) { 
			window.event.cancelBubble = true; 
		}
    }

});
