import axios from 'axios';

const apiURL = "https://teleport.telebourse.ir/api/v1.0/trends_history?"
class Trends {
    Trends (dateFrom , dateTo , threshold) {
        return axios.get(apiURL + "from=" + dateFrom + "&to=" + dateTo + "&threshold=" + threshold)
    }
}
export default new Trends()