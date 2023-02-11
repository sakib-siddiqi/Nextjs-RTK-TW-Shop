import React from "react";
import withLayout, { LAYOUT_TYPES } from "../layout.manager";

export default function index() {
  return (
    <div>
      <h1>DASHBOARD</h1>
    </div>
  );
}

index.getLayout = withLayout(LAYOUT_TYPES.DASHBOARD);
