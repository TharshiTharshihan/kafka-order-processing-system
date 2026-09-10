import { ShoppingBag, CheckCircle2 } from "lucide-react";

const OrderList = () => {
  const orders = [
    {
      orderId: "1001",
      product: "Laptop",
      price: 150000,
      status: "Processed",
    },
    {
      orderId: "1002",
      product: "Wireless Mouse",
      price: 4500,
      status: "Processed",
    },
    {
      orderId: "1003",
      product: "Mechanical Keyboard",
      price: 18500,
      status: "Processed",
    },
    {
      orderId: "1004",
      product: "Monitor",
      price: 75000,
      status: "Processed",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
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

      {/* Orders */}
      <div className="divide-y divide-slate-100">
        {orders.map((order) => (
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
                Rs. {order.price.toLocaleString()}
              </p>

              <div className="mt-1 flex items-center justify-end gap-1 text-xs text-emerald-600">
                <CheckCircle2 size={13} />
                {order.status}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;