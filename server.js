const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((request,response,next)=>{
  var now = new Date().toString();
  var log = `${request.method} ${request.path} ${now}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    console.log("Unable to append to server log");
  });
  console.log(log);
  //if we don't call the next() funtion then no further code will be executed
  next();
});
// app.use((request,response,next)=>{
//   response.render('maintinance');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYer',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(request,response)=>{
  //response.send('<h1>Hello Express</h1>');
  response.render('home.hbs',{
    pageTitle:"Home Page",
    currentYear: new Date().getFullYear(),
    message:"Welcome to the Node Js and Express Site"
  });
});

app.get('/about',(request,response)=>{
  response.render("about.hbs",{
    pageTitle:"About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(request,response)=>{
  response.send({
    errorMessage:"Unable to server the request"
  });
});



app.listen(port,()=>{
  console.log(`serve is up and running on port ${port}`);
});
