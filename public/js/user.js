$(document).ready(function () {

let date = $("#dateInput");
let amount = $("#amountInput");
let storeName = $("#storeName");

let newTransaction = {
   
    date: date.val(),
    amount: amount.val(),
    shop_name: storeName.val()
}

$("#add").on("submit", async () => {

    event.preventDefault();
    let date = $("#dateInput");
let amount = $("#amountInput");
let storeName = $("#storeName");

let newTransaction = {
   
    date: date.val(),
    amount: amount.val(),
    shop_name: storeName.val()
}
    console.log(newTransaction);
    const doStuff = await doAjax(newTransaction);

    window.location = "/";

})

 async function doAjax(object) {

        let result;
        try {
            result = await $.ajax({
                url: "/api/transactions/1",
                type: "POST",
                data: object
            })

        } catch (error) {
            console.log(error)
        }
    }

})