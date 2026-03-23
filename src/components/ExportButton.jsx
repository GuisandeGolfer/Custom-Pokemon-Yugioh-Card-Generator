import { exportCard } from '../utils/exportCard';

export default function ExportButton({ cardRef, cardName }) {
  async function handleExport() {
    if (!cardRef?.current) return;
    try {
      await exportCard(cardRef.current, cardName || 'custom-card');
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export card. Please try again.');
    }
  }

  return (
    <button className="export-btn" onClick={handleExport}>
      Download as PNG
    </button>
  );
}
