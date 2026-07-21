import { createFileRoute } from "@tanstack/react-router";
import { OpsLayout, adminNav } from "@/components/layouts/OpsLayout";

export const Route = createFileRoute("/admin")({
  component: () => <OpsLayout title="Admin" nav={adminNav} />,
});
