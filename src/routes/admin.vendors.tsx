import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { carService, vendorService } from "@/services";

export const Route = createFileRoute("/admin/vendors")({
  component: AdminVendors,
});

function AdminVendors() {
  const { data: vendors = [] } = useQuery({ queryKey: ["vendors"], queryFn: () => vendorService.list() });
  const { data: cars = [] } = useQuery({ queryKey: ["cars"], queryFn: () => carService.list() });

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-4">
        <h2 className="font-display font-semibold">Daftar Vendor</h2>
        <p className="text-xs text-muted-foreground">{vendors.length} vendor terdaftar</p>
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="p-4">Nama Usaha</th>
            <th className="p-4">Kota</th>
            <th className="p-4">Armada</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {vendors.map((v) => {
            const fleet = cars.filter((c) => c.vendorId === v.id).length;
            return (
              <tr key={v.id}>
                <td className="p-4 font-medium">{v.businessName}</td>
                <td className="p-4">{v.city}</td>
                <td className="p-4 num">{fleet}</td>
                <td className="p-4 num">{v.rating?.toFixed(1)}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${v.status === "active" ? "bg-status-ready/10 text-status-ready" : "bg-status-active/10 text-status-active"}`}>
                    {v.status === "active" ? "Aktif" : "Menunggu Approval"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {v.status === "pending" ? (
                    <div className="inline-flex gap-1">
                      <button className="flex items-center gap-1 rounded-md bg-status-ready/10 px-2 py-1 text-xs text-status-ready hover:bg-status-ready/20">
                        <Check className="h-3 w-3" /> Approve
                      </button>
                      <button className="flex items-center gap-1 rounded-md bg-status-maintenance/10 px-2 py-1 text-xs text-status-maintenance hover:bg-status-maintenance/20">
                        <X className="h-3 w-3" /> Reject
                      </button>
                    </div>
                  ) : (
                    <button className="text-xs text-primary hover:underline">Detail</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
