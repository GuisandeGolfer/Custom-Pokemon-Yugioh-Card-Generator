import { useRef, useState } from 'react';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import ExportButton from './components/ExportButton';
import LoadingOverlay from './components/LoadingOverlay';
import { useGenerateCard } from './hooks/useGenerateCard';
import './App.css';

export default function App() {
  const [cardStyle, setCardStyle] = useState('pokemon');
  const cardRef = useRef(null);
  const { cardData, isLoading, error, generateCard } = useGenerateCard();

  function handleSubmit(formData) {
    setCardStyle(formData.cardStyle);
    generateCard(formData);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Card Creator</h1>
        <p className="app-subtitle">AI-powered custom trading cards for your life events</p>
      </header>

      <main className="app-main">
        <div className="form-panel">
          <CardForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <div className="preview-panel">
          <div className="preview-wrapper">
            {isLoading && <LoadingOverlay />}
            <CardPreview ref={cardRef} cardStyle={cardStyle} cardData={cardData} />
          </div>

          {error && (
            <div className="error-banner">
              <strong>Error:</strong> {error}
            </div>
          )}

          {cardData && !isLoading && (
            <ExportButton cardRef={cardRef} cardName={cardData.cardName} />
          )}
        </div>
      </main>
    </div>
  );
}
