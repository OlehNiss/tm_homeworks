const express = require('express');
const app = express();

const port = 3000;

const authorsRouter = require('./routes/authors')
app.use('/authors',express.json(), authorsRouter)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('App works!')
}) 


function errorHandler(err, req, res, next){
    if(err.status){
        res.status(err.status).json({err: err.message})
        return
    }
    res.sendStatus(500);
}
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on ${port}...`);
})