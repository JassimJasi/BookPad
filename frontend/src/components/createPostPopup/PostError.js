export default function PostError({ error, setError }) {
  return (
    <div className="postError">
      <div className="postError_error">{error}</div>
      <button
        className="blue_btn"
        on
        onClick={() => {
          setError("");
        }}
      >
        Try again
      </button>
    </div>
  );
}
