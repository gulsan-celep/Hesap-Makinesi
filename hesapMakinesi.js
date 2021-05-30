$(function(){ 
    var result = 0;
    var prevEntry = [];
    var currentEntry = [];
    var operator = null;
    
    function showResult(input){
        $("#viewResult").attr("value", input);
    }

    function factorial(n) {
        if (n < 0) return 0;
        if (n < 2) return 1;
        return n * factorial(n - 1);
    }

    function calculate(number, number2){
        switch (operator)
        {
        case "+":
            result = number + number2;
            break;
        case "-":
            result = number - number2;
            break;
        case "/": 
            result = number / number2;
            break;
        case "*": 
            result = number * number2;
            break;
        case "mod": 
            result = number % number2;
            break;
        case "x^": 
            result = Math.pow(number,number2);
            break;
        }
    }
    
    function check(){
        if(operator === null && currentEntry.length > 0){
            result = currentEntry.join("");
        }
        if(currentEntry[0] === "."){
            result = 0;
        } 
        if(operator === "/" && currentEntry.join("") === "0" && prevEntry.join("") === "0"){
            result = "Sonuç tanımsız";
        }
        if(operator === "/" && currentEntry.join("") === "0"){
            result = "Sıfıra bölünemez";
        }
    }

    $("#resetAll").click(function(){
        showResult(0);
        result = 0;
        currentEntry = [];
        prevEntry = [];
        operator = null;
    });

    $(".btnNumber, .btnDot").on('click',function(){
        currentEntry.push($(this).html());
        showResult(currentEntry.join(""));
    });

    $(".btnPi").on('click',function(){
        currentEntry.push("3.14");
        showResult(currentEntry.join(""));
    });
    
    $("#deleteInOrder").click(function(){
        if(currentEntry.length > 1){
            currentEntry.pop();
            showResult(currentEntry.join(""));
        }else{
            showResult(0);
        }
    });
    
    $(".btnOperation").click(function(){
        if(currentEntry.length > 0){
            prevEntry = currentEntry;
            currentEntry = [];
        }else{
            prevEntry.push(0);
            currentEntry.push(0);
        }
        operator = $(this).html();
        showResult(prevEntry.join("") + operator);
    });
       
    $("#calculateTheResult").click(function(){

        check();
        if(result === "Sonuç tanımsız" || result === "Sıfıra bölünemez"){
            showResult(result);
            result = 0;
        }
        else{
            calculate(parseFloat(prevEntry.join("")), parseFloat(currentEntry.join("")));
            currentEntry = [];
            prevEntry = [];
            operator = null;
            currentEntry.push(result);
            showResult(result.toLocaleString());
        }
    });
    
    $("#changeSign").click(function(){
        var temp = currentEntry.join("");
        currentEntry = [];
        currentEntry.push(temp *= -1);
        showResult(currentEntry.join(""));
    });
    
    $("#squaringANumber").click(function(){
        if(currentEntry.length === 0){
            currentEntry.push(0);
        }else{
            currentEntry[currentEntry.length -1] = Math.pow(currentEntry.join(""),2);
            if(currentEntry.indexOf("-") === 0){
                currentEntry.shift();
            }
            result = currentEntry.join("");
        }
        showResult(parseFloat(result).toLocaleString());
    });
    
    $("#calculateSquare").click(function(){
        if(currentEntry.length === 0){
            currentEntry.push(0);
        }else{
            if(currentEntry.indexOf("-") === 0){
                result = "Geçersiz giriş";
                currentEntry = [];
            }
            else{
                currentEntry[currentEntry.length -1] = Math.sqrt(currentEntry.join(""));
                result = currentEntry.join("");
            }
        }
        showResult(result);
    });
       
    $("#calculateLogarithm").click(function(){

        if(currentEntry.indexOf("-") === 0 || currentEntry.length === 0 || currentEntry.join("") === "0"){
            result = "Geçersiz giriş";
            currentEntry = [];
        }
        else{
            currentEntry[currentEntry.length -1] = Math.log(currentEntry.join(""));
            result = currentEntry.join("");
        }
        showResult(result);
    });
    
    $("#absolute").click(function(){
        if(currentEntry.length === 0){
            showResult(0);
        }else{
            var temp = Math.abs(currentEntry.join(""));
            currentEntry = [];
            currentEntry[0] = temp;
            result = currentEntry.join("");
        }
        showResult(result);

    });
    
    $("#calculateCos").click(function(){
        if(currentEntry.length === 0){
            result =  Math.cos(0);
        }else{
            currentEntry[currentEntry.length -1] = Math.cos(currentEntry.join(""));
            result =  currentEntry.join("");
            showResult(result);
        }
    });
    
    $("#calculateSin").click(function(){
        if(currentEntry.length === 0){
            result =  Math.sin(0);
        }else{
            currentEntry[currentEntry.length -1] = Math.sin(currentEntry.join(""));
            result =  currentEntry.join("");
            showResult(result);
        }
    });
    
    $("#calculateTan").click(function(){
        if(currentEntry.length === 0){
            result =  Math.tan(0);
        }else{
            currentEntry[currentEntry.length -1] =  Math.tan(currentEntry.join(""));
            result =  currentEntry.join("");
            showResult(result);
        }    
    });
     
    $("#factorial").click(function(){
        if(parseFloat(currentEntry.join("")) > 170){
            result = "Taşma";
        }else{
            result = factorial(currentEntry.join(""));
            if(currentEntry.length > 0){
                currentEntry = [];
                currentEntry.push(result);
            }
        }
        showResult(result);  
    });
    
});