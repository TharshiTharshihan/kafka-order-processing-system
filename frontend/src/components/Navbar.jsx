import { Activity, Radio, Circle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
            <Activity size={21} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Kafka Orders
            </h2>
            <p className="text-xs text-slate-500">
              Avro Processing System
            </p>
          </div>
        </div>

        {/* Kafka Status */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex">
            <Radio size={15} className="text-orange-500" />

            <span className="text-xs font-medium text-slate-600">
              Kafka Broker
            </span>

            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <Circle size={7} fill="currentColor" />
              Online
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;