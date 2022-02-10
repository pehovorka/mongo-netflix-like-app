import { useState, useEffect, createContext, useContext } from "react";
import * as Realm from "realm-web";

const RealmAppContext = createContext();

export const useRealmApp = () => {
  const app = useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    );
  }
  return app;
};

export const RealmAppProvider = ({ appId, children }) => {
  const [app, setApp] = useState(new Realm.App(appId));
  useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  useEffect(() => {
    async function logIn() {
      await app.logIn(Realm.Credentials.anonymous());

      // If successful, app.currentUser is the user that just logged in
      setCurrentUser(app.currentUser);
    }
    logIn();
  }, [app]);

  const wrapped = { ...app, currentUser };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
