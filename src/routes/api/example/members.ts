import { Router } from "express";
//third party
import uuid from "uuid";
//consts
import { members } from "./resource/Members";

const router = Router();

// Gets All Members
router.get("/", (req, res) => res.send(members));

// Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === req.params.id);

  if (found) {
    res.send(members.filter((member) => member.id === req.params.id));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name as string,
    email: req.body.email as string,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.send(members);
  // res.redirect('/');
});

// Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === req.params.id);

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === req.params.id) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.send({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === req.params.id);

  if (found) {
    res.send({
      msg: "Member deleted",
      members: members.filter((member) => member.id !== req.params.id),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

export default router;
