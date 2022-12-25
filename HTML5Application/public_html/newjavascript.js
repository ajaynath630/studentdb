/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* global JQuery */

var conToken="90938330|-31949271859893389|90952407";
var dbname="studentdb";
var dbrel="stu-rel";
var jspdbBaseurl="http://api.login2explore.com:5577";
var jspdbIml="/api/iml";
var jspdbIrl="/api/irl";
        
$("#roll").focus("");


function resetForm() {
    
    $("#roll").val("");
    $("#name").val("");
    $("#class").val("");
    $("#address").val("");
    $("#dob").val("");
    $("#enrolldate").val("");
    $("#roll").prop("disabled",false);
    $("#name").prop("disabled",true);
    $("#class").prop("disabled",true);
    $("#address").prop("disabled",true);
    $("#dob").prop("disabled",true);
    $("#enrolldate").prop("disabled",true);
     $("#roll").focus("");
}



function validatedata() {
    
    var roll,name,clas,address,dob,enroldate;
    
    roll=$("#roll").val();
    
    name=$("#name").val();
     clas=$("#class").val();
     address= $("#address").val();
     dob=$("#dob").val();
     enroldate=$("#enrolldate").val();
     
     if(roll==="") {
         alert("roll num is missing");
         ("roll").focus();
         return "";
     }
     
     if(name==="") {
         alert("name is missing");
         ("name").focus();
         return "";
     }
     
     if(clas==="") {
         alert("class is missing");
         ("class").focus();
         return "";
     }
     
     if(address==="") {
         alert("address is missing");
         ("address").focus();
         return "";
     }
     
     if(dob==="") {
         alert("dob missing");
         ("dob").focus();
         return "";
     }
     
     if(enroldate==="") {
         alert("enrollment is missing");
         ("enrolldate").focus();
         return "";
     }
     
     var jsonstr={ 
         
         rollno:roll,
         name:name,
         class:clas,
         address:address,
         dob:dob,
         enrolldate:enroldate
         
     };
      
    return JSON.stringyfy(jsonstr);
     
     
}


function saveData() {
    
    var jsonstrObj=validatedata();
    if(jsonstrObj==="") {
        return;
    }
    
    var putrequest=createPUTRequest(conToken,jsonstrObj,dbname,dbrel);
    JQuery.ajaxSetup({async:false});
    var jrespons=excuteCommandAtGivenBaseUrl(putrequest,jspdbBaseurl,jspdbIml);
    JQuery.ajaxSetup({async:false});
    resetForm();
    $("#roll").focus("");

    
}

function changeData() {
    
    
    $("change").prop("disabled",true);
    var jsonstrchg=validatedata();
    
    
    var updaterequest=createUPDATERecordRequest(conToken,jsonstrchg,dbname,dbrel,localStorage.getItem());
    JQuery.ajaxSetup({async:false});
    var jrespons=excuteCommandAtGivenBaseUrl(updaterequest,jspdbBaseurl,jspdbIml);
    JQuery.ajaxSetup({async:true});
    console.log(jrespons);
    resetForm();
    $("#roll").focus("");

    
}


fun getRollnoJson() {
    var roll=("#Roll").val();
    var jsonstr={
        roll:roll
    };
    return JSON.stringify(jsonstr);
}

function saverecordnum(jrespons) {
    var lvdata=JSON.parse(jrespons.data);
    localStorage.setItem('recno',lvdata.rec_no);
}

function filldata(jrespons) {
    saverecordnum(jsrespons);
    var record=JSON.parse(jrespons.data).record;
    $("name").val(record.name);
    $("class").val(record.class);
    $("dob").val(record.dob);
    $("address").val(record.address);
    $("enrolldate").val(record.enrolldate);
}

function getRoll() {
    
    
   var empidJsObject=getRollnoJson();
    
    var getRequest=createGET_BY_KEYRequest(conToken,dbname,dbrel,empidJsObject);
    JQuery.ajaxSetup({async:false});
    var jrespons=excuteCommandAtGivenBaseUrl(getrequest,jspdbBaseurl,jspdbIml);
    JQuery.ajaxSetup({async:false});
    
    if(jrespons.status===400) {
         ("save").prop("disabled",false);
         ("reset").prop("disabled",false);
         
         ("$name").focus();
    }
    
    else if(jrespons.status===200) {
        
        ("roll").prop("disabled",true);
        filldata(jrespons);
        
        ("change").prop("disabled",false);
        ("save").prop("disabled",false);
         ("$name").focus();
        
    }

    

}