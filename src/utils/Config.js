
const production = true;
const protocol   = production ? `https://`                   : `http://`;
const domain     = production ? `gistoneer.com`              : `localhost:3000`;
const api        = production ? `${protocol}${domain}/api`   : `${protocol}${domain}`;
const files      = production ? `${protocol}${domain}/files` : `${protocol}${domain}`;

export default {
    production  : production,
    gen_cover   : Math.floor(Math.random() * 12),
    cover_range : 12,
    API         : {
        URL : api
    },
    FILES       : {
        URL    : files,
        TEMP   : files+'/temp',
        ALBUMS : files+'/albums',
        AVATAR : files+'/avatar',
        COVER  : files+'/cover'
    },
    firebase: {
        apiKey: "AIzaSyDTkXyviM3aM8O6-qKmJIPUZm9f_RcS9qE",
        authDomain: "gistoneer-web.firebaseapp.com",
        databaseURL: "https://gistoneer-web.firebaseio.com",
        projectId: "gistoneer-web",
        storageBucket: "gistoneer-web.appspot.com",
        messagingSenderId: "199084434196",
        appId: "1:199084434196:web:d3bea2e9a74ca9df18d801",
        measurementId: "G-7XP05LE3FH"
    }
}