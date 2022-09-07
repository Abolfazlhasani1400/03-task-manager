// Express.js instance
const express = require('express')
const app = express();


// import path module
const path = require('path')

// .env file config => pass the path of .env file as argument to config()
require('dotenv').config({path: path.resolve(__dirname, './.env')})

// import route and connection files
const tasks = require('./routes/tasks.js')
const {connectDB} = require('./DB/connection.js')
const notFound = require('./middlewares/notFound')
const errorHandlerMiddleWare = require('./middlewares/errorHandler')

// morgan tiny //devDependencies
const morgan = require('morgan')
app.use(morgan('tiny'))


// express middlewares
app.use(express.static(path.resolve(__dirname,  './public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//
//Route middleware
//
// app.get('api/v1/tasks')        - get all tasks
// app.post('api/v1/tasks')       - creat a new task
// app.get('api/v1/tasks/:id')    - get a single task
// app.patch('api/v1/tasks/:id')  - update task
// app.delete('api/v1/tasks/:id') - delete task
app.use('/api/v1/tasks', tasks)
// Route not found
app.use(notFound)
app.use(errorHandlerMiddleWare)

// starting server 
// server is waiting for DB connection 
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        // [process.env.MONGO_URI] is the connection string which is stored in .env file as environmental variable
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to ${port}...`))
    } catch (error) {
        console.log(error);
    }
}
start();

