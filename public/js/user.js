$(document).ready(function () {




    async function doAjax(object) {

        let result;
        try {
            result = await $.ajax({
                url: "",
                type: "POST",
                data: object
            })

        } catch (error) {
            console.log(error)
        }
    }



})