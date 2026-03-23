export default function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
      <p className="loading-text">Generating your card...</p>
      <p className="loading-subtext">This may take 10-20 seconds</p>
    </div>
  );
}
