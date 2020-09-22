
(()=>{
    $(()=>{
        $(".login_btn").click(()=>
        {
            alert("Login Button Click");
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
            data :  inputData, 
           
            success: (json)=>
            {   
                if(json.id) location.href = "/";
                else
                {
                    $(".error").empty();
                    $(".error").append(json);
                }
            }
           });
        
        };
        
        
        
    })
})();