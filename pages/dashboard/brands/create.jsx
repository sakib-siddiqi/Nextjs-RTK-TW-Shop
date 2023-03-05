import BrandForm from "../../../src/components/Dashboard/brands/Form";
import withLayout, { LAYOUT_TYPES } from "../../layout.manager";

export default function CreateBrand(props) {

    return (
        <>
            <section className="py-2">
                <BrandForm/>
            </section>
        </>
    );
};

CreateBrand.getLayout=withLayout(LAYOUT_TYPES.DASHBOARD);
