import { useState } from "react";

const vehicles = [
  {
    id: "sedan",
    eyebrow: "CARS & COUPES",
    label: "SEDAN & COUPE",
    icon: "ph-car",
    interior: 140,
    exterior: 70,
    full: 200,
  },
  {
    id: "suv",
    eyebrow: "TRUCKS & LARGE VEHICLES",
    label: "SUV & TRUCK",
    icon: "ph-jeep",
    interior: 165,
    exterior: 75,
    full: 225,
  },
];

const services = [
  { id: "interior", icon: "ph-armchair", label: "INTERIOR DETAIL", key: "interior" as const },
  { id: "exterior", icon: "ph-drop", label: "EXTERIOR DETAIL", key: "exterior" as const },
  { id: "full", icon: "ph-sparkle", label: "FULL DETAIL", sub: "Interior + Exterior", key: "full" as const },
];

const addons = [
  { id: "engine", icon: "ph-engine", label: "ENGINE BAY", price: 75 },
  { id: "doghair", icon: "ph-paw-print", label: "DOG HAIR REMOVAL", price: 50 },
  { id: "odor", icon: "ph-wind", label: "ODOR REMOVAL", price: 125 },
  { id: "thirdrow", icon: "ph-car-profile", label: "3RD ROW", price: 25 },
];

export default function PricingSelector() {
  const [activeVehicle, setActiveVehicle] = useState("sedan");
  const [activeService, setActiveService] = useState("full");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const vehicle = vehicles.find((v) => v.id === activeVehicle)!;
  const basePrice = vehicle[activeService as "interior" | "exterior" | "full"];
  const addonTotal = addons.filter((a) => selectedAddons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const total = basePrice + addonTotal;

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  return (
    <div className="border border-white/15 bg-black">

      {/* PRICING header */}
      <div className="flex items-center gap-4 px-8 py-6 border-b border-white/10">
        <div className="flex-1 h-px bg-white/20" />
        <h2 className="text-2xl md:text-3xl font-black tracking-[0.25em] text-white uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>PRICING</h2>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-6">

        {/* Step 1 — Vehicle type */}
        <div>
          <p className="text-[10px] font-black tracking-[0.25em] text-white/40 uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>SELECT YOUR VEHICLE</p>
          <div className="grid grid-cols-2 gap-3">
            {vehicles.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVehicle(v.id)}
                className={`flex items-center gap-4 p-5 border-2 transition-all duration-200 text-left ${
                  activeVehicle === v.id
                    ? "border-[#d39a4d] bg-[#d39a4d]/5"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <i className={`ph-light ${v.icon} text-3xl ${activeVehicle === v.id ? "text-[#d39a4d]" : "text-white/50"}`} />
                <div>
                  <div className={`text-[9px] font-black tracking-[0.2em] uppercase mb-0.5 ${activeVehicle === v.id ? "text-[#d39a4d]" : "text-white/30"}`} style={{ fontFamily: "'Inter', sans-serif" }}>{v.eyebrow}</div>
                  <div className="text-sm font-black tracking-widest uppercase text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{v.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Service type */}
        <div>
          <p className="text-[10px] font-black tracking-[0.25em] text-white/40 uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>SELECT YOUR SERVICE</p>
          <div className="flex flex-col gap-2">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveService(s.id)}
                className={`flex items-center justify-between px-5 py-4 border-2 transition-all duration-200 ${
                  activeService === s.id
                    ? "border-[#d39a4d] bg-[#d39a4d]/5"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`ph-light ${s.icon} text-xl ${activeService === s.id ? "text-[#d39a4d]" : "text-white/50"}`} />
                  <div>
                    <div className="text-sm font-black tracking-widest uppercase text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
                    {s.sub && <div className="text-[10px] text-white/40 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>{s.sub}</div>}
                  </div>
                </div>
                <span className={`text-2xl font-black transition-colors duration-200 ${activeService === s.id ? "text-[#d39a4d]" : "text-white/60"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                  ${vehicle[s.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <div>
            <p className="text-[10px] font-black tracking-[0.25em] text-white/40 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>YOUR ESTIMATE</p>
            <p className="text-sm text-white/50 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
              {vehicle.label} &bull; {services.find(s => s.id === activeService)?.label}
            </p>
          </div>
          <span className="text-4xl md:text-5xl font-black text-[#d39a4d]" style={{ fontFamily: "'Inter', sans-serif" }}>${basePrice}</span>
        </div>

      </div>

      {/* ADD-ONS */}
      <div className="flex items-center gap-4 px-8 py-5 border-t border-white/10">
        <div className="flex-1 h-px bg-white/20" />
        <h3 className="text-lg font-black tracking-[0.25em] text-white uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>ADD-ONS</h3>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-white/10">
        {addons.map((a) => {
          const active = selectedAddons.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggleAddon(a.id)}
              className={`flex flex-col items-center gap-3 py-7 px-4 text-center transition-all duration-200 ${active ? "bg-[#d39a4d]/10" : "hover:bg-white/5"}`}
            >
              <i className={`ph-light ${a.icon} text-4xl ${active ? "text-[#d39a4d]" : "text-white/50"}`} />
              <span className={`text-[11px] font-black tracking-widest uppercase ${active ? "text-white" : "text-white/50"}`} style={{ fontFamily: "'Inter', sans-serif" }}>{a.label}</span>
              <span className={`text-2xl font-black ${active ? "text-[#d39a4d]" : "text-white/50"}`} style={{ fontFamily: "'Inter', sans-serif" }}>+${a.price}</span>
              <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 ${active ? "bg-[#d39a4d] text-black" : "border border-white/20 text-white/30"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                {active ? "ADDED ✓" : "ADD"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Total */}
      <div className="border-t border-[#d39a4d]/30 px-8 py-5 flex items-center justify-between bg-[#d39a4d]/5">
        <div>
          <p className="text-[10px] font-black tracking-[0.25em] text-white/40 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>ESTIMATED TOTAL</p>
          {addonTotal > 0 && (
            <p className="text-xs text-white/40 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
              ${basePrice} base + ${addonTotal} add-ons
            </p>
          )}
        </div>
        <span className="text-4xl md:text-5xl font-black text-[#d39a4d]" style={{ fontFamily: "'Inter', sans-serif" }}>${total}</span>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10 px-8 py-4 text-center">
        <p className="text-sm text-white/40 italic" style={{ fontFamily: "'Inter', sans-serif" }}>Prices vary based on vehicle condition.</p>
      </div>

      {/* CTA */}
      <div className="border-t border-white/10 p-6">
        <a
          href="tel:3863073785"
          className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-[#d39a4d] to-[#fdd78c] text-black font-bold text-sm tracking-wider uppercase py-4 rounded hover:opacity-90 transition-opacity duration-300"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          BOOK NOW
        </a>
      </div>

    </div>
  );
}