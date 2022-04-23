const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'node',
    database: 'nodedb'
}


app.get('/', (req, res) => {
    res.send('<h1>Full cycle</h1>')
})

app.get('/insert', async (req, res) => {
    if (!req.query.user) {
        res.json({ message: 'User: not founded' })
    }

    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values ('${req.query.user}')`
    
    connection.query(sql, (error, result, fields) => {
        if (error) {
            res.json({ message: error })
        } else {
            res.json({ message: `User: ${req.query.user} registred successful!` })
        }

        connection.end()
    })
})

app.listen(port, () => {
    console.log('App is running on port ', port)
})
