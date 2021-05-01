import React from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";


  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <h3>User Page</h3>
        </Route>
      </Switch>
    </div>
  );
});