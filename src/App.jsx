import { MainRouter } from "./components/MainRouter";
import { AuthProvider } from "./providers/AuthProvider";
import { ConfigProvider } from "./providers/ConfigProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";
//import "./styles/styles.css";

export const App = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <ConfigProvider>
          <MainRouter />
        </ConfigProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default App;
