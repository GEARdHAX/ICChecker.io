import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import PageWrapper from '../components/layout/PageWrapper';

// ... (mockHistory and other constants remain the same)
const mockHistory = [
  { id: '1a', icName: 'SN74LS00N', supplier: 'Trusted Inc.', date: '2025-10-12', verdict: 'PASS', trust: 92 },
  { id: '2b', icName: 'ATMEGA328P', supplier: 'Components Co', date: '2025-10-11', verdict: 'REVIEW', trust: 65 },
  { id: '3c', icName: 'STM32F103C8T6', supplier: 'Gray Market LLC', date: '2025-10-11', verdict: 'FAIL', trust: 23 },
];

const pieData = [
  { name: 'Pass', value: 68 },
  { name: 'Fail', value: 12 },
  { name: 'Review', value: 20 },
];
const COLORS = ['#22C55E', '#EF4444', '#FACC15'];


export default function DashboardPage() {
  const [history, setHistory] = useState([]);
  useEffect(() => setHistory(mockHistory), []);

  const getSeverity = (verdict) => {
    switch (verdict) {
      case 'PASS': return 'success';
      case 'FAIL': return 'danger';
      case 'REVIEW': return 'warning';
      default: return null;
    }
  };

  const verdictBodyTemplate = (rowData) => {
    return <Tag value={rowData.verdict} severity={getSeverity(rowData.verdict)} />;
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-center">
        <Card title="Total Checks" className="font-semibold"><p className="text-3xl mt-2">1,245</p></Card>
        <Card title="Pass Rate" className="font-semibold"><p className="text-3xl mt-2 text-green-500">91.2%</p></Card>
        <Card title="Trusted Suppliers" className="font-semibold"><p className="text-3xl mt-2">34</p></Card>
        <Card title="Flagged Cases" className="font-semibold"><p className="text-3xl mt-2 text-red-500">109</p></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <h2 className="text-xl font-semibold mb-4">Verification History</h2>
            <DataTable value={history} paginator rows={5} emptyMessage="No verification records found.">
              <Column field="icName" header="IC Name" sortable />
              <Column field="supplier" header="Supplier" sortable />
              <Column field="date" header="Date" sortable />
              <Column field="trust" header="Trust" sortable body={(rowData) => `${rowData.trust}%`} />
              <Column field="verdict" header="Verdict" body={verdictBodyTemplate} />
            </DataTable>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Verdict Distribution</h2>
             <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                  {pieData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}