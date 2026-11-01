import { useEffect, useState } from "react";
import { getStats } from "../api.js";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>Loading…</p>;

  const max = Math.max(...stats.monthly.map((m) => m.sales));

  return (
    <>
      <h1>Overview</h1>
      <div className="stat-grid">
        <div className="stat"><span>Users</span><strong>{stats.totalUsers}</strong></div>
        <div className="stat"><span>Revenue</span><strong>₹{stats.revenue.toLocaleString("en-IN")}</strong></div>
        <div className="stat"><span>Orders</span><strong>{stats.orders}</strong></div>
        <div className="stat"><span>Growth</span><strong>{stats.growth}%</strong></div>
      </div>

      <h2>Monthly sales</h2>
      <div className="bars">
        {stats.monthly.map((m) => (
          <div key={m.month} className="bar-col">
            <div className="bar" style={{ height: `${(m.sales / max) * 100}%` }} title={m.sales} />
            <span>{m.month}</span>
          </div>
        ))}
      </div>
    </>
  );
}
