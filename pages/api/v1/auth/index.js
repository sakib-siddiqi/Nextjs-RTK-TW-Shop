export default function index(req, res) {
  return res.status(200).json({
    POST: "singin |  singup | forget-password",
  });
}
