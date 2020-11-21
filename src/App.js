import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BorrowerUser from "./page/User/BorrowerBooks";
import Users from "./page/User/HomePage";
import About from "./page/User/About";

import Admin from "./page/Admin/Dashboard";
import CrudBooks from "./page/Admin/BooksCrud";
import CrudAuthor from "./page/Admin/AuthorCrud";
import CrudGenre from "./page/Admin/GenreCruds";
import DetailBooks from "./page/User/DetailBooks";
import CrudUser from "./page/Admin/UsersCrud";
import ChartReport from "./page/Admin/ReportPage";
import BorrowReport from "./page/Admin/BorrowReportPage";
import BorrowDataPage from "./page/Admin/BorrowDataPage";
import setAbout from "./page/Admin/SetAbout";
import PrintCatalog from './page/Admin/PrintCatalog'
function App() {
  return (
    <div style={{ margin: "0", padding: "0" }}>
      <Router>
        <Switch>
          <Route path="/borowerbooks" component={BorrowerUser} />
          <Route path="/DetailBooks/:id" component={DetailBooks} />
          {/* Route User */}
          <Route path="/" exact component={Users} />
          <Route path="/search/:name" component={Users} />
          <Route path="/category/:category" component={Users} />
          <Route path="/sort/:sort" component={Users} />
          <Route path="/page/:page" component={Users} />
          <Route path="/about/users" component={About} />

          {/* Route Admin */}
          <Route path="/admin/:name/:filter" component={Admin} />
          <Route path="/filterAbsence/:name/:filter" component={Admin} />
          <Route path="/books" component={CrudBooks} />
          <Route path="/author" component={CrudAuthor} />
          <Route path="/genre" component={CrudGenre} />
          <Route path="/user/:filter" component={CrudUser} />
          <Route path="/report" component={ChartReport} />
          <Route path="/filterReport/:param/:param2" component={ChartReport} />
          <Route path="/ReportBorrow/" component={BorrowReport} />
          <Route path="/filterBorrow/:param/:param2" component={BorrowReport} />
          <Route path="/BorrowerData/" component={BorrowDataPage} />
          <Route path="/About/" component={setAbout} />
          <Route path="/PrintCatalog/" component={PrintCatalog} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
