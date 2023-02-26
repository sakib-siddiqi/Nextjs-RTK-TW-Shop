import Form from "../../../src/components/Dashboard/products/Form";
import API from "../../../src/services/API";
import withLayout, { LAYOUT_TYPES } from "../../layout.manager";

export async function getServerSideProps(context) {
  const id = context?.params?.id;
  if (!id) {
    throw new Error(`ID is invalid ${id}`);
  }
  try {
    const data = await API.products.get(id);
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

function edit({ data }) {
  return (
    <section>
      <div className="container py-10">
        <Form title="EDIT PRODUCT" prevData={data} />
      </div>
    </section>
  );
}

edit.getLayout=withLayout(LAYOUT_TYPES.DASHBOARD);
export default edit;