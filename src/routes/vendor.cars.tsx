import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { carService } from "@/services";
import { StatusPill } from "@/components/StatusPill";
import { PriceDisplay } from "@/components/PriceDisplay";
import type { Car, CarStatus } from "@/types";

const VENDOR_ID = "v1";

export const Route = createFileRoute("/vendor/cars")({
  component: VendorCars,
});

function VendorCars() {
  const qc = useQueryClient();
  const { data: cars = [] } = useQuery({ queryKey: ["v-cars", VENDOR_ID], queryFn: () => carService.list({ vendorId: VENDOR_ID }) });
  const [editing, setEditing] = useState<Car | null>(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["v-cars", VENDOR_ID] });

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus mobil ini?")) return;
    await carService.remove(id);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Manajemen Mobil</h2>
          <p className="text-xs text-muted-foreground">{cars.length} unit</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
          <Plus className="h-4 w-4" /> Tambah Mobil
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cars.map((c) => (
          <div key={c.id} className="overflow-hidden rounded-xl border bg-card">
            <img src={c.images[0]} alt={c.name} className="aspect-[4/3] w-full object-cover" />
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{c.brand} · {c.carClass}</p>
                  <h3 className="font-display font-semibold">{c.name}</h3>
                  <p className="num text-xs text-muted-foreground">{c.plateNumber}</p>
                </div>
                <StatusPill status={c.status} />
              </div>
              <div className="flex items-center justify-between pt-2">
                <PriceDisplay amount={c.pricing[3].selfDrivePrice} suffix="/hari" />
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(c); setShowForm(true); }} className="rounded-md border p-1.5 hover:border-primary hover:text-primary">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="rounded-md border p-1.5 hover:border-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && <CarFormModal car={editing} onClose={() => { setShowForm(false); refresh(); }} />}
    </div>
  );
}

function CarFormModal({ car, onClose }: { car: Car | null; onClose: () => void }) {
  const [name, setName] = useState(car?.name ?? "");
  const [brand, setBrand] = useState(car?.brand ?? "");
  const [carClass, setCarClass] = useState(car?.carClass ?? "MPV");
  const [capacity, setCapacity] = useState(car?.capacity ?? 5);
  const [fuel, setFuel] = useState<Car["fuelType"]>(car?.fuelType ?? "Bensin");
  const [status, setStatus] = useState<CarStatus>(car?.status ?? "ready");
  const [plate, setPlate] = useState(car?.plateNumber ?? "");
  const [description, setDescription] = useState(car?.description ?? "");
  const [pricing, setPricing] = useState(car?.pricing ?? [
    { durationType: "per_jam" as const, selfDrivePrice: 50000, withDriverPrice: 75000 },
    { durationType: "per_4_jam" as const, selfDrivePrice: 180000, withDriverPrice: 255000 },
    { durationType: "per_6_jam" as const, selfDrivePrice: 240000, withDriverPrice: 340000 },
    { durationType: "per_hari" as const, selfDrivePrice: 350000, withDriverPrice: 500000 },
  ]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Car = {
      id: car?.id ?? "c" + Date.now(),
      vendorId: VENDOR_ID,
      name, brand, carClass, plateNumber: plate, capacity, fuelType: fuel,
      description, status, pricing,
      images: car?.images ?? ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=70"],
    };
    if (car) await carService.update(car.id, payload);
    else await carService.create(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">{car ? "Edit Mobil" : "Tambah Mobil"}</h3>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nama Mobil"><input value={name} onChange={(e) => setName(e.target.value)} required className="input" /></Field>
            <Field label="Brand"><input value={brand} onChange={(e) => setBrand(e.target.value)} required className="input" /></Field>
            <Field label="Kelas">
              <select value={carClass} onChange={(e) => setCarClass(e.target.value)} className="input">
                {["City Car", "MPV", "SUV", "Luxury"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Plat Nomor"><input value={plate} onChange={(e) => setPlate(e.target.value)} className="input num" /></Field>
            <Field label="Kapasitas"><input type="number" value={capacity} onChange={(e) => setCapacity(+e.target.value)} className="input num" /></Field>
            <Field label="Bahan Bakar">
              <select value={fuel} onChange={(e) => setFuel(e.target.value as Car["fuelType"])} className="input">
                {["Bensin", "Diesel", "Listrik", "Hybrid"].map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value as CarStatus)} className="input">
                <option value="ready">Tersedia</option>
                <option value="active">Disewa</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </Field>
            <Field label="Upload Foto">
              <input type="file" className="input" onChange={() => alert("Mock upload — foto akan disimpan saat backend terhubung")} />
            </Field>
          </div>
          <Field label="Deskripsi">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="input" />
          </Field>

          <div>
            <p className="mb-2 text-sm font-medium">Harga per Durasi</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="pb-2">Durasi</th>
                  <th className="pb-2">Lepas Kunci</th>
                  <th className="pb-2">Dgn Supir</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, i) => (
                  <tr key={p.durationType}>
                    <td className="py-1 pr-2 capitalize">{p.durationType.replace("_", " ")}</td>
                    <td className="py-1 pr-2">
                      <input type="number" value={p.selfDrivePrice} onChange={(e) => {
                        const np = [...pricing]; np[i] = { ...np[i], selfDrivePrice: +e.target.value }; setPricing(np);
                      }} className="input num" />
                    </td>
                    <td className="py-1">
                      <input type="number" value={p.withDriverPrice} onChange={(e) => {
                        const np = [...pricing]; np[i] = { ...np[i], withDriverPrice: +e.target.value }; setPricing(np);
                      }} className="input num" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2 text-sm">Batal</button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">Simpan</button>
          </div>
        </form>
        <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-background);border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:var(--color-primary)}`}</style>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium">{label}</span>
      {children}
    </label>
  );
}
