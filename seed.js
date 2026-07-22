const db = require("./db");
const { Poll, Option, Vote } = require("./models");

async function seed() {
  try {
    await db.sync({ force: true });

    console.log("Database reset!");

    // Poll 1
    const poll1 = await Poll.create({
      title: "Best Programming Language",
      description: "Vote for your favorite programming language.",
    });

    const js = await Option.create({
      text: "JavaScript",
      pollId: poll1.id,
    });

    const py = await Option.create({
      text: "Python",
      pollId: poll1.id,
    });

    await Option.create({
      text: "C++",
      pollId: poll1.id,
    });

    // Poll 2
    const poll2 = await Poll.create({
      title: "Favorite Sport",
      description: "Choose your favorite sport.",
    });

    const soccer = await Option.create({
      text: "Soccer",
      pollId: poll2.id,
    });

    const basketball = await Option.create({
      text: "Basketball",
      pollId: poll2.id,
    });

    await Option.create({
      text: "Tennis",
      pollId: poll2.id,
    });

    // Poll 3
    const poll3 = await Poll.create({
      title: "Favorite Database",
      description: "Which database do you prefer to use?",
    });

    const postgres = await Option.create({
      text: "PostgreSQL",
      pollId: poll3.id,
    });

    const mysql = await Option.create({
      text: "MySQL",
      pollId: poll3.id,
    });

    await Option.create({
      text: "MongoDB",
      pollId: poll3.id,
    });

    // Poll 4
    const poll4 = await Poll.create({
      title: "Favorite Frontend Framework",
      description: "Choose your favorite frontend framework.",
    });

    const react = await Option.create({
      text: "React",
      pollId: poll4.id,
    });

    const vue = await Option.create({
      text: "Vue",
      pollId: poll4.id,
    });

    await Option.create({
      text: "Angular",
      pollId: poll4.id,
    });

    // Poll 5
    const poll5 = await Poll.create({
      title: "Best Time to Study",
      description: "When are you most productive?",
    });

    const morning = await Option.create({
      text: "Morning",
      pollId: poll5.id,
    });

    await Option.create({
      text: "Afternoon",
      pollId: poll5.id,
    });

    const night = await Option.create({
      text: "Night",
      pollId: poll5.id,
    });

    // Votes for Poll 1
    await Vote.create({ optionId: js.id });
    await Vote.create({ optionId: js.id });
    await Vote.create({ optionId: py.id });

    // Votes for Poll 2
    await Vote.create({ optionId: soccer.id });
    await Vote.create({ optionId: soccer.id });
    await Vote.create({ optionId: basketball.id });

    // Votes for Poll 3
    await Vote.create({ optionId: postgres.id });
    await Vote.create({ optionId: postgres.id });
    await Vote.create({ optionId: mysql.id });

    // Votes for Poll 4
    await Vote.create({ optionId: react.id });
    await Vote.create({ optionId: react.id });
    await Vote.create({ optionId: react.id });
    await Vote.create({ optionId: vue.id });

    // Votes for Poll 5
    await Vote.create({ optionId: morning.id });
    await Vote.create({ optionId: night.id });
    await Vote.create({ optionId: night.id });
    await Vote.create({ optionId: night.id });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
}

seed();