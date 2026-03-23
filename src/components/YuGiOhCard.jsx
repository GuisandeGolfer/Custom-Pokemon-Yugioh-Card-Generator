import { forwardRef } from 'react';
import '../styles/card-common.css';
import '../styles/yugioh-card.css';

const ELEMENT_ABBREV = {
  fire: 'FIRE', water: 'WATER', earth: 'EARTH', wind: 'WIND', light: 'LIGHT', dark: 'DARK',
};

const YuGiOhCard = forwardRef(function YuGiOhCard({ data }, ref) {
  const { cardName, description, stats, level, imageBase64, elementType, eventDate, location, people } = data;
  const starCount = Math.min(Math.max(level || 4, 1), 12);

  return (
    <div ref={ref} className={`card-container yugioh-card element-${elementType} card-animated`}>
      <div className="yugioh-card-inner">
        <div className="yugioh-header">
          <span className="card-name">{cardName}</span>
          <span className="yugioh-attribute">{(ELEMENT_ABBREV[elementType] || 'DARK').slice(0, 4)}</span>
        </div>

        <div className="yugioh-stars">
          {Array.from({ length: starCount }, (_, i) => (
            <span key={i} className="yugioh-star">★</span>
          ))}
        </div>

        <div className="yugioh-art card-art-window">
          {imageBase64 && <img src={imageBase64} alt={cardName} className="card-art" />}
        </div>

        <div className="yugioh-description-box">
          <div className="yugioh-card-type">[ {elementType} / Effect ]</div>
          <p className="card-description">{description}</p>
          <div className="yugioh-event-details">
            {[eventDate, location, people].filter(Boolean).join(' · ')}
          </div>
        </div>

        <div className="yugioh-footer">
          <span className="yugioh-stat">
            <span className="yugioh-stat-label">ATK/</span>{stats?.attack || 1500}
          </span>
          <span className="yugioh-stat">
            <span className="yugioh-stat-label">DEF/</span>{stats?.defense || 1200}
          </span>
        </div>
      </div>
    </div>
  );
});

export default YuGiOhCard;
