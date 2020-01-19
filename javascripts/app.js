var main = function () {
	"use strict";

	$(".tabs span").toArray().forEach(function (element) {
		$(element).on("click", function() {
			$(".tabs span").removeClass("active");
			$(element).addClass("active");
//			$("main .content").empty();
			return false; // this is necessary for the handler, otherwise the browser will follow the link
		});
	});
}

$(document).ready(main);
