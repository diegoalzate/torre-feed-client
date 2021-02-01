import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "react-thunk";

const initialState = {};

const middlware = { thunk };
