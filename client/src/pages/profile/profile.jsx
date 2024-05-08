import { useSelector } from "react-redux";
import profileRoute from "../../routes/profileRoutes";
import { useNavigate, Outlet } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";

const Profile = () => {
  const userData = useSelector((state) => state.user.data);

  const navigate = useNavigate();

  const path = window.location.pathname
    .replace("/profile/", "")
    .replace("-", " ");

  if (!userData) {
    return <Spinner />;
  }

  return (
    <div style={styles.divMain}>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <section style={styles.firstSection}>
          <div className="flex flex-col gap-10">
            <div className=" w-[269px] h-[269px] bg-white rounded-full flex justify-center items-center text-[#F1EEE3] text-9xl border-4 border-[#4C2B21]">
              {userData?.firstName[0].toUpperCase() +
                userData?.lastName[0].toUpperCase()}
            </div>
            <div className="flex flex-col items-center ">
              <span className="text-xl font-bold">
                {userData?.firstName + " " + userData?.lastName}
              </span>
              <span>{userData?.email}</span>
            </div>
          </div>
          <div className="w-full ">
            {profileRoute.map((route, k) => {
              return (
                <div
                  onClick={() => navigate(route.path)}
                  key={k}
                  className={`${
                    route.name.toLowerCase() == path
                      ? "bg-[#4C2B21] text-white"
                      : "text-black"
                  } px-4 flex  font-medium , text-md cursor-pointer rounded-md w-full items-center mb-2 py-5 hover:bg-[#4C2B21] hover:text-white `}
                >
                  {route.icon}
                  {route.name}
                </div>
              );
            })}
          </div>
        </section>

        <section style={styles.secondSection}>
          <Outlet />
        </section>
      </section>
      {/* <Footer/> */}
    </div>
  );
};

export default Profile;

//CSS

const styles = {
  divMain: {
    display: "flex",
    justifyContent: "center",
    background: "#F1EEE3",

    flexDirection: "column",
    // height: "90vh",
  },

  firstSection: {
    display: "flex",
    // justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    gap: 50,
    background: "#F1EEE3",
    flex: 1.5,
    padding: "25px",
    height: "91vh",
  },

  secondSection: {
    display: "flex",
    background: "#FDFBF7",
    flex: 6,
    padding: "0 25px",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
};
