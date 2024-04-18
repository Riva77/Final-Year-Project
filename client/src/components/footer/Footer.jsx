import { RiArrowRightSLine } from "react-icons/ri";
import khalti from "../../assets/khalti.png";

const Footer = () => {
  return (
    <footer style={styles.container}>
      {/* <section style={styles.columnContainer}>
        <div style={styles.footerColumn}>
          <span style={styles.columnHeading}>COMPANY INFO</span>
          <div style={styles.columnContent}>
            <span style={styles.span}>About Us</span>
            <span style={styles.span}>Latest Posts</span>
            <span style={styles.span}>Contact Us</span>
            <span style={styles.span}>Shop</span>
          </div>
        </div>
        <div style={styles.footerColumn}>
          <span style={styles.columnHeading}>HELP LINKS</span>
          <div style={styles.columnContent}>
         
            <span style={styles.span}>Order Status</span>
            <span style={styles.span}>Delivery</span>
            <span style={styles.span}>Shipping Info</span>
            <span style={styles.span}>FAQ</span>
          </div>
        </div>
        <div style={styles.footerColumn}>
          <span style={styles.columnHeading}>GET IN THE KNOW</span>
          <form action="" style={styles.formStyle}>
            <input
              type="text"
              placeholder="Enter email"
              style={{ ...styles.input, borderBottom: "2px solid #000000" }}
            />
            <button style={styles.button}>
              <RiArrowRightSLine size="48px" />
            </button>
          </form>
        </div>
      </section> */}
      {/* <hr style={styles.separator} /> */}
      <section style={styles.copyrightSection}>
        <div>
          <span style={styles.span}>&copy; 2024 Riva Karki</span>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={styles.span}>Privacy Policy</span>
            <span style={styles.span}>Terms & Conditions</span>
          </div>
        </div>
        <div style={styles.logoContainer}>
          <img src={khalti} alt="khalti logo" width={100}/>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

const styles = {
  container: {
    marginTop: "60px",
    background: "#FBFBFB",
    padding: "70px 165px 70px 165px",
  },

  columnContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },

  columnHeading: {
    fontFamily: "Arimo",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "13.8px",
  },

  span: {
    color: "#1D1D1D",
    size: "14px",
    lineHeight: "28px",
  },

  columnContent: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    background: "#FBFBFB",
    width: "247px",
    height: "48px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  formStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    border: "none",
    background: "none",
    cursor: "pointer",
  },

  separator: {
    marginTop: "70px",
    border: "1px solid #E8E8E8",
  },

  copyrightSection: {
    // marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoContainer: {
    display: "flex",
    gap: 16,
  },

  logoSize: "36px",
  logoColor: "gray",
};
