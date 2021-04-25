import axios from 'axios';
// ' https://telebourse.ir/api/v1/symbols/' + symbolId + '/trades?from=' + dateFrom + '%2000:00:00&to=' + dateTo + '%2000:00:00&format=day'
const apiURL = "https://telebourse.ir/api/v1/"
class Prices {
    Prices (symbolId , dateFrom , dateTo) {
        return axios.get(apiURL + "symbols/=" + symbolId + "/trades?from=" + dateFrom + "%2000:00:00&to=" + dateTo + "%2000:00:00&format=day")
    }
}
export default new Prices()