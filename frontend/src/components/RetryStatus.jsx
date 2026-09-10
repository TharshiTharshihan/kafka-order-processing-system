import { RotateCcw, Clock3, CheckCircle2 } from "lucide-react";

const RetryStatus = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <RotateCcw size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Retry Processing
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Temporary failure recovery
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">

        {/* Retry Topic */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Kafka Topic
            </span>

            <span className="rounded-md bg-white px-2 py-1 font-mono text-xs text-slate-700 shadow-sm">
              orders.retry
            </span>
          </div>
        </div>

        {/* Attempts */}
        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={16} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">
                Attempt 1
              </p>
              <p className="text-xs text-slate-400">
                Temporary failure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <Clock3 size={16} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">
                Attempt 2
              </p>
              <p className="text-xs text-slate-400">
                Retrying with backoff...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <RotateCcw size={16} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">
                Attempt 3
              </p>
              <p className="text-xs text-slate-400">
                Waiting for retry
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RetryStatus;