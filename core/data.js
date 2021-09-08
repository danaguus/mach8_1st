import fetch from "node-fetch";
import promise from "es6-promise";

let url = "https://mach-eight.uc.r.appspot.com";
let settings = { method: "Get" };

export default class clsData {
    constructor () { }
    async GetData(toFilter) {
        let data = undefined;

        await fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
                data = json;
            });

        var filterData = data.values.filter( row => parseInt(toFilter) <= parseInt(row.h_in) );

        data.values = filterData;

        return new Promise( _try => {
            _try(data)
        });
    }
}