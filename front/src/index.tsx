import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import "./index.css";

import Game from "./Routes/Game";
import Auth from "./Routes/Auth/Auth";
import SignIn from "./Routes/Auth/SignIn";
import SignUp from "./Routes/Auth/SignUp";
import Chat from "./Routes/Chat";
import UserInterface from "./Routes/UserInterface";
import { AuthProvider, RedirectWhenAuth, RequireAuth } from "./Hooks/Authorize";
import TwoFAValidation from "./Routes/TwoFAQValidation";
import LeaderBoard from "./Routes/LeaderBoard";
import UserPrivateProfile from "./Routes/Profile/Private/PrivateProfile";
import { BlockedList } from "./Routes/Profile/Private/Relations/Blocked";
import { FriendsList } from "./Routes/Profile/Private/Relations/Friends";
import { PendingList } from "./Routes/Profile/Private/Relations/Pending";
import UserPublicProfile from "./Routes/Profile/Public/PublicProfile";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/auth/signin" />} />
          <Route path="2FA" element={<TwoFAValidation />} />
          <Route path="/auth" element={<Auth />}>
            <Route index element={<Navigate to="/auth/signin" />} />
            <Route
              path="signin"
              element={
                <RedirectWhenAuth>
                  <SignIn />
                </RedirectWhenAuth>
              }
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/auth/signin" />} />
          </Route>

          <Route
            path="app"
            element={
              <RequireAuth>
                <UserInterface />
              </RequireAuth>
            }
          >
            <Route index element={<UserPrivateProfile />} />
            <Route path="private-profile" element={<UserPrivateProfile />}>
              <Route index element={<FriendsList />} />
              <Route path="friends" element={<FriendsList />} />
              <Route path="pending" element={<PendingList />} />
              <Route path="blocked" element={<BlockedList />} />
            </Route>
            <Route path="public/:userName" element={<UserPublicProfile />} />
            <Route
              path="chat"
              element={
                <RequireAuth>
                  <Chat />
                </RequireAuth>
              }
            />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="game" element={<Game />} />
            <Route path="privateGame" element={<Game pvtGame={true} />} />
            <Route path="*" element={<Navigate to="/app/private-profile" />} />
          </Route>
          <Route path="*" element={<Navigate to="/auth/signin" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

