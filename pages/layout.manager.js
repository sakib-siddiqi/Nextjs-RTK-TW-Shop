import DashboardLayout from "./dashboard.layout";
import Layout from "./layout";

export const LAYOUT_TYPES = {
  DEFAULT: "DEFAULT",
  DASHBOARD: "DASHBOARD",
};

export default function withLayout(type) {
  switch (type) {
    case LAYOUT_TYPES.DEFAULT:
      return (page) => <Layout>{page}</Layout>;
    case LAYOUT_TYPES.DASHBOARD:
      return (page) => <DashboardLayout>{page}</DashboardLayout>;
    default:
      return (page) => <Layout>{page}</Layout>;
  }
};
