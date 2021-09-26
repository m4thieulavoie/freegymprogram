import styles from "./app.scss";
import RouterService from "./services/Router.service";

// const exercises = require("../exercises.json");

const styling = document.createElement("style");
styling.innerText = styles;

document.querySelector("head").append(styling);

const _router = new RouterService();

require("./Exercise/Exercise");
require("./Exercises/Exercises");
require("./Header/Header");
require("./Home/Home");
require("./NotFound/NotFound");
