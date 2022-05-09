// import styled from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Test from "./Test";
import MainHomePage from "./MainHomePage";
import ProfilePage from "./ProfilePage";
import WriterSignup from "./WriterSignup";
import Writting from "./Writting";
import Read from "./Read";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import DropDown from "./DropDown";
import FullText from "./FullText";
import UserProfiles from "./UserProfiles";

function App() {
  const { userData, setUserData } = useContext(CurrentUserContext);
  // if (!userData) {
  //   return <div>....Loading....</div>;
  // }
  // console.log(userData);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainHomePage />
        </Route>
        {userData && (
          <Route exact path="/profile-page">
            {userData.username && userData.bio ? (
              <ProfilePage />
            ) : (
              <Redirect to={"/add-info"} />
            )}
          </Route>
        )}
        <Route exact path="/add-info">
          <WriterSignup />
        </Route>
        {userData && (
          <Route exact path="/writing">
            {userData.username && userData.bio ? (
              <Writting />
            ) : (
              <Redirect to={"/add-info"} />
            )}
          </Route>
        )}
        <Route exact path="/read">
          <Read />
        </Route>
        <Route exact path="/full-text/:_id">
          <FullText />
        </Route>
        <Route exact path="/users-profile/:username">
          <UserProfiles />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
