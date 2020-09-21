
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
                "agreement_02" : $("input[name='agreement_02']:checked").val()
            };

            sendAjax("http://localhost:3000/join", data);

        })

        var sendAjax = (url, inputData)=>
        {
           $.ajax({
            type : "POST",
            url : url,
            data : inputData, // 왜 JSON.stringify로 하면 안되는지?
            success:(json)=>
            {
                if(json.id)
                {
                    location.href="/";
                }
                $(".error").empty();
                $(".error").append(json);
            } 
           });

        }

    });
})();