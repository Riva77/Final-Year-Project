const OrderDetails = () => {
  return (
    <div>
      <section style={styles.outerSection}>
        <section style={styles.innerSection}>
          <div className="w-full my-2 flex flex-col gap-4 ">
            <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
              Shipping Details
            </h1>
          </div>
          <div className="flex justify-center"></div>
        </section>
      </section>
    </div>
  );
};

export default OrderDetails;

const styles = {
  outerSection: {
    background: "#F1EEE3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },

  innerSection: {
    background: "#FDFBF7",
    width: "1100px",
    height: "100vh",
    padding: "60px ",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
};
