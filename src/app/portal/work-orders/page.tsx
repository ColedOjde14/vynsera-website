// src/app/portal/work-orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await fetch('/api/portal/work-orders');
        const data = await response.json();
        if (response.ok) {
          setWorkOrders(data.workOrders);
        } else {
          toast.error(data.error || 'Failed to load work orders');
        }
      } catch (err) {
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 text-white p-6">
      <h1 className="text-4xl font-bold text-indigo-200 mb-8">My Work Orders</h1>

      {loading ? (
        <p className="text-indigo-300">Loading...</p>
      ) : workOrders.length === 0 ? (
        <p className="text-indigo-300">No work orders yet.</p>
      ) : (
        <div className="space-y-6">
          {workOrders.map((order) => (
            <div key={order.id} className="bg-black/40 border border-indigo-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-200">{order.title}</h3>
              <p className="text-indigo-300 mt-2">{order.description || 'No description'}</p>
              <p className="text-sm text-indigo-400 mt-4">
                Status: <span className="font-medium">{order.status}</span>
              </p>
              {order.dueDate && (
                <p className="text-sm text-indigo-400">
                  Due: {new Date(order.dueDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}