import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
import AllSongsPage from "./pages/AllSongs";
import NewSongPage from "./pages/NewSong";
import SongUserMenuPage from "./pages/SongUserMenu";
import ConvertSongMenuPage from "./pages/ConvertSongMenu";
import "./input.css";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/song-convert">
          <ConvertSongMenuPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
