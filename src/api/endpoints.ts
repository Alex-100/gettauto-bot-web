const apiUrl = process.env.REACT_APP_API_URL;
const Endpoints = {
    REFERENCES: {
        MODEL: `${apiUrl}/api/references/models`,
        GEOPOINT: `${apiUrl}/api/references/geo`
    },
    BOT:{
        CONTROLLER:{
            ADD: `${apiUrl}/api/history/add`,
            GET: `${apiUrl}/api/history/get`,
            COUNT: `${apiUrl}/api/history/count`,
        }
    }
}

export default Endpoints;