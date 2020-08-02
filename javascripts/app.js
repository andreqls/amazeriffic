var main = function (toDoObjects) {
    "use strict";

    var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

/*    var oldToDos = [
        "Finish writing book",
        "Take Gracie to the park",
        "Answer emails",
        "Walk dog",
        "Get groceries",
        "Read on CSS"
    ];
*/

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
				var organizedByTag = tagOrg(toDoObjects);
				console.log(organizedByTag);

				organizedByTag.forEach(function (tag) {
					var $tagName=$("<h3>").text(tag.name),
						$content=$("<ul>");

					tag.todos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			}

            else if ($element.parent().is(":nth-child(4)")) {
                var ntodo;
                $content=$("<div>");

				$content.append($("<p>").text("Description"));
                $content.append($("<input>").attr({"type":"text"}));

				$content.append($("<p>").text("Tags"));
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

var tagOrg = function (toDoObjects) {
	var tagList=[],tagsObject=[];
	toDoObjects.forEach(function (todo) {
		todo.tags.forEach(function (tag) {
			if (tag in tagList) {
				tagsObject[tagList.indexOf(tag)].todos.push(todo.description);
			}
			else {
				tagList.push(tag);
				tagsObject.push({"name":tag,"todos":[todo.description]});
			}
		});
	});
	return tagsObject;
	console.log(tagsObject);
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


$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});
