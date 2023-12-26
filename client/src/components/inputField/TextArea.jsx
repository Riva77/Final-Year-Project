const TextArea = ({ label, name, value, onChange }) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <textarea
        name={name}
        value={value}
        cols="30"
        rows="10"
        style={styles.textAreaStyle}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  label: {
    fontSize: "16px",
    color: "#555555",
  },

  textAreaStyle: {
    height: "188px",
    border: "1px solid #EBEBEB",
    background: "#f5f7f9",
    width: "860px",
    padding: "18px",
    fontSize: "medium",
    fontFamily: "Lato",
    resize: "none",
  },
};
