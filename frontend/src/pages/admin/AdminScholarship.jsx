import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useApi } from '../../hooks/useApi';

export default function AdminScholarship() {
  const { get, put } = useApi();
  const [rows, setRows] = useState([]);
  const load = () => get('/api/scholarship').then(setRows);
  useEffect(() => { load(); }, []);

  return (
    <AdminLayout title="Scholarship applications">
      <div className="admin-card">
        <table className="admin-table">
          <thead><tr><th>Student</th><th>Email</th><th>School</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.student_name}</td>
                <td>{r.email}</td>
                <td>{r.school}</td>
                <td>{r.status}</td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={async () => { await put(`/api/scholarship/${r.id}`, { status: 'reviewed' }); load(); }}>Mark reviewed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>No applications yet.</p>}
      </div>
    </AdminLayout>
  );
}
