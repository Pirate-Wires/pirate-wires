const LoadingOverlay = ({message}: {message: string}) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "100",
      backgroundColor: "#FFF",
      color: "#000",
      border: "1px solid #000",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "300px",
    }}>
    {message}
  </div>
);

export default LoadingOverlay;
