import bootstrap from "axe-browser-reporter";
import styles from "./app.scss";
import RouterService from "./services/Router.service";

const styling = document.createElement("style");
styling.innerText = styles;

document.querySelector("head").append(styling);

const _router = new RouterService();

require("./DailySchedule/DailySchedule");
require("./Exercise/Exercise");
require("./Exercises/Exercises");
require("./Footer/Footer");
require("./Header/Header");
require("./Home/Home");
require("./NotFound/NotFound");

bootstrap();
