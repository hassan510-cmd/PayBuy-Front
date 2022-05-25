import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import Paths from "./routes/Routes/Paths";


const rootElement = document.getElementById("root");
render(
    <Paths />,
    rootElement
);