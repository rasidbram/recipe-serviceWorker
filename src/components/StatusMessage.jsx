const StatusMessage = ({ loading, error }) => {
  return (
    <>
      {loading && <p className="loading-text">Loading recipes...</p>}
      {error && <p className="error-text">{error}</p>}
    </>
  );
};

export default StatusMessage;
