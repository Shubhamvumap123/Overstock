const app = require("./index");
const connect = require("./configs/db");
const port = process.env.PORT || 5511

app.listen(port, async function () {
  try {
    await connect();
    console.log("listening on port 5511");
  } catch (err) {
    console.error(err.message);
  }
});
