import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("app"));

export default class RouterService {
  constructor() {
    router.setRoutes([
      { path: "/", component: "wcs-home" },
      { path: "/exercises", component: "fgp-exercises" },
      { path: "/exercise/:id", component: "fgp-exercise" },
      { path: "(.*)", component: "wcs-not-found" },
    ]);
  }

  static getRouteParams() {
    return router.location.params;
  }
}
