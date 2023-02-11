import { REQ_METHOD } from "../../../../const";

export default function offers(req,res) {
    const METHOD=req.method;
    switch(METHOD){
        case REQ_METHOD.GET:{
            
        }
        default:
            throw new Error(METHOD+" method is invalid.")
    }
}