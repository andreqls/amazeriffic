var toDoObjects = [
	{
		"description":"Get groceries",
		"tags":["shopping","chores"]
	},
	{
		"description":"Make up some new ToDos",
		"tags":["writing","work"]
	},
	{
		"description":"Prep for Monday's class",
		"tags":["work","teaching"]
	},
	{
		"description":"Answer emails",
		"tags":["work"]
	},
	{
		"description":"Take Gracie to the park",
		"tags":["chores", "pets"]
	},
	{
		"description":"Finish writing this book",
		"tags":["writing", "work"]
	}
];

/*	TAGS:
 *	[
 *		{
 *			"name": "shopping",
 *			"toDos": ["Get groceries", "Buy cough syrup"]
 *		},
 *
 *		{
 *			"name": "chores",
 *			"toDos": ["Bench-press the truck", "Find needle in haystack"]
 *		}
 *	]
 *
 *	TODOS:
 *	[
 *		{
 *			"description": "Answer emails",
 *			"tags": ["work", ...]
 *		}, ...
 *	]
 * */

var tagIndex = function (tag, tagsList) {
	var i;
	for (i=0;i<tagsList.length;i++) {
		if (tagsList[i].name.localeCompare(tag)==0) {
			console.log("TRUE: tagElement.name="+tagsList[i].name+", tag="+tag);
			return i;
		}
	}
	return -1;
};

var updateTag = function (tagArray, index, newTask) {
	tagArray[index].toDos.push(newTask);
};

var organizeByTags = function (toDosList) {
	var organizedByTags = [];
	toDosList.forEach(function (toDoItem) { // toDoItem = { "description":"...", "tags":[...] }
		toDoItem.tags.forEach(function (tagItem) { // tagItem="..."
			var ind=tagIndex(tagItem, organizedByTags);
			if (ind==-1) {
				organizedByTags.push({
					"name": tagItem,
					"toDos": [toDoItem.description]
				});
			}
			else updateTag(organizedByTags, ind, toDoItem.description);
		});
	});
	return organizedByTags;
};

var testReturn = function (parameter) {
	if (parameter==0) return true;
	return false;
};

var main = function () {
	"use strict";
	var organizedByTags=organizeByTags(toDoObjects);
	console.log(organizedByTags);
	console.log(testReturn(0));
};

$(document).ready(main);
