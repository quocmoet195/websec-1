const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operator = document.getElementById("operator");
const btn = document.getElementById("calculate");

const wrapA = document.getElementById("wrapA");
const wrapB = document.getElementById("wrapB");
const msgA = document.getElementById("msgA");
const msgB = document.getElementById("msgB");
const results = document.getElementById("results");

let history = [];
const MAX_HISTORY = 8;

function parseNumber(value){
    const v = value.trim().replace(",", ".");
    if(v === "") 
        return {ok:false, error:"Пустое поле"};

    const regex = /^-?\d+(\.\d+)?$/;
    if(!regex.test(v)) 
        return {ok:false, error:"Неверный формат"};

    return {ok:true, value:Number(v)};
}

function setError(wrapper, msgElement, message){
    wrapper.classList.add("error");
    msgElement.textContent = message;
}

function clearError(wrapper, msgElement){
    wrapper.classList.remove("error");
    msgElement.textContent = "";
}

function render(){
    results.innerHTML = "";
    history.forEach((item, index)=>{
        const div = document.createElement("div");
        div.textContent = item;
        if(index < history.length-1){
            div.classList.add("old");
        }
        results.appendChild(div);
    });
}

function calculate(){
    clearError(wrapA, msgA);
    clearError(wrapB, msgB);

    const A = parseNumber(numA.value);
    const B = parseNumber(numB.value);

    let valid = true;

    if(!A.ok){
        setError(wrapA, msgA, A.error);
        valid = false;
    }

    if(!B.ok){
        setError(wrapB, msgB, B.error);
        valid = false;
    }

    if(!valid) return;

    if(operator.value === "/" && B.value === 0){
        setError(wrapB, msgB, "Деление на ноль");
        return;
    }

    let result;

    switch(operator.value){
        case "+": result = A.value + B.value; break;
        case "-": result = A.value - B.value; break;
        case "*": result = A.value * B.value; break;
        case "/": result = A.value / B.value; break;
    }

    const line = `${A.value} ${operator.value} ${B.value} = ${result}`;
    history.push(line);

    if(history.length > MAX_HISTORY){
        history.shift();
    }

    render();
}

btn.addEventListener("click", calculate);

[numA, numB].forEach(input=>{
    input.addEventListener("keydown", e=>{
        if(e.key === "Enter") calculate();
    });
});