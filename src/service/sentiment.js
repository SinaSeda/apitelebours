import axios from 'axios';

// https://api.telebourse.ir/api/v1/sentiments?symbol=1&from=2020-12-19&to=2020-12-29
const apiURL = "https://api.telebourse.ir/api/v1/sentiments?"
class Sentiment {
    Sentiment (symbolId , dateFrom , dateTo) {
        return axios.get(apiURL + "symbol=" + symbolId + "&from=" + dateFrom + "&to=" + dateTo)
    }
}
export default new Sentiment()