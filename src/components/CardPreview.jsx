import { forwardRef } from 'react';
import PokemonCard from './PokemonCard';
import YuGiOhCard from './YuGiOhCard';
import '../styles/card-common.css';

const CardPreview = forwardRef(function CardPreview({ cardStyle, cardData }, ref) {
  if (!cardData) {
    return (
      <div className="card-placeholder">
        <div className="card-placeholder-icon">🃏</div>
        <div className="card-placeholder-text">
          Fill in your event details and hit <strong>Generate Card</strong> to create your custom card!
        </div>
      </div>
    );
  }

  if (cardStyle === 'yugioh') {
    return <YuGiOhCard ref={ref} data={cardData} />;
  }

  return <PokemonCard ref={ref} data={cardData} />;
});

export default CardPreview;
