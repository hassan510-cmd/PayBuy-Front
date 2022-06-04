import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import TimeSheet from "../Content/TimeSheet";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from "../Nav/NavComponent";
import Categories from "../Content/Categories";
import TimeSheetDetails from "../Content/TimeSheetDetails";
import PurchaseOrders from "../Content/PurchaseOrders";
import IncomeSources from "../Content/IncomeSources";
import HabitTracker from "../Content/HabitTracker";
import HabitTrackerDetails from '../Content/HabitTrackerDetails';
import Account from '../Content/Account';
export default function Paths() {
    return (
        <BrowserRouter>
            {/* <Background/> */}
            <NavComponent />
            <Routes>
                <Route path="/htmls" element={<TimeSheet />} />
                <Route path="/" element={<TimeSheet />} />
                <Route path="time-sheet" element={<TimeSheet />} />
                <Route path="/all-categories" element={<Categories />} />
                <Route path="/time-sheet-detailes" element={<TimeSheetDetails />} />
                <Route path="purchase-orders" element={<PurchaseOrders />} />
                <Route path="income-sources" element={<IncomeSources />} />
                <Route path="habits-tracker" element={<HabitTracker />} />
                <Route path="/habits-tracker-details" element={<HabitTrackerDetails />} />
                <Route path="account" element={<Account />} />
            </Routes>
        </BrowserRouter>
    )
}
