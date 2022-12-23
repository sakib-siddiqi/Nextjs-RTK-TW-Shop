import { INFO } from "..";

export default function info(req, res) {
    res.status(200).json(INFO);
  }
  