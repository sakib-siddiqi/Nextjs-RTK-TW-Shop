import React from "react";
import Form from "../../../src/components/Dashboard/products/Form";
import withLayout, { LAYOUT_TYPES } from "../../layout.manager";


export default function add({ products }) {
  return (
    <>
      <section className="flex justify-center py-14">
        <Form />
      </section>
    </>
  );
}

add.getLayout = withLayout(LAYOUT_TYPES.DASHBOARD);
