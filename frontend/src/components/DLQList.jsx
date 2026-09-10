import {
  AlertTriangle,
  XCircle,
  ExternalLink,
} from "lucide-react";

const DLQList = () => {
  const failedOrders = [
    {
      orderId: "1021",
      product: "Unknown Product",
      reason: "Maximum retry attempts exceeded",
    },
    {
      orderId: "1025",
      product: "Invalid Order",
      reason: "Permanent processing failure",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-6">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <AlertTriangle size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Dead Letter Queue
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Permanently failed messages
            </p>
          </div>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
          {failedOrders.length} Failed
        </span>

      </div>

      {/* Failed orders */}
      <div className="divide-y divide-slate-100">

        {failedOrders.map((order) => (
          <div
            key={order.orderId}
            className="p-5"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-start gap-3">

                <XCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {order.product}
                    </p>

                    <span className="font-mono text-xs text-slate-400">
                      #{order.orderId}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-red-500">
                    {order.reason}
                  </p>
                </div>

              </div>

              <button
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                title="View details"
              >
                <ExternalLink size={16} />
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Topic */}
      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Kafka Topic
          </span>

          <code className="rounded-md bg-white px-2 py-1 text-xs text-red-600 shadow-sm">
            orders.DLQ
          </code>
        </div>
      </div>

    </div>
  );
};

export default DLQList;