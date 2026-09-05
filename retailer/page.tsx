"use client";
import { useState } from 'react';

export default function RetailerPage() {
  const [formData, setFormData] = useState({ customerName: '', address: '', items: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert("Order created & 5% deposit logged!");
    setFormData({ customerName: '', address: '', items: '' });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Retailer Portal</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-md rounded-md border border-slate-200">
        <input type="text" placeholder="Customer Name" required className="border p-2 rounded" 
          onChange={(e) => setFormData({...formData, customerName: e.target.value})} value={formData.customerName} />
        <input type="text" placeholder="Delivery Address" required className="border p-2 rounded"
          onChange={(e) => setFormData({...formData, address: e.target.value})} value={formData.address} />
        <textarea placeholder="Items" required className="border p-2 rounded"
          onChange={(e) => setFormData({...formData, items: e.target.value})} value={formData.items} />
        <button type="submit" className="bg-sky-600 text-white p-2 rounded font-bold hover:bg-sky-700">Create Order</button>
      </form>
    </div>
  );
}
