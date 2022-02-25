import Calculator from "./components/Calculator/Calculator";
import { ReactComponent as Logo } from "./assets/images/logo.svg";

function App() {
  return (
    <>
      <Logo style={{ margin: "3rem 0", minHeight: "54px" }} />
      <Calculator />
    </>
  );
}

export default App;
