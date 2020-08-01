var main = function () {
    "use strict";

    var toDos = [];

    var oldToDos = [
        "Finish writing book",
        "Take Gracie to the park",
        "Answer emails",
        "Walk dog",
        "Get groceries",
        "Read on CSS"
    ];


    $(".tabs div").toArray().forEach(function (element) {
        $(element).on("click", function () {

            var $element=$(element),
                $content,
                ntodo;

            $(".tabs div").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.prepend($("<li>").text(todo));
                });
                $content.hide();
                $("main .content").append($content);
                $content.fadeIn();
            }

            else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $content.hide();
                $("main .content").append($content);
                $content.fadeIn();
            }

            else if ($element.parent().is(":nth-child(3)")) {
                var ntodo;
                $content=$("<div>");
                $content.append($("<input>").attr({"type":"text"}));
                $content.append($("<button>").text("+"));

                $content.hide();
                $("main .content").append($content);
                $content.fadeIn();

                $("main .content input").on("keypress", function (event) {
                    if (event.keyCode==13) {
                        ntodo=$("main .content input").val();
                        if (ntodo) {
                            toDos.push(ntodo);
                            showAlert(ntodo);
                            $("main .content input").val("");
                        }
                    }
                });
                
                $("main .content button").on("click", function () {
                    ntodo=$("main .content input").val();
                    if (ntodo) { // only do something if ntodo is defined
                        toDos.push(ntodo);
                        showAlert(ntodo);
                        $("main .content input").val("");
                    }
                });
            }

            return false; // so that the browser doesn't try to follow the link
        });
    });

    $(".tabs a:nth-child(3) div").trigger("click");

};

var showAlert = function (item) {
    var $alertline = $("<div>");
    var $alertbox = $("<span>").attr("style","margin-bottom: 5px; border-radius: 5px 5px 5px 5px; padding: 5px; color: white; background: green; opacity: 0.6; float: left;");
    $alertbox.text("\""+item+"\" was added to the list!");
    $alertline.append($alertbox);
    $alertline.append($("<div>").attr("style","clear: both"));
    $alertbox.hide();
    $("main .content").prepend($alertline);
    $alertbox.fadeIn();
    sleep(1000).then(() => $alertbox.fadeOut());
};

var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
};


$(document).ready(main);
