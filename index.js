const express = require("express");
const server = express();
const project = [];
var cont = 0;

server.use(express.json());

server.use((req, res, next) => {
  console.log(`Foram feita cerca de ${cont} requisições`);
  cont++;
  return next();
});

function verificaId(req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({ error: "Id not found" });
  }
  res.id = req.params.id;
  return next();
}

server.post("/projects", (req, res) => {
  const { title } = req.body;

  project.push(req.body.id, title, []);
  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(project);
});

server.put("/projects/:id", verificaId, (req, res) => {
  const { title } = req.body;
  const contador = project.length;
  for (i = 0; i < contador; i++) {
    if (res.id == project[i]) {
      project[i + 1] = title; // Quando selecionar o código, sabemos que o próximo sera o titúlo, então adicionaremos +1;
      return res.json(project);
    }
  }
});

server.delete("/projects/:id", verificaId, (req, res) => {
  const contador = project.length;
  for (i = 0; i < contador; i++) {
    if (res.id == project[i]) {
      project.splice(i, 3);
      return res.json(project);
    }
  }
});

server.post("/projects/:id/tasks", (req, res) => {
  const { tasks } = req.body;
  const contador = project.length;
  for (i = 0; i < contador; i++) {
    if (res.id == project[i]) {
      project[i + 2].push(tasks);
      return res.json(project);
    }
  }
});

server.listen(3000);
