const FileInput = ({ value, onChange, name, label, style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <label style={{ fontSize: "16px", color: "#555555" }}>{label}</label>
      <input type="file" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default FileInput;
