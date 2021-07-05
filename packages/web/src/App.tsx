import React from "react";
import { Layout } from "antd";
import "./App.css";
import { useFirestoreConnect } from "react-redux-firebase";
import { Route, Switch } from "react-router-dom";

import routes from "./routes";
import { CommanderDetails } from "./pages/commanders/commanderDetails";
import { CommandersList } from "./pages/commanders/commandersList";
import { RacePicker } from "./pages/commanders/racePicker";
import BulletinList from "./pages/bulletins";
import OldStats from "./pages/stats/old-stats";
import { MainFooter } from "./components/main-footer";
import { MainHeader } from "./components/main-header";
import About from "./pages/about";
import { LastMatchesTable } from "./pages/matches/lastMatchesTable";
import LastMatchesTableRelic from "./pages/matches/lastMatchesTableRelic";
import CustomSearch from "./pages/search";
import { BetaVersion } from "./components/beta-version";
import MainHome from "./components/main-home";
import CustomStats from "./pages/stats/custom-stats";

const { Content } = Layout;

const App: React.FC = () => {
  useFirestoreConnect([
    {
      collection: "stats",
      doc: "global",
      storeAs: "globalStats",
    },
    {
      collection: "stats",
      doc: "onlinePlayers",
      storeAs: "onlinePlayers",
    },
  ]);

  return (
    <div className="App">
      <Layout className="layout">
        <MainHeader />
        <Content>
          <Switch>
            <Route path={"/"} exact={true}>
              <MainHome />
            </Route>
            <Route path={routes.fullStatsOldDetails()}>
              <OldStats />
            </Route>
            <Route path={"/stats"}>
              <CustomStats />
            </Route>
            <Route path={routes.commanderByID()}>
              <CommanderDetails />
            </Route>
            <Route path={routes.commanderList()}>
              <CommandersList />
            </Route>
            <Route path={routes.commanderBase()}>
              <RacePicker />
            </Route>
            <Route path={routes.aboutBase()}>
              <About />
            </Route>
            <Route path={routes.bulletinsBase()}>
              <BulletinList />
            </Route>
            <Route path={routes.searchWithParam()}>
              <CustomSearch />
            </Route>
            <Route path={routes.searchBase()}>
              <CustomSearch />
            </Route>
            <Route path={"/test"}>
              <LastMatchesTable />
            </Route>
            <Route path={"/matches/player/:steamid"}>
              <LastMatchesTableRelic />
            </Route>
          </Switch>
        </Content>
        <MainFooter />
      </Layout>
      <BetaVersion />
    </div>
  );
};

export default App;
