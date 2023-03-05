import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { MdAlternateEmail, MdDelete } from "react-icons/md";

const CONTACT_TYPES=[
    {
        type:"url",
        title:"Link",
        icon:<BiLink className="inline-block" />
    },
    {
        type:"tel",
        title:"Tel",
        icon:<BsTelephoneFill className="inline-block" />
    },
    {
        type:"mailto",
        title:"Mail",
        icon:<MdAlternateEmail className="inline-block" />
    },

]

export default function BrandForm({title="Create Brand"}) {
    const contact_value_ref=useRef(null);
    const [contacts,setContacts]=useState([]);
    const [contact_type,setContactType]=useState(null);
    function onContactTypeSet(e){
        setContactType(CONTACT_TYPES.find((item)=>item.type===e.target.value));
    }
    function onContactSet(){
        if(!contact_type) {
            console.log("`contact_type` is invalid.");
            return;
        }
        const value=contact_value_ref.current.value;
        setContacts(e=>[...e,{type:contact_type?.type,icon:contact_type?.icon,value}]);
        contact_value_ref.current.value="";
    }
    function onContactRemove(indx){
        setContacts(e=>e.filter((_,key)=>key!==indx));
    }

    return (
        <>
        <div className="form-wrapper mx-auto w-full max-w-md rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 p-1">
            {/* TITLE */}
        <div className="mb-1 rounded-md border border-dashed border-white/40 bg-gradient-to-br from-white/50 to-white/5 py-7 px-3 text-center">
            <h3 className="text-2xl font-bold tracking-wider text-white">
             {title}
            </h3>
      </div>

            {/* FORM */}
            <form className="w-full rounded-md bg-white p-3">
                <label htmlFor="name">
                    <p className="label">Name</p>
                    <input type="text" className="input" name="name" id="name" />
                </label>
                <label htmlFor="slogan">
                    <p className="label">Slogan</p>
                    <input type="text" className="input" name="slogan" id="slogan" />
                </label>
                <label htmlFor="description">
                    <p className="label">Description</p>
                    <textarea type="text" className="input" name="description" id="description" />
                </label>
                <figure>
                    <p className="label">Contact</p>
                    <ul className="mb-2">
                        {contacts.map((item,key)=>(
                            <li className="flex gap-1 mb-1"><a href={item.type+":"+item.value} className="flex-grow" type={item.type}>{item.icon} {item.value}</a> <button type="button" className="p-2 bg-slate-100 rounded-md border border-slate-300" onClick={()=>onContactRemove(key)}><MdDelete/></button></li>
                        ))}
                    </ul>
                    <figure className="flex flex-row gap-1">
                        <select className="px-1 py-1" onChange={onContactTypeSet}>
                            <option value="">Type</option>
                            {CONTACT_TYPES.map(item=>(
                                <option value={item.type}>{item?.title}</option>
                            ))}
                        </select>
                        {contact_type 
                            ? (<span className="center">
                                {contact_type?.icon}
                                </span>)
                        :null}
                        <input type="text" ref={contact_value_ref} className="input py-1 flex-grow" placeholder="Value" />
                        <div className="text-right">
                            <button onClick={onContactSet} type="button" className="p-2 bg-slate-800 hover:bg-opacity-80 active:bg-opacity-60 center rounded-md text-white">
                                <AiOutlinePlus />
                            </button>
                        </div>
                    </figure>
                </figure>
            </form>
        </div>
        </>
    )
}