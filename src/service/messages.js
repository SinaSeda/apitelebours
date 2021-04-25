import axios from 'axios';

const apiURL = "https://api.telebourse.ir/api/v1/telegram/stats?format=day&"
class Messages {
    Messages (dateFrom , dateTo , symbolId) {
        return axios.get(apiURL + "from=" + dateFrom + "%2014:53:05&to=" + dateTo + "%2014:53:05&symbol_ids[]=" + symbolId)
    }
}
export default new Messages()