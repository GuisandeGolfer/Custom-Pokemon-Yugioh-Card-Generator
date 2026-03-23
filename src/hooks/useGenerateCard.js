import { useState } from 'react';

export function useGenerateCard() {
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateCard(formData) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error (${res.status})`);
      }

      const data = await res.json();
      // Merge form data into card data so templates have event details
      setCardData({
        ...data,
        eventDate: formData.eventDate,
        location: formData.location,
        people: formData.people,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { cardData, isLoading, error, generateCard };
}
