import { CSSProperties } from "react";
import { SquareLoader } from "react-spinners";

export default function Loader() {

    return (
      <div style={styles.loaderContainer}>
        <SquareLoader color="gray" />
      </div>
    );
}

const styles: { loaderContainer: CSSProperties } = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
};