const app = require("./index");
const connect = require("./configs/db");
const port = process.env.PORT || 5000

app.listen(port, async function () {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.error(err.message);
  }
});
