const {createTaskHandler,deleteTaskHandler,updateTaskHandler,getTasksHandler} = require('../controllers/principal')
function Getroutes(req, res) {
    const { url, method } = req;
    switch (method) {
        case "GET":
            if (url === "/") {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ message: "Estas en la pagina pricipal" }));
                res.end();
            }
            if (url === "/tareas") {
                getTasksHandler(req, res);
            }
            break;
        case "POST":
            if (url === "/tareas") {
                createTaskHandler(req, res);
            }
            break;
        case "PUT":
            updateTaskHandler(req, res);
            break;
        case "DELETE":
            deleteTaskHandler(req, res);
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 Not Found");
            res.end();
    }
}
module.exports = { Getroutes }