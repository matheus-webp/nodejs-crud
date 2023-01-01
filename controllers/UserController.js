import express from "express";
const app = express();

class UserController {
  index(req, res) {
    res.json({ title: "First Commit" });
  }
}

export default new UserController();
