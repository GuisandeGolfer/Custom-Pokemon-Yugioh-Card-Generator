import { toPng } from 'html-to-image';

export async function exportCard(node, cardName) {
  // Wait a tick to ensure images are rendered
  await new Promise(resolve => setTimeout(resolve, 100));

  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
  });

  const link = document.createElement('a');
  link.download = `${cardName.replace(/\s+/g, '-').toLowerCase()}-card.png`;
  link.href = dataUrl;
  link.click();
}
