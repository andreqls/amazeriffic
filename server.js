var express=require("express"),
	http=require("http"),
	app=express(),
	toDos=[
		{
			"description":"Get groceries",
			"tags":["chores","shopping"]
		},
		{
			"description":"Finish book",
			"tags":["chores","research"]
		}
	];

app.use(express.static(__dirname+"/client"));

http.createServer(app).listen(3000);

app.get("/todos.json",function(req,res){
	res.json(toDos);
});

