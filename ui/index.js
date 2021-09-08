class clsApp {
    constructor() { }
    serverRequest(url, data, type = 'get') {
        return new Promise ( async (response, reject) => {
            var xhr = new XMLHttpRequest();

            xhr.open(type, url);
            xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
            xhr.onreadystatechange = () => {
                if ( xhr.readyState == 4 && xhr.status == 200 ) {
                    response(xhr.responseText);
                }
            };

            xhr.send(JSON.stringify(data));
        })
    }
    async getData(toFilter) {
        let resp = await this.serverRequest("/filter", toFilter, 'post');
        return new Promise( (_try, _catch) => {
            try { _try(resp) }
            catch(exc) { _catch(exc) }
        })
    }
}

const APP = new clsApp()

const printResult = (list) => {
    let htmlResult = `<h2 class="centered">Not data found!</h2>`;
    
    if ( list.length > 0 ) {
        htmlResult = `<table class="highlight">
                            <thead>
                                <tr class="centered">
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Height Meters</th>
                                    <th>Height Inches</th>
                                </tr>
                            </thead>
                            <tbody>
                        `;

        list.forEach(row => {
            htmlResult += ` <tr>
                                <td>${row.first_name}</td>
                                <td>${row.last_name}</td>
                                <td>${row.h_meters}</td>
                                <td>${row.h_in}</td>
                            </tr>`
        });

        htmlResult += "</tbody></table>";
    }
    
    document.getElementById("result").innerHTML = htmlResult;
}

const getDataHandlerClick = async () => {
    let data, arg;

    arg = document.getElementById("toFilter").value;
    document.getElementById("result").innerHTML = ""

    if ( arg.length > 0 && !isNaN(arg) ) {
        data = APP.getData({
            toFilter: arg
        })
                .then( (res) => {
                    var list = JSON.parse(res);
                    printResult(list.values);
                })
                .catch( (err) => { console.log(`error -> ${err}`); } );
    }
}