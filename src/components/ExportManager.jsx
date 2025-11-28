import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEmail } from '../context/EmailContext';

const ExportManager = () => {
  const { emailConfig, updateRootConfig } = useEmail();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportImage = async () => {
    setIsExporting(true);
    const element = document.getElementById('email-preview-frame');

    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3, // Higher resolution
          useCORS: true,
          backgroundColor: null,
        });

        const link = document.createElement('a');
        link.download = `fake-email-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
        alert('Failed to generate image. Please try again.');
      }
    }
    setIsExporting(false);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('email-preview-frame');

    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`fake-email-${Date.now()}.pdf`);
      } catch (error) {
        console.error('PDF Export failed:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    }
    setIsExporting(false);
  };

  const toggleWatermark = () => {
    updateRootConfig('watermark', { visible: !emailConfig.watermark.visible });
  };

  return (
    <div className="control-section" style={{ borderBottom: 'none' }}>
      <h3>Export & Settings</h3>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          className="primary-button"
          onClick={handleExportImage}
          disabled={isExporting}
          style={{ flex: 1 }}
        >
          {isExporting ? '...' : 'Download Image'}
        </button>
        <button
          className="secondary-button"
          onClick={handleExportPDF}
          disabled={isExporting}
          style={{ flex: 1 }}
        >
          {isExporting ? '...' : 'Download PDF'}
        </button>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={emailConfig.watermark.visible}
            onChange={toggleWatermark}
          />
          Show Watermark
        </label>
      </div>

      <style>{`
        .primary-button {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .primary-button:hover {
          opacity: 0.9;
        }
        .secondary-button {
          background: transparent;
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .secondary-button:hover {
          background: rgba(0, 122, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ExportManager;
