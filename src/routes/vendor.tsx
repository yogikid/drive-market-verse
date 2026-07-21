import { createFileRoute } from "@tanstack/react-router";
import { OpsLayout, vendorNav } from "@/components/layouts/OpsLayout";

export const Route = createFileRoute("/vendor")({
  component: () => <OpsLayout title="Vendor" nav={vendorNav} />,
});
