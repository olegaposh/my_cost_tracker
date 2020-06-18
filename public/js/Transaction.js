$(document).ready(function () {

    const populateForm = async () => {
        let id = $("#editButton").attr("data-id");
        let userId = $("#editButton").attr("data-user");
        transaction = await getTran(userId, id);
        transaction = transaction[0];
        $("#dateInput").attr("placeholder", transaction.date);
        $("#amountInput").attr("placeholder", transaction.amount);
        $("#storeName").attr("placeholder", transaction.shop_name);
    }

    if (top.location.pathname === '/editTransaction') {
        populateForm();
    }




    $("#add").on("submit", async () => {

        event.preventDefault();
        let id = $("#addButton").attr("data-id");
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
        const doStuff = await createTran(newTransaction);

        window.location.replace("/");

    })

    $("#edit").on("submit", async () => {

        event.preventDefault();
        let id = $("#editButton").attr("data-id");
        let userId = $("#editButton").attr("data-user");
        let date = $("#dateInput");
        let amount = $("#amountInput");
        let storeName = $("#storeName");

        let newTransaction = {
            userId: userId,
            date: date.val(),
            amount: amount.val(),
            shop_name: storeName.val()
        }
        console.log(newTransaction);
        const doStuff = await editTran(id, newTransaction);

        window.location.replace("/");

    })

    $(".deleteButton").on("click", async () => {
        event.preventDefault();
        let id = $(event.target).attr("data-id");
        const deleteStuff = await deleteTran(id);

        if (deleteStuff) {
            window.location.replace("/");
        }
    })

    // GET AJAX
    async function getTran(userId, tranId) {
        let result;
        try {
            result = await $.ajax({
                url: "/api/user/" + userId + "/transaction?tranId=" + tranId,
                type: "GET"
            })
            return result;

        } catch (error) {
            console.log(error)
        }
    }

    //CREATE AJAX
    async function createTran(object) {

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

    //EDIT AJAX
    async function editTran(id, object) {

        let result;
        try {
            result = await $.ajax({
                url: "/api/user/transaction/" + id,
                type: "PUT",
                data: object
            })

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteTran(id) {

        let result;
        try {
            result = await $.ajax({
                url: "/api/user/transaction/" + id,
                type: "DELETE"
            })
            return result;

        } catch (error) {
            console.log(error)
        }
    }


})