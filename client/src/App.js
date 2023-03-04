import Feed from "./components/Feed";
import Clip from "./components/Clip";
import RecordView from "./components/RecordView";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import CommentsTesting from "./components/CommentsTesting";
import AudioRecorder from "./components/AudioRecorder";
import Post from "./components/Post";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App bg-black">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/profile" element={<Profile/>}/>
          {/* <Route path="/edit/:id" element= */}
          {/* <Route path="" */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
