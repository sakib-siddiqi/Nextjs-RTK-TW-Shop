import Link from "next/link";
import withLayout, { LAYOUT_TYPES } from "../../layout.manager";
import {HiDocumentAdd} from "react-icons/hi"
export default function Brands(props) {
    return (
        <>
            <section>
                <div className="w-full flex flex-wrap justify-between items-center gap-2">
                    <h3>Brands</h3>
                    <Link href="/dashboard/brands/create" className="btn hover:opacity-80 center gap-1">
                       <HiDocumentAdd className="inline-block" /> <span>Create</span>
                    </Link>
                </div>
            </section>
        </>
    )
}

Brands.getLayout=withLayout(LAYOUT_TYPES.DASHBOARD);