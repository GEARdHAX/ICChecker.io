import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import PageWrapper from '../components/layout/PageWrapper';

const mockSuppliers = [
  { id: 1, name: 'Trusted Inc.', trustScore: 92, status: 'Certified' },
  { id: 2, name: 'Gray Market LLC', trustScore: 23, status: 'Flagged' },
];

export default function AdminPanel() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const actionBodyTemplate = (rowData) => {
    return (
      <Button icon="pi pi-pencil" rounded text onClick={() => {
        setSelectedSupplier(rowData);
        setDialogVisible(true);
      }} />
    );
  };

  const onHide = () => setDialogVisible(false);

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-6">Admin - Supplier Management</h1>
      <Card>
        <DataTable value={suppliers}>
          <Column field="name" header="Supplier Name" />
          <Column field="trustScore" header="Trust Score" />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} />
        </DataTable>
      </Card>

      <Dialog header="Edit Supplier" visible={dialogVisible} onHide={onHide} modal>
        {selectedSupplier && (
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={selectedSupplier.name} readOnly />
            </div>
            <div className="field">
              <label htmlFor="score">Trust Score</label>
              <InputText id="score" value={selectedSupplier.trustScore} />
            </div>
          </div>
        )}
      </Dialog>
    </PageWrapper>
  );
}

// You need to add this to your imports in AdminPanel.jsx
import { Card } from 'primereact/card';