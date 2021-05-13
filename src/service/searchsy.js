import axios from 'axios';

const apiURL = "https://api.telebourse.ir/api/v1/symbols/"
class Searchs {
    Searchs (symbol) {
        return axios.get(apiURL + "search?query=" + symbol + "&per_page=10&exact=true")
    }
}
export default new Searchs()