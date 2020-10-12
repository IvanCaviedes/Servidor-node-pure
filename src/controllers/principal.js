const { bodyParser } = require("../lib/bodyparser");

const database = [];

async function createTaskHandler(req, res) {
  try {
    await bodyParser(req);
    database.push(req.body);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(database));
    res.end();
  } catch (error) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write("Invalid Data");
    res.end();
  }
}

function getTasksHandler(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(database));
  res.end();
}

async function updateTaskHandler(req, res) {
  try {
    let { url } = req;

    let idQuery = url.split("?")[1];
    let idKey = idQuery.split("=")[0];
    let idValue = idQuery.split("=")[1];

    if (idKey === "id") {
      await bodyParser(req);
      database[idValue - 1] = req.body;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(database));
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Invalid Request Query");
      res.end();
    }
  } catch (err) {
    res.writeHead(400, { "Content-type": "text/plain" });
    res.write("Invalid body data was provided", err.message);
    res.end();
  }
}

async function deleteTaskHandler(req, res) {
    try {
        let { url } = req;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];
      
        if (idKey === "id") {
          database.splice(idValue - 1, 1);
          res.writeHead(200, { "Content-type": "text/plain" });
          res.write("Delete Success");
          res.end();
        } else {
          res.writeHead(400, { "Content-type": "text/plain" });
          res.write("Invalid Query");
          res.end();
        }
    } catch (err) {
        res.writeHead(400, { "Content-type": "text/plain" });
        res.write("Invalid body data was provided", err.message);
        res.end();
    }

}

module.exports ={
    createTaskHandler,
    getTasksHandler,
    updateTaskHandler,
    deleteTaskHandler
}