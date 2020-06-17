$(document).ready(function () {

    
    $("#add").on("submit", async () => {
        
        event.preventDefault();
        let id = $("button").attr("data-id");
        let date = $("#dateInput");
        let amount = $("#amountInput");
        let storeName = $("#storeName");
        
    let newTransaction = {
        userId: id,
        date: date.val(),
        amount: amount.val(),
        shop_name: storeName.val()
    }
        console.log(newTransaction);
        const doStuff = await doAjax(newTransaction);
    
        window.location.replace("/");
    
    })
    
     async function doAjax(object) {
    
            let result;
            try {
                result = await $.ajax({
                    url: "/api/transactions",
                    type: "POST",
                    data: object
                })
    
            } catch (error) {
                console.log(error)
            }
        }
    
    })