
(()=>
{
    $(()=>
    {
        $(".join_btn").click(()=>
        {
            var data =
            {
                "name" : $("input[name='name']").val(),
                "gender" : $("input[name='gender']:checked").val(),
                "id" : $("input[name='id']").val(),
                "pw" : $("input[name='pw']").val(),
                "email" : $("input[name='email']").val(),
                "tel" : $("input[name='tel']").val(),
                "agreement_01" : $("input[name='agreement_01']:checked").val(),
                "agreement_02" : $("input[name='agreement_02']:checked").val(),
            };

            sendAjax("http://localhost:3000/join", data);

        })

        var sendAjax = (url, inputData)=>
        {
            var data = JSON.stringify(inputData);
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(data);

            xhr.addEventListener("load", ()=>
            {
                var msg = JSON.parse(xhr.responseText);
                
                if(!msg.id)
                {
                    $(".error").empty();
                    $(".error").append(msg);
                }
                else
                {
                    window.location.href="/";
                }

            });


        }

    });
})();