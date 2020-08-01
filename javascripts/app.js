var main = function () {
    "use strict";

    $(".tabs div").toArray().forEach(function (element) {
        $(element).on("click", function () {
            $(".tabs div").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();
            return false; // so that the browser doesn't try to follow the link
        });
    });

};

$(document).ready(main);
