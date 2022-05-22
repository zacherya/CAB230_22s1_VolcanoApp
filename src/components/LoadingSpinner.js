function LoadingSpinner(props) {
  return (
    <div
      id="load-indicator"
      className={`roller-container ${props.show ? "waiting" : ""}`}
    >
      <div className="roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
