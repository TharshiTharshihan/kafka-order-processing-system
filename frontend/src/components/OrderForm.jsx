import { useState } from "react";
import {  Send, Package } from "lucide-react";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderId: "",
    product: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Order:", formData);

    // Later:
    // POST /api/orders
    // Backend will serialize this using Avro
    // and publish it to Kafka.

    setFormData({
      orderId: "",
      product: "",
      price: "",
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <Package size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Create Order
            </h2>

            <p className="text-xs text-slate-500">
              Publish a new order to Kafka
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 p-6">

        {/* Order ID */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Order ID
          </label>

          <input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            placeholder="e.g. 1001"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Product */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Product
          </label>

          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="e.g. Laptop"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 150000"
            min="0"
            step="0.01"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98]"
        >
          <Send size={17} />
          Publish Order
        </button>

      </form>
    </div>
  );
};

export default OrderForm;