import { combineReducers } from "redux";

import Profile from "./Profile";
import Self from "./Self";
import Home from "./Home";
import Status from "../reducers/Status";
import People from "../reducers/People";
import Album from "../reducers/Album";
import Notifications from "../reducers/Notifications";
import Search from "../reducers/Search";
import Suggestions from "../reducers/Suggestions";
import Player from "../reducers/Player";

export default combineReducers({ 
    people        : People,
    profile       : Profile, 
    home          : Home,
    status        : Status,
    self          : Self,
    album         : Album,
    player        : Player,
    notifications : Notifications,
    search        : Search,
    suggestions   : Suggestions
});
