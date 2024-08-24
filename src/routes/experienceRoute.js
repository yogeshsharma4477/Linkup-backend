const express = require('express')
const router = express.Router();
const client = require('../config/db');
const { dynamicUpdateQuery } = require('../utils/common');
const { UserEducationValidator } = require('../validators/userValidator');

router.get('/', async (req, res) => {
    try {
        let query = `SELECT * FROM my_schema.users_experience;`
        let response = await client.query(query)
        return res.status(201).json({ status: "success", result: response.rows })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
})

router.post('/:id', async (req, res) => {
    const { job_title, company_name, start_date, end_date, skills, isPresent = false } = req.body
    const userId = req.params.id
    let isValid = UserEducationValidator(req.body)
    if (isValid.isError) {
        return res.status(400).json({ status: "failed", message: isValid })
    }
    try {
        let query = `INSERT INTO  my_schema.users_experience (institution_name, degree, field, start_date, end_date, user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`
        let response = await client.query(query, [institution_name, degree, field, start_date, end_date, userId])
        return res.status(201).json({ status: "success", message: "user experience created success", result: response })
    } catch (error) { 
        return res.status(500).json({ status: "failed", message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    const userId = req.params.id
    let map = {
        "institution_name":"institution_name", 
        "degree" :"degree", 
        "field":"field", 
        "start_date":"start_date", 
        "end_date":"end_date",
    }
    let updateColumns = dynamicUpdateQuery(req.body, map)

    try {
        let query = `UPDATE my_schema.users_experience SET ${updateColumns} where id='${userId}'`
        console.log(query);
        let response = await client.query(query)
        return res.status(201).json({ status: "success", message: "user experience delete successfully", result: response })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    try {
        let query = `DELETE FROM my_schema.users_experience where id='${userId}'`
        let response = await client.query(query)
        return res.status(201).json({ status: "success", message: "user experience delete successfully", result: response })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
})

module.exports = router;