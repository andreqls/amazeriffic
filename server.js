var express=require("express"),
	http=require("http"),
    mongoose=require("mongoose"),
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
app.use(express.urlencoded());

/*-----MongoDB setup-----*/

mongoose.connect('mongodb://localhost/amazeriffic');

var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

/*-----*/ 

http.createServer(app).listen(3000);

app.get("/todos.json",function(req,res){
    ToDo.find({}, function (err, toDos) {
        if (err!=null) console.log("ERROR: "+err);
        else res.json(toDos);
    });
});

app.post("/todos", function(req,res){
    console.log(req.body);
    
    var newToDo = new ToDo({
        "description":req.body.description,
        "tags":req.body.tags
    });
    
    newToDo.save(function (err, result) {
        if (err!=null) {
            console.log(err);
            res.send("ERROR: "+err);
        }
        else {
            ToDo.find({}, function (err, result) {
                if (err!=null) res.send("ERROR: "+err);
                else res.json(result);
            });
        }
    });
});

/*
app.post("/todos", function (req,res) {
    var newToDo = req.body;
    console.log(newToDo);
    toDos.push(newToDo);
    res.json({"message":"You posted to the server!"});
});*/

