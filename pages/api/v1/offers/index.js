import { REQ_METHOD } from "../../../../const";

export default function offers(req, res) {
    const METHOD = req.method;
    switch (METHOD) {
        case REQ_METHOD.GET: {
            const result = [];
            return res.status(200).json(result);
        }
        default:
            throw new Error(METHOD + " method is invalid.")
    }
}