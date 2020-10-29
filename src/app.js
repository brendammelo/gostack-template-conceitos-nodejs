const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

    const repositorie = {id: uuid(), title, url, techs, likes: 0};
    
    repositories.push(repositorie);

    return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
    const {title, url, techs} = request.body;

    const repositorie = repositories.findIndex(repositorie => repositorie.id === id);

    if (repositorie < 0 ){
      return response.status(400).json({error: 'repositorie not found'})
  }
    const {likes} = repositories[repositorie]
    
  

    
    
    const newRepositorie = {
        id,
        title,
        url,
        techs,
        likes
    }
    if (newRepositorie.likes !== likes){
      return response.status(400).json({error: 'cannot change likes'})
    }

    repositories[repositorie] = newRepositorie;

    return response.json(newRepositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

    const repositorie = repositories.findIndex(repositorie => repositorie.id === id);

    if (repositorie < 0){
        return response.status(400).json({error: 'repositorie not found'})
    }

    repositories.splice(repositorie, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
    
    

  const repositorie = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorie < 0){
      return response.status(400).json({error: 'repositorie not found'})
  }

  const newRepo = repositories[repositorie];

  
 let plusLike = newRepo.likes
 plusLike++

 newRepo.likes = plusLike;
  

  return response.status(200).json(newRepo)
});

module.exports = app;
