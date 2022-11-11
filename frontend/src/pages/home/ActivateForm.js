import PropagateLoader from "react-spinners/PropagateLoader";

export default function ActivateForm({ type, header, text, loading, color }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        <PropagateLoader color={color} size={20} loading={loading} />
      </div>
    </div>
  );
}
