export default function LoadingSpinner() {
  return (
    <div className="container text-center" style={{ marginTop: '2.5%' }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-3">Loading projects...</p>
    </div>
  );
}
