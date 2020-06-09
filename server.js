var express=require("express"),
	http=require("http"),
	cookies=require("cookies"),
	app=express(),
	toDos={};

app.use(express.static(__dirname+"/client"));

http.createServer(app).listen(3000);

app.get("/todos.json", function(req,res) {
	res.JSON(toDos);
});

