const express = require('express')
const router = express.Router()

const {Poll, Option, Vote} = require("../models")

router.get('/', async (req, res)=>{
    try {
        const allPOlls = await Poll.findAll();
        res.status(200).json(allPOlls)
    } catch(error) {
        res.status(404).json({msg: "Failed to load Data"})
    }
} )

router.get('/', async (req, res)=> {
    try {
        const { title, description, options } = req.body

        const newPoll = await Poll.create({
            title: title,
            description: description
        })

        if (options && options.length > 0) {
            const optionPromises = options.map(optionText => {
                return optionText.create({
                    text: optionText,
                    pollId: newPoll.id
                })
            })
            await Promise.all(optionPromises)
        }
        res.status(200).json({msg: "Poll created"})
    } catch(error) {
        res.status(404).json({msg: "Failed to create poll!"})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const targetId = req.params.id

        const singlePoll = await Poll.findByPk(targetId, {
            include: [{
                model: option,
                include: [vote]
            }]
        })

        if(!singlePoll) {
            return res.status(404).json({msg: "Poll not found"})
        }
        res.json(singlePoll);
    } catch(error){
        res.status(404).json({msg: 'Fetch failed'})
    }
})

router.post('/:id/vote', async (req, res) => {
    try {
       const {optionId} = req.body
       
       if(!optionId) {
        return res.status(404).json({msg: "Select an option to vote"})
       }

       const newVote = await Vote.create({
        optionId: optionId
       })
       res.status(200).json({msg: 'Vote Casted', vote: newVote })

    } catch(error) {
        res.status(404).json({msg: "Vote casting failed!"})
    }
})

module.exports = router;