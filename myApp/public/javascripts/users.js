$(document).ready(function() {
	$('#add-user-form').on('submit', function(e) {
		e.preventDefault();
		var formData = $(this).serialize();
		$.ajax({
			url: "/api/add-user",
			method: "POST",
			data: formData,
			beforeSend: function() {}
		}).then(function(data, status, xhr) {
			console.log(status);
			console.log(data);
			var msg = $('<div></div>', {
				class: "alert alert-success",
				html: '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
				'<strong>Success!</strong> User added to the list.'
			});
			$('#add-user-form')[0].reset();
			$('#user-add').prepend(msg);
		});
	});
});
