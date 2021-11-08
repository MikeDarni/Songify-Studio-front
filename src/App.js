import Layout from "./components/Layout/Layout";
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
        <Route path="/new-song">
          <NewSongPage />
        </Route>
        <Route path="/song-convert">
          <ConvertSongMenuPage />
        </Route>
        <Route path="/song-studio">
          <SongUserMenuPage />
        </Route>
        <Route path="/">
          <AllSongsPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
