import { forwardRef } from 'react';
import '../styles/card-common.css';
import '../styles/pokemon-card.css';

const ELEMENT_SYMBOLS = {
  fire: '🔥', water: '💧', earth: '🪨', wind: '🌪', light: '✨', dark: '🌑',
};

const PokemonCard = forwardRef(function PokemonCard({ data }, ref) {
  const { cardName, description, stats, imageBase64, elementType, eventDate, location, people } = data;

  return (
    <div ref={ref} className={`card-container pokemon-card element-${elementType} card-animated`}>
      <div className="pokemon-card-inner">
        <div className="pokemon-header">
          <span className="card-name">{cardName}</span>
          <span className="pokemon-hp"><span>HP</span>{stats?.hp || 100}</span>
        </div>

        <div className="pokemon-art card-art-window">
          {imageBase64 && <img src={imageBase64} alt={cardName} className="card-art" />}
        </div>

        <div className="pokemon-type-badge">
          <span className="pokemon-type-icon">{ELEMENT_SYMBOLS[elementType] || '⚡'}</span>
          <span className="pokemon-type-label">{elementType} type</span>
        </div>

        <div className="pokemon-description-box">
          <p className="card-description">{description}</p>
          <div className="pokemon-stats">
            <div className="pokemon-stat">
              <div className="pokemon-stat-value">{stats?.attack || 50}</div>
              <div className="pokemon-stat-label">Attack</div>
            </div>
            <div className="pokemon-stat">
              <div className="pokemon-stat-value">{stats?.defense || 50}</div>
              <div className="pokemon-stat-label">Defense</div>
            </div>
          </div>
        </div>

        <div className="pokemon-footer">
          <div className="pokemon-footer-left">
            {eventDate && <span>{eventDate}</span>}
            {location && <span>{location}</span>}
          </div>
          <div className="pokemon-footer-right">
            {people && <span>Trainer: {people}</span>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PokemonCard;
