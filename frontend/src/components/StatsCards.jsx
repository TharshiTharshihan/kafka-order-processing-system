import { useEffect, useState } from "react";
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalPrice: 0,
    averagePrice: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/stats`
      );

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

 useEffect(() => {
  fetchStats();

  const interval = setInterval(() => {
    fetchStats();
  }, 2000);

  return () => clearInterval(interval);
}, []);

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      description: "Orders processed",
      icon: ShoppingCart,
    },
    {
      title: "Average Price",
      value: `Rs. ${stats.averagePrice.toLocaleString()}`,
      description: "Running average",
      icon: TrendingUp,
    },
    {
      title: "Total Revenue",
      value: `Rs. ${stats.totalPrice.toLocaleString()}`,
      description: "Processed order value",
      icon: DollarSign,
    },
    {
      title: "DLQ Messages",
      value: "0",
      description: "Permanently failed",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {card.value}
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;