import axios from 'axios';

const apiURL = "https://api.telebourse.ir/api/v1/symbols/"
class SymbolInfo {
    SymbolInfo (id) {
        return axios.get(apiURL + id)
    }
}
export default new SymbolInfo()