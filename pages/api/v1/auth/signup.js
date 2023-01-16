import User from "../../../../model/user.model";

export default async function signup(req, res) {
//   try {
    if (!req.body) throw new Error(`Body, '${req.body}' is invalid.`);
    const new_user = await User.create(req.body);
    return res.status(200).json(new_user);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Internal Error.",
//       code: error.code || 500,
//     });
//   }
}
