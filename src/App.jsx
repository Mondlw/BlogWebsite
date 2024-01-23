import { MainRouter } from './components/MainRouter';
import { AuthProvider } from './providers/AuthProvider';
import { FirebaseProvider } from './providers/FirebaseProvider';
import "./styles/styles.css"

export const App = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default App;
