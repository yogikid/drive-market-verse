import { createFileRoute } from "@tanstack/react-router";
import { DriverLayout } from "@/components/layouts/DriverLayout";

export const Route = createFileRoute("/driver")({
  component: DriverLayout,
});
