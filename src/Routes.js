import { Navigate, Route, Routes as Switch } from "react-router-dom";

import { MoviesList, MovieDetail } from "./pages";

export const route = {
  moviesList: () => `/movies`,
  movieDetail: () => `/movies/:slug`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.moviesList()} exact element={<MoviesList />} />
      <Route path={route.movieDetail()} exact element={<MovieDetail />} />
      <Route path="*" element={<Navigate to={route.moviesList()} />} />
    </Switch>
  );
}
