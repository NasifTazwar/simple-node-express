const express = require('express');

const cors = require('cors');
//import cors

const app = express();

// cors ke app er moddhe call kore dilam,,ekhane use middleware
app.use(cors());
const port = 5000;

// 8 POST data to server and display them on the UI
app.use(express.json());
// eta stringify kora data ke json e convert kore rakhbe

app.get('/' ,(req , res)=>{
    res.send('Hello from node server');
});

// array of objects to send
const users = [
    {id:0, name: 'Joshim', email:'joshim@gmail.com', phone :'0156484453'},
    {id:1, name: 'Alomgir', email:'Alomgir@gmail.com', phone :'0156484453'},
    {id:2, name: 'Riaz', email:'Riaz@gmail.com', phone :'0156484453'},
    {id:3, name: 'Shakib', email:'Shakib@gmail.com', phone :'0156484453'},
    {id:4, name: 'Manna', email:'Manna@gmail.com', phone :'0156484453'},
    {id:5, name: 'Salman', email:'Salman@gmail.com', phone :'0156484453'},
]

/* // api start
app.get('/users' , (req , res)=>{
    // res.send('users');
    // // object pathano
    // res.send({
    //     id:1,
    //     name: 'Joshim',
    //     email:'joshim@gmail.com'
    // });
    res.send(users);
}); */

// SEARCH QUERY VVI
app.get('/users' , (req , res)=>{
    // console.log(req.query); //cmd te eta object hishabe pabo
    // console.log(req.query.search); //cmd te etar value pabo
    const search = req.query.search;

    // jodi search thake tahole kisu ekta jinish filter kore pathabo
    if(search){
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult);

        // browser address bar e 'http://localhost:5000/users?search=alom evabe likhbo jekhane alom er jaygay onno kisu dilew search ashbe
    }
    else{
        res.send(users);
    }
})

// jodi ekta particular user er dorkar and dynamic api by params
app.get('/users/:id',(req , res)=>{
    // // ekhon jehetu specific ekta id chchhi tai evabe korbo,,eta console log hobe cmd te,not browser,shathe response pathate hobe
    // console.log(req.params.id);

    const id = req.params.id;
    const user = users[id];

    res.send(user);
})

app.get('/fruits' , (req , res)=>{
    res.send(['mango','oranges','banana']);
})
// special route
app.get('/fruits/mango/fazli' , (req , res)=>{
    res.send('Mangggoooo');
})

app.listen(port , ()=>{
    console.log('Listening to port', port);
});

//post er maddhome dibe oi api,ar get holo amar theke nise
app.post('/users', (req , res)=>{
    // 8 POST data to server and display them on the UI
    const newUser = req.body; //user nilam pore tar id dilam
    newUser.id = users.length;
    users.push(newUser);


    console.log('hitting the post' , req.body);
    // req.body te data undefined ashbe, dekhte hole body parse from express js middleware use korbo
    // res.send('inside post');
    // 8 POST data to server and display them on the UI
    // res.send(JSON.stringify(newUser)) //er shortcut version
    res.json(newUser);
})
// ASHE REQUEST ,PATHABA RESPONSE




/* 
    6 Use fetch to load data from server, middleware, handle cors::

    ekhane jokhon fetch korbo to localhost 3000'e from localhost 5000 theke users,,ekta cors error ashbe..etake handle korbo expree js er middleware documentation theke cors use kore..tahole amra cors error handle korte parbo
*/