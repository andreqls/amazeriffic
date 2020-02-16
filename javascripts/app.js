var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

	$(".tabs span").toArray().forEach(function (element) {
		$(element).on("click", function() {
			
			var $element = $(element); // variable to store JQuery element (wouldn't need it for a DOM element)
			var $content;

			$(".tabs span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>"); // create unordered list element
				toDos.forEach(function (todo) {
					$content.prepend($("<li>").text(todo));
				});
				$("main .content").append($content);
			}
			else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>"); // create unordered list element
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			}
			else if ($element.parent().is(":nth-child(3)")) {
				var organizedByTag = [
					{
						"name": "shopping",
						"toDos": ["Get groceries"]
					},
					{
						"name": "chores",
						"toDos": ["Get groceries", "Take Gracie to the park"]
					},
					{
						"name": "writing",
						"toDos": ["Make up some new ToDos", "Finish writing this book"]
					},
					{
						"name": "work",
						"toDos": ["Make up some new ToDos", "Prep for Monday's class",
							"Answer emails", "Finish writing this book"]
					},
					{
						"name": "teaching",
						"toDos": ["Prep for Monday's class"]
					},
					{
						"name": "pets",
						"toDos": ["Take Gracie to the park"]
					}
				];

				organizedByTag.forEach(function (tag) {
					var $tagName=$("<h3>").text(tag.name);
					var $content=$("<ul>");

					tag.toDos.forEach(function (description) {
						var $task=$("<li>").text(description);
						$content.append($task);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			}
			else if ($element.parent().is(":nth-child(4)")) {
				$("main .content").append("<input id=\"newtodo\"><button id=\"addtodo\"><b>+</b></button>");

				$("#addtodo").on("click", function () {
					addNewToDo($("#newtodo").val());
					$("#newtodo").val("");
				});

				$("#newtodo").on("keypress", function (event) {
//					console.log(event.keyCode);
					if (event.keyCode===13) {
						addNewToDo($("#newtodo").val());
						$("#newtodo").val("");
					}
				});
			}

			return false; // this is necessary for the handler, otherwise the browser will follow the link
		});
	});
	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});
