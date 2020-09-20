
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
            /*
            var data = JSON.stringify(inputData);
            
            var xhr = new XMLHttpRequest;
            xhr.open("POST",url);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(data);

            xhr.addEventListener("load", ()=>
            {
                var msg = JSON.parse(xhr.responseText);
                if(msg.id)
                {
                    window.location.href="/";
                }
                else
                {
                    document.querySelector(".error").innerHTML = msg;    
                }
                
                
            });
            */

           $.ajax({
            type : "POST",
            url : "/login",
            data : JSON.stringify(inputData),
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