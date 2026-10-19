const { rateJoke } = require("./rateJoke");
const core = require("@actions/core");

// Returned when the model call fails (GitHub Models was retired on 2026-07-30)
const UNAVAILABLE = { is_joke: false, score: null, humor_type: null, feedback: null };

async function run() {
  // Get inputs
  const joke = core.getInput("joke", { required: true });
  const token = core.getInput("token", { required: true });

  // Rate the joke using GitHub Models
  let rating;
  try {
    rating = await rateJoke(joke, token);
  } catch (error) {
    core.warning(`Joke rating unavailable: ${error.message}`);
  }

  // Set the output (objects are serialized to JSON)
  core.setOutput("result", rating ?? UNAVAILABLE);
}

module.exports = { run };
