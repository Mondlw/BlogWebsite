import { createContext, useContext, useEffect, useState } from "react";

import { doc, onSnapshot } from "firebase/firestore";

import { useFirebaseContext } from "./FirebaseProvider";

export const ConfigContext = createContext({});

const CONFIG_COLLECTION = "config"; // name of the FS collection of config

const ConfigProvider = (props) => {
  const children = props.children;

  const [config, setConfig] = useState(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configErrorMessages, setAuthErrorMessages] = useState();

  const { myFS } = useFirebaseContext();

  // listen to the user profile (FS User doc)
  useEffect(() => {
    let unsubscribe = null;
    const listenToConfigDoc = async () => {
      try {
        let docRef = doc(myFS, CONFIG_COLLECTION, "config");
        unsubscribe = await onSnapshot(
          docRef,
          (docSnap) => {
            let configData = docSnap.data();
            console.log("Got config doc:", configData, docSnap);
            if (!configData) {
              setAuthErrorMessages([
                `No profile doc found in Firestore at: ${docRef.path}`,
              ]);
            }
            setConfig(configData);
          },
          (firestoreErr) => {
            console.error(
              `onSnapshot() callback failed with: ${firestoreErr.message}`,
              firestoreErr
            );
            setAuthErrorMessages([
              firestoreErr.message,
              "Have you initialized your Firestore database?",
            ]);
          }
        );
      } catch (ex) {
        console.error(
          `useEffect() calling onSnapshot() failed with: ${ex.message}`
        );
        setAuthErrorMessages([ex.message]);
      } finally {
        setConfigLoading(false);
      }
    };

    listenToConfigDoc();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [myFS]);

  if (configLoading) {
    return <h1>Loading</h1>;
  }

  const theValues = {
    configErrorMessages,
    configLoading,
    config,
  };

  return (
    <ConfigContext.Provider value={theValues}>
      {children}
    </ConfigContext.Provider>
  );
};

/**
 * A hook that returns the AuthContext's values.
 *
 * @returns {Object} an object with the following properties:
 * - `configErrorMessages` {null|string[]}- array of error message strings, or null
 * - `configLoading` {boolean} - true if authentication is still loading, false otherwise
 */
const useConfigContext = () => {
  // get the context
  const context = useContext(ConfigContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useConfigContext was used outside of its Provider");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ConfigProvider, useConfigContext };
