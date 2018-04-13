$("#page-content-wrapper").css("padding","0px");
$("#menu-toggle").css("padding-left","25px");
$(window).load(function() {
	$(".loader").fadeOut("slow");
});


$("#loginbtn").click(function(){
  $(".loader").fadeIn("slow");
  var loginemail=$("#staffno").val();
  var loginpassword = $("#loginpassword").val();
  var dataString="username="+loginemail+"&password="+loginpassword;

  $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"staffdata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ $("#logintbtn").val('Validationg...');},
    success: function(data){
      var arr = JSON.parse(data);

      if(arr.d.length >0){

        localStorage.setItem("username", arr.d[0].username);
        localStorage.setItem("empname", arr.d[0].empname);
        localStorage.setItem("loginpassword", loginpassword);
        localStorage.setItem("stat", arr.d[0].stat);
        var cstat = sessionStorage.getItem("checkboxstat");
        if(cstat == "checked")
        {

         localStorage.setItem("loginstat","rememberit");
       }

       if( arr.d[0].stat == "1")
       {
        window.location = "main.html";
      }
      else if( arr.d[0].stat == "0")
      {
        window.location = "changepassword.html";
      }


    }else{

     document.getElementById("alert").innerText = "Invalid  Password";

   }


 }
});
});


$("#changebtn").click(function(){
  $(".loader").fadeIn("slow");
  var newpasscode=$("#newpass").val();
  var cnewpasscode = $("#cnewpass").val();

  if(newpasscode == cnewpasscode)
  { 
    var dataString="uname="+localStorage.getItem("username")+"&passtext="+newpasscode;
    $.ajax({
      type: "GET",
      url:localStorage.getItem("serverpath")+"staffdata.php",
      data: dataString,
      crossDomain: true,
      cache: false,
      beforeSend: function(){ $("#changebtn").val('Validationg...');},
      success: function(data){

        $("#changebtn").val(data);
        window.setTimeout(function(){

         localStorage.removeItem("username");
         localStorage.removeItem("empname");
         localStorage.removeItem("loginpassword");
         sessionStorage.removeItem("checkboxstat");
         localStorage.setItem("loginstat","userloggedout");
         window.location.href = "home.html";

       }, 2000);
      }
    });

  }
  else
  {
   document.getElementById("alert").innerText = "Password not matched";

 }

});



function loaddata(month)
{

 loadrecord(month);
}

function loadrecord(month)
{
   //alert(month);
   var dataString="monthselected="+month+"&staffid="+localStorage.getItem("username");
   $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"staffdata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ },
    success: function(data){
     var arr = JSON.parse(data);
     if(arr.length > 0)
      document.getElementById("netsal").innerText = arr[0].net_salary;
    document.getElementById("gross").innerText = arr[0].gross;
    document.getElementById("deduct").innerText = arr[0].deduction;
    document.getElementById("lhap").innerText = arr[0].lhap;
    document.getElementById("salmonth").innerText = arr[0].sal_month;
    document.getElementById("pfbal").innerText = arr[0].pf_balance;
    document.getElementById("pfbalupto").innerText = arr[0].pf_balance_upto;
    document.getElementById("leavebal").innerText = arr[0].leave_balance;
    document.getElementById("leavebalupto").innerText = arr[0].leave_balance_upto;

  }
});
 }

 function loadmonths()
 {

  var dataString="code=month&staffid="+localStorage.getItem("username");
  $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"staffdata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ },
    success: function(data){
     var arr = JSON.parse(data);
     var options = "";
    
     for(var i =0 ;i<arr.length;i++)
     {
       $("#month").append("<option>"+arr[i].sal_month+"</option>");

     }

   }
 });
}

function loadnote()
{
    var dataString="getnote=note";
  $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"staffdata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ },
    success: function(data){
     
      $("#note").text(data);
    //document.getElementById("note").innerText = data;

   }
 });
}

$( "#month" ).change(function() {
  var month = $("#month").val(); 
  loaddata(month);
});

$("#logoutbtn").click(function(){

  localStorage.removeItem("username");
  localStorage.removeItem("empname");
  localStorage.removeItem("loginpassword");
  sessionStorage.removeItem("checkboxstat");
  localStorage.setItem("loginstat","userloggedout");
  window.location = "home.html";
});


