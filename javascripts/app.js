var main = function () {
	"use strict";

	var tabNumber;
	
	for (tabNumber=1;tabNumber<=3;tabNumber++) {
		var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
		$(tabSelector).on("click", function(event) {
			$(".tabs span").removeClass("active");
			$(event.target).addClass("active");
//			$("main .content").empty();
			return false; // this is necessary for the handler, otherwise the browser will follow the link
		});
	}
}

$(document).ready(main);
