$(document).ready(function(){
	$.ajax({
		url: '/api/get-all-users',
		method: 'GET',
		beforeSend: function(){
			$('#users-list').append("<div id='loader'><img src='/images/ajax-loader.gif'></div>");
		}
	}).then(function(data, status, xhr){
		console.log(data);
		$('#loader').remove();
		$.each(data, function(index, value){

			//Get stack of data
			var userName = "<h3><a href='/users/single-user/" + this._id + "''>" + this.name + "</a><a href='/api/del/" + this._id + "'><img id='cross' class='cross' src='/images/del.png'></a></h3>", //me edition
				userDescription = "<div class='col-md-9'>" + this.about + "</div>",
				userImage = "<div class='col-md-3'><img src='" + this.picture + "' width='85'></div>";


			//Create element with all data above
			var userElem = $('<div></div>', {
				id: this._id,
				class: "user-item col-xs-12 col-sm-12 col-md-6 col-lg-4",
				html: userName + userImage + userDescription
			});

			// Add the element into existing container
			$('#users-list').append(userElem);

			$('#' + this._id).mouseover(showCross);
            $('#' + this._id).mouseout(hideCross);

		});
	});
})

function showCross() {
    $(this).find('#cross').css('opacity', 1);
};

function hideCross() {
    $(this).find('#cross').css('opacity', 0);
};
