    function processData(data){
        let cotizacion = parseInt(data.blue.value_buy);

        document.querySelectorAll("#mercadoblue").forEach(e => e.remove());
      
        const amounts = document.querySelectorAll("span.price-tag-amount");

        amounts.forEach(am => {
            if(am.childNodes[0].innerHTML !== '$'){
                let price = parseFloat(am.childNodes[1].innerHTML.replace(".", ""))

                var value = cotizacion*price;
                var result = value.toLocaleString('es-ar', {
                    style: 'currency',
                    currency: 'ARS'
                }).replace(",00","");

                am.insertAdjacentHTML('beforeend', `<br id="mercadoblue"/><span id="mercadoblue" style="color:blue; font-size:20px!important">MB: ${result} </span>`);
            } else {
                let price = Number(am.childNodes[1].innerHTML.replaceAll(".",""));

                var value = price/cotizacion;

                var result = Math.round(value).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).replace(".00", "").replace("$", "U$D ");

                
                am.insertAdjacentHTML('beforeend', `<br id="mercadoblue"/><span id="mercadoblue" style="color:green; font-size:20px!important">MB: ${result} </span>`);
            }
                
        });

    }
    
    chrome.action.onClicked.addListener((tab) => {

        fetch('https://api.bluelytics.com.ar/v2/latest')
        .then((response) => response.json())
        .then((data) => {
            if(tab.url.includes("mercadolibre.com.ar")) {
                chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: processData,
                args: [data]
                });
            }
        });
    

    });