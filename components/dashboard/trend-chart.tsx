"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TrendChart({ data }: { data: { day: string; Mood: number; Tidur: number }[] }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-fog)" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 8]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 13 }} />
          <Line type="monotone" dataKey="Mood" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Tidur" stroke="var(--color-dusk)" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
