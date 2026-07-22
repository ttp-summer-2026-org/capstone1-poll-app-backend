const express = require("express");
const router = express.Router();

const { Poll, Option, Vote } = require("../models");

// GET /polls
// Get all polls
router.get("/", async (req, res) => {
  try {
    const allPolls = await Poll.findAll({
      include: [
        {
          model: Option,
        },
      ],
    });

    res.status(200).json(allPolls);
  } catch (error) {
    console.error("Get polls error:", error);

    res.status(500).json({
      msg: "Failed to load polls",
    });
  }
});

// POST /polls
// Create a poll with options
router.post("/", async (req, res) => {
  try {
    const { title, description, options } = req.body;

    if (!title) {
      return res.status(400).json({
        msg: "Title is required",
      });
    }

    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        msg: "A poll must have at least two options",
      });
    }

    const newPoll = await Poll.create({
      title,
      description,
    });

    const newOptions = options.map((optionText) => {
      return {
        text: optionText,
        pollId: newPoll.id,
      };
    });

    await Option.bulkCreate(newOptions);

    const createdPoll = await Poll.findByPk(newPoll.id, {
      include: [
        {
          model: Option,
        },
      ],
    });

    res.status(201).json(createdPoll);
  } catch (error) {
    console.error("Create poll error:", error);

    res.status(500).json({
      msg: "Failed to create poll",
    });
  }
});

// GET /polls/:id
// Get one poll with options and votes
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const singlePoll = await Poll.findByPk(id, {
      include: [
        {
          model: Option,
          include: [
            {
              model: Vote,
            },
          ],
        },
      ],
    });

    if (!singlePoll) {
      return res.status(404).json({
        msg: "Poll not found",
      });
    }

    res.status(200).json(singlePoll);
  } catch (error) {
    console.error("Get one poll error:", error);

    res.status(500).json({
      msg: "Failed to get poll",
    });
  }
});

// POST /polls/:id/vote
// Submit a vote
router.post("/:id/vote", async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;

    if (!optionId) {
      return res.status(400).json({
        msg: "Select an option to vote",
      });
    }

    const poll = await Poll.findByPk(id);

    if (!poll) {
      return res.status(404).json({
        msg: "Poll not found",
      });
    }

    const selectedOption = await Option.findOne({
      where: {
        id: optionId,
        pollId: id,
      },
    });

    if (!selectedOption) {
      return res.status(400).json({
        msg: "This option does not belong to this poll",
      });
    }

    const newVote = await Vote.create({
      optionId,
    });

    res.status(201).json({
      msg: "Vote cast successfully",
      vote: newVote,
    });
  } catch (error) {
    console.error("Vote error:", error);

    res.status(500).json({
      msg: "Vote casting failed",
    });
  }
});

module.exports = router;