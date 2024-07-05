    function processData(data){
      
        let cotizacion = parseInt(data.blue.value_sell);

        document.querySelectorAll("#mercadoblue").forEach(e => e.remove());
      
        const amounts = document.querySelectorAll("span.andes-money-amount");

        amounts.forEach(am => {
            
            const nodecount = am.childNodes.length;

            debugger;

            var currencySymbol = nodecount> 2 ? 1 : 0;
            var priceTag =  nodecount> 2 ? 2 : 1;

            if(am.childNodes[currencySymbol].innerHTML !== '$'){
                let price = parseFloat(am.childNodes[priceTag].innerHTML.replaceAll(".",""));

                var value = cotizacion*price;
                var result = value.toLocaleString('es-ar', {
                    style: 'currency',
                    currency: 'ARS'
                }).replace(",00","");

                am.parentElement.parentElement.parentElement.insertAdjacentHTML('beforeend', `<span id="mercadoblue" style="color:blue; font-size:20px!important">MB: ${result} </span>`);
            } else {
                let price = Number(am.childNodes[priceTag].innerHTML.replaceAll(".",""));

                var value = price/cotizacion;

                var result = Math.round(value).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).replace(".00", "").replace("$", "U$D ");

                
                am.parentElement.parentElement.parentElement.insertAdjacentHTML('beforeend', `<span id="mercadoblue" style="color:green; font-size:20px!important">MB: ${result} </span>`);
            }
                
        });
    }


    chrome.action.onClicked.addListener((tab) => {

        fetch('https://api.bluelytics.com.ar/v2/latest')
        .then((response) => response.json())
        .then((data) => {
            if(tab.url.includes("mercadolibre.com.ar")) {
                chrome.scripting.executeScript({
                    target : {tabId : tab.id},
                    func : processData,
                    args : [ data ],
                });
            }
        });
    });
