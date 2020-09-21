
(()=>{
    $(()=>{
        $(".login_btn").click(()=>
        {
            var data = 
            {
                "id" : document.getElementsByName("id")[0].value,
                "pw" : document.getElementsByName("pw")[0].value
            };
            sendAjax("http://localhost:3000/login",data);
            
        
        });

        
        var sendAjax = (url, inputData)=>
        {
           $.ajax({
            type : "POST",
            url : url,
            data : 
            {
                "id" : inputData.id,
                "pw" : inputData.pw
            },
            success: (json)=>
            {   
                if(json.id) location.href = "/";
                else
                {
                    $(".error").empty();
                    $(".error").append(json);
                }
            },
            error : (err)=>
            {
                alert(err);
            }
           });
        
        };
        
        
        
    })
})();