import { useEffect, useState } from "react";
import { ShoppingBag, CheckCircle2 } from "lucide-react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders`
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
  }, 2000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div>
          <h2 className="font-semibold text-slate-900">
            Recent Orders
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Orders consumed from Kafka
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-medium text-emerald-600">
            Live
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            No orders found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="flex items-center justify-between gap-4 p-5 transition hover:bg-slate-50"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <ShoppingBag size={18} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {order.product}
                    </p>

                    <span className="text-xs text-slate-400">
                      #{order.orderId}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Order processed successfully
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">
                  Rs. {Number(order.price).toLocaleString()}
                </p>

                <div className="mt-1 flex items-center justify-end gap-1 text-xs text-emerald-600">
                  <CheckCircle2 size={13} />
                  {order.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderList;