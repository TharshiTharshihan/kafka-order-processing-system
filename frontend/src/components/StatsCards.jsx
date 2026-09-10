import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "128",
      description: "Orders processed",
      icon: ShoppingCart,
    },
    {
      title: "Average Price",
      value: "Rs. 48,250",
      description: "Running average",
      icon: TrendingUp,
    },
    {
      title: "Total Revenue",
      value: "Rs. 6.17M",
      description: "Processed order value",
      icon: DollarSign,
    },
    {
      title: "DLQ Messages",
      value: "4",
      description: "Permanently failed",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.value}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;