import { Navigate, Route, Routes as Switch } from "react-router-dom";

import { MoviesList, MovieDetail, GeneralEntityDetail } from "./pages";

export const route = {
  moviesList: () => `/movies`,
  movieDetail: () => `/movies/:slug`,
  personDetail: () => `/people/:entityId`,
  roleDetail: () => `/roles/:entityId`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.moviesList()} exact element={<MoviesList />} />
      <Route path={route.movieDetail()} exact element={<MovieDetail />} />
      <Route
        path={route.personDetail()}
        exact
        element={<GeneralEntityDetail type="person" />}
      />
      <Route
        path={route.roleDetail()}
        exact
        element={<GeneralEntityDetail type="role" />}
      />
      <Route path="*" element={<Navigate to={route.moviesList()} />} />
    </Switch>
  );
}
