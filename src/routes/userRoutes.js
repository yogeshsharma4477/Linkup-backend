const express = require('express')
const router = express.Router();
const { dynamicUpdateQuery } = require('../utils/common')
const client = require('../config/db')


router.get('/', async (req, res) => {
    try {
        let query = `SELECT * FROM my_schema.users;`
        let response = await client.query(query)
        return res.status(201).json({ status: "success", result: response.rows })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
})

router.post('/', async (req, res) => {
    const { username, password, email, firstname, lastname, phone, profile } = req.body;
    if (!username || !password) {
        return res.status(400).json({ status: "failed", message: "Username or password is missing" })
    }
    try {
        let query = `INSERT INTO  my_schema.users (username, password, email, firstname, lastname, phone_number, profile)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`
        let response = await client.query(query, [username, password, email, firstname, lastname, phone, profile])
        return res.status(201).json({ status: "success", message: "user created success", result: response })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    const userId = req.params.id
    let map = {
        "username":"username", 
        "password" :"password", 
        "email":"email", 
        "firstname":"firstname", 
        "lastname":"lastname", 
        "phone": "phone_number", 
        "profile" :"profile"
    }
    let updateColumns = dynamicUpdateQuery(req.body, map)

    try {
        let query = `UPDATE my_schema.users SET ${updateColumns} where id=${userId}`
        console.log(query);
        let response = await client.query(query)
        return res.status(201).json({ status: "success", message: "user delete successfully", result: response })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    try {
        let query = `DELETE FROM my_schema.users where id=${userId}`
        let response = await client.query(query)
        return res.status(201).json({ status: "success", message: "user delete successfully", result: response })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
})



module.exports = router;