import { Router } from "express";
//consts
import { heros } from "./resource/Heros";

const router = Router();

// Gets All Heros
/*
fetch("http://localhost:5000/api/heros")
.then(res => res.send())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
*/
router.get("/", (req, res) => res.send(heros));

// Get Single hero
/*
fetch("http://localhost:5000/api/heros/{id}")
.then(res => res.send())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
*/
router.get("/:id", (req, res) => {
  const found = heros.some((hero) => hero.id === parseInt(req.params.id));

  if (found) {
    res.send(heros.filter((hero) => hero.id === parseInt(req.params.id))[0]);
  } else {
    res.status(400).send({ msg: `No hero with the id of ${req.params.id}` });
  }
});

// Get a searched arry of heros
/*
fetch("http://localhost:5000/api/heros/?name=${term}")
.then(res => res.send())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
*/
router.get("/search/:name", (req, res) => {
  const found = heros.filter((hero) =>
    hero.name.toLocaleLowerCase().includes(req.params.name.toLocaleLowerCase())
  );
  //return [] if the name wasent found or arry with the right matches
  res.send(found);
});

// Create hero
/*
let data = { name: "number 5", power:"time travel"};

fetch("http://localhost:5000/api/heros", {
  method: 'POST', 
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.send())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
*/
router.post("/", (req, res) => {
  const hero_id = heros.length === 0 ? 1 : heros[heros.length - 1].id + 1;

  const newHero = {
    id: hero_id,
    name: req.body.name,
    power: req.body.power,
    status: "active",
  };

  if (!newHero.name || !newHero.power) {
    return res.send(400).json({ msg: "Please include a name and power" });
  }

  heros.push(newHero);
  res.send(newHero);
  // res.redirect('/');
});

// Update hero
/*
let data = { name: "Goko", power:"overpowerd"};

fetch("http://localhost:5000/api/heros/9", {
  method: 'PUT', 
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.send())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
*/
router.put("/:id", (req, res) => {
  const found = heros.some((hero) => hero.id === parseInt(req.params.id));

  if (found) {
    const updHero = req.body;
    heros.forEach((hero) => {
      if (hero.id === parseInt(req.params.id)) {
        hero.name = updHero.name ? updHero.name : hero.name;
        hero.power = updHero.power ? updHero.power : hero.power;

        res.send({ msg: "Hero updated", hero });
      }
    });
  } else {
    res.status(400).json({ msg: `No hero with the id of ${req.params.id}` });
  }
});

//Delete hero
/*
fetch("http://localhost:5000/api/heros/{id}", {
  method: 'DELETE', // or 'PUT'
}).then(res => res.send())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
*/
router.delete("/:id", (req, res) => {
  const found = heros.some((hero) => hero.id === parseInt(req.params.id)); //req.body

  if (found) {
    const herosUpdated = heros.filter(
      (hero) => hero.id !== parseInt(req.params.id)
    );
    res.send({
      msg: "hero deleted",
      heros: herosUpdated,
    });
  } else {
    res.status(400).json({ msg: `No hero with the id of ${req.params.id}` });
  }
});

export default router;
