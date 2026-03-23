import { useState } from 'react';

const THEMES = ['epic', 'cute', 'retro', 'dark', 'tropical', 'fantasy', 'cyberpunk'];
const ELEMENTS = ['fire', 'water', 'earth', 'wind', 'light', 'dark'];

export default function CardForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    cardStyle: 'pokemon',
    eventName: '',
    eventDate: '',
    location: '',
    people: '',
    theme: 'epic',
    customTheme: '',
    elementType: 'fire',
  });

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...formData,
      theme: formData.theme === 'custom' ? formData.customTheme : formData.theme,
    });
  }

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create Your Card</h2>

      {/* Card Style Toggle */}
      <div className="form-group">
        <label className="form-label">Card Style</label>
        <div className="style-toggle">
          <button
            type="button"
            className={`style-btn ${formData.cardStyle === 'pokemon' ? 'active' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, cardStyle: 'pokemon' }))}
          >
            Pokemon
          </button>
          <button
            type="button"
            className={`style-btn ${formData.cardStyle === 'yugioh' ? 'active' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, cardStyle: 'yugioh' }))}
          >
            Yu-Gi-Oh!
          </button>
        </div>
      </div>

      {/* Event Details */}
      <div className="form-group">
        <label className="form-label" htmlFor="eventName">Event Name *</label>
        <input
          id="eventName"
          name="eventName"
          type="text"
          required
          placeholder="Trip to Tokyo, Birthday Party..."
          value={formData.eventName}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="eventDate">Date</label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Tokyo, Japan"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="people">People Involved</label>
        <input
          id="people"
          name="people"
          type="text"
          placeholder="Diego, Maria, Carlos"
          value={formData.people}
          onChange={handleChange}
        />
      </div>

      {/* Theme & Element */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="theme">Theme</label>
          <select id="theme" name="theme" value={formData.theme} onChange={handleChange}>
            {THEMES.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
            <option value="custom">Custom...</option>
          </select>
          {formData.theme === 'custom' && (
            <input
              name="customTheme"
              type="text"
              placeholder="Your custom theme"
              value={formData.customTheme}
              onChange={handleChange}
              style={{ marginTop: 6 }}
            />
          )}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="elementType">Element</label>
          <select id="elementType" name="elementType" value={formData.elementType} onChange={handleChange}>
            {ELEMENTS.map(el => (
              <option key={el} value={el}>{el.charAt(0).toUpperCase() + el.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="generate-btn" disabled={isLoading || !formData.eventName}>
        {isLoading ? 'Generating...' : 'Generate Card'}
      </button>
    </form>
  );
}
