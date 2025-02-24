const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    fs.readdir("./Files/",(err,notes)=>{
    res.render("index",{notes});
    })
});

app.get("/create",(req,res)=>{
    res.render("addFile")
})

app.post("/create",(req,res)=>{   
    const {filename, content} = req.body;
    const filePath = "./files/"+filename;
  fs.writeFile(filePath,content, (err)=>{
    if(err)
        res.send("error in creating file"+err);
    else
     res.redirect("/");
   });
});

app.get("/read/:filename",(req,res)=>{
    const filename = req.params.filename;
    const filePath = "./Files/"+filename;
    fs.readFile(filePath, "utf-8", (err,content)=>{
        if(err)
            res.send("error in reading"+err);
        else 
        res.render("readFile",{content,filename});
    })
});

app.get("/edit/:filename",(req,res)=>{
    const filename = req.params.filename;
    const filePath = "./Files/"+filename;
    fs.readFile(filePath,(err,content)=>{
        res.render("editFile",{filename,content});
    })
})

app.post("/edit/:filename",(req,res)=>{
    const {content} = req.body;
    const filename = req.params.filename;
    const filePath = "./files/"+filename;
  fs.writeFile(filePath,content, (err)=>{
    if(err)
        res.send("error in updating file"+err);
    else
     res.redirect("/");
});
})


app.get("/delete/:filename",(req,res)=>{
    const filePath = "./Files/"+req.params.filename;
    fs.unlink(filePath,(err)=>{
        if(err)
            res.send("error in deleting file");
        else 
         res.redirect("/")
    });
})

app.listen(3000,(err)=>{
    console.log("server listening on  http://localhost:3000");
    
});
