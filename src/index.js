import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import TimeSheet from "./routes/Content/TimeSheet";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from "./routes/Nav/NavComponent";
import Categories from "./routes/Content/Categories";
import TimeSheetDetails from "./routes/Content/TimeSheetDetails";
import PurchaseOrders from "./routes/Content/PurchaseOrders";
import IncomeSources from "./routes/Content/IncomeSources";


const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        {/* <Background/> */}
        <NavComponent/>
        <Routes>
            <Route path="/htmls" element={<TimeSheet/>} />
            <Route path="/" element={<TimeSheet/>} />
            <Route path="time-sheet" element={<TimeSheet />} />
            <Route path="/all-categories" element={<Categories />} />
            <Route path="/time-sheet-detailes" element={<TimeSheetDetails />} />
            <Route path="purchase-orders" element={<PurchaseOrders />} />
            <Route path="income-sources" element={<IncomeSources />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);