import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const CurrentUserContext = createContext(null);
//this is storing the local storage info inside of the state variable.
export const CurrentUserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("browser-tabs-lock-key-auth0.lock.getTokenSilently")
      ? JSON.parse(
          localStorage.getItem(
            "browser-tabs-lock-key-auth0.lock.getTokenSilently"
          )
        )
      : null
  );

  // function posts the users info in the mongodb database.
  //if the current exists, we dont want to push it in the database, if it does exists we wwant to puash the info in the data base.
  //this is where aauth0 gets triggered.

  useEffect(() => {
    if (user) {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      };
      fetch(`/user-info/${user.email}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setUserData(data.data);
        });
    }
  }, [user, refresh]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userData,
        setUserData,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
