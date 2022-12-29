var mouseover = false;
var rgbOn = false;
var themes = {
    "cottoncandy": {
        "--bg-color": "#041B2D",        // Background Color
        "--calc-main": "#004E9A",        // Main Calculator Color
        "--screen": "#428CD4",        // Screen Color
        "--ops": "#FF9CDA",        // Operator buttons color
        "--result": "#EA4492",        // Result Buttons Color
        "--font-main": "#FFFFFF",        // Main Font Color
        "--font-upper": "#C2C2C2",         // Secondary Font Color
        "--themes-button": "#FFFFFF" // Themes Button
    },

    "beach": {
        "--bg-color": "#D3E7EE",        // Background Color
        "--calc-main": "#ECD59F",        // Main Calculator Color
        "--screen": "#7097A8",        // Screen Color
        "--ops": "#ABD1DC",        // Operator buttons color
        "--result": "#C6A477",        // Result Buttons Color
        "--font-main": "#FFFFFF",        // Main Font Color
        "--font-upper": "#C2C2C2",      // Secondary Font Color
        "--themes-button": "var(--screen)" // Themes Button
    },

    "sky": {
        "--bg-color": "#015C92",        // Background Color
        "--calc-main": "#2D82B5",        // Main Calculator Color
        "--screen": "#88CDF6",        // Screen Color
        "--ops": "#72B1D4",        // Operator buttons color
        "--result": "#296CA0",        // Result Buttons Color
        "--font-main": "#FFFFFF",        // Main Font Color
        "--font-upper": "#9C9C9C",         // Secondary Font Color
        "--themes-button": "#FFFFFF" // Themes Button
    },

    "matrix": {
        "--bg-color": "#000000",        // Background Color
        "--calc-main": "var(--bg-color)",        // Main Calculator Color
        "--screen": "var(--bg-color)",        // Screen Color
        "--ops": "var(--bg-color)",        // Operator buttons color
        "--result": "var(--bg-color)",        // Result Buttons Color
        "--font-main": "#1aff00",        // Main Font Color
        "--font-upper": "#249c00",      // Secondary Font Color
        "--themes-button": "var(--font-main)" // Themes Button
    },

    "pastel": {    
        "--bg-color": "#fef7d8",        // Background Color
        "--calc-main": "#d4f5fe",        // Main Calculator Color
        "--screen": "#e3dbfc",        // Screen Color
        "--ops": "#d3fded",        // Operator buttons color
        "--result": "#f9dcdb",        // Result Buttons Color
        "--font-main": "#778899",        // Main Font Color
        "--font-upper": "#C2C2C2",      // Secondary Font Color
        "--themes-button": "var(--font-main)" // Themes Button
    },


    "apple": {
        "--bg-color": "#FFFFFF",        // Background Color
        "--calc-main": "#333333",        // Main Calculator Color
        "--screen": "#2b2d2f",        // Screen Color
        "--ops": "#a6a6a6",        // Operator buttons color
        "--result": "#f19b37",        // Result Buttons Color
        "--font-main": "#FFFFFF",        // Main Font Color
        "--font-upper": "#9C9C9C",      // Secondary Font Color
        "--themes-button": "var(--result)" // Themes Button
    },

    "slate": {
        "--bg-color": "#CDCDCD",        // Background Color
        "--calc-main": "#141414",        // Main Calculator Color
        "--screen": "#A9A9A9",        // Screen Color
        "--ops": "#808080",        // Operator buttons color
        "--result": "#676767",        // Result Buttons Color
        "--font-main": "#FFFFFF",        // Main Font Color
        "--font-upper": "#777777",      // Secondary Font Color
        "--themes-button": "var(--calc-main)" // Themes Button
    },

    "uno": {        
        "--bg-color": "#222222",        // Background Color
        "--calc-main": "#D72600",        // Main Calculator Color
        "--screen": "#0956BF",        // Screen Color
        "--ops": "#379711",        // Operator buttons color
        "--result": "#ECD407",        // Result Buttons Color
        "--font-main": "#FFFFFF",        // Main Font Color
        "--font-upper": "#C2C2C2",      // Secondary Font Color
        "--themes-button": "#FFFFFF" // Themes Button
    },

    "rgb": {
        "--bg-color": "#0f0f0f",
        "--calc-main": "#000000",        // Main Calculator Color
        "--screen": "var(--calc-main)",        // Screen Color
        "--ops": "var(--calc-main)",        // Operator buttons color
        "--result": "var(--calc-main)",        // Result Buttons Color
        "--themes-button": "#000000" // Themes Button
    },

    "white": {
        "--bg-color": "#FFFFFF",        // Background Color
        "--calc-main": "var(--bg-color)",        // Main Calculator Color
        "--screen": "var(--bg-color)",        // Screen Color
        "--ops": "var(--bg-color)",        // Operator buttons color
        "--result": "var(--bg-color)",        // Result Buttons Color
        "--font-main": "#000000",        // Main Font Color
        "--font-upper": "#9C9C9C",      // Secondary Font Color
        "--themes-button": "#000000" // Themes Button
    },

    "black": {
        "--bg-color": "#000000",        // Background Color
        "--calc-main": "var(--bg-color)",        // Main Calculator Color
        "--screen": "var(--bg-color)",        // Screen Color
        "--ops": "var(--bg-color)",        // Operator buttons color
        "--result": "var(--bg-color)",        // Result Buttons Color
        "--font-main": "#FFFFFF",        // Main Font Color
        "--font-upper": "#9C9C9C",      // Secondary Font Color
        "--themes-button": "#FFFFFF" // Themes Button
    }
};

function addValue(value) {
    if (document.querySelector("#main-content").textContent === "Error") {
        document.querySelector("#main-content").textContent = "0";     // Clearing screen if error was shown previously
    }
    currentContent = document.querySelector("#main-content").textContent;
    if (["×","÷","+","-"].includes(value) && ["", "×", "÷", "-", "+", "."].includes(currentContent.slice(-1))) {value=""} // Operators at start of number or decimal
    if (currentContent.slice(-1) == "0" && ["","×", "÷", "-", "+"].includes(currentContent.slice(-2,-1)) && !(["×", "÷", "-", "+", "."].includes(value))) {    // If the first digit of the number is zero, removing it
        document.querySelector("#main-content").textContent = currentContent.slice(0,-1);
    };
    var currentNum = currentContent.split('').reverse().join('');
    if (value === "." && currentNum.slice(0, currentNum.search(/[-+×÷]/)).includes(value)) {value=""} // Not adding more than one decimal
    document.querySelector("#main-content").textContent += value;
}

function compute() {
    value = document.querySelector("#main-content").textContent;
    document.querySelector("#upper-content").textContent = value;
    value = value.replace("×","*").replace("÷","/").replace("∞","Infinity");
    res = eval(value);
    if (res === Infinity) {
        res = "&infin;"
    }
    else if (isNaN(res)) {
        res = "Error"
    };
    document.querySelector("#main-content").innerHTML = res;
}

function del() {
    document.querySelector('#main-content').textContent = document.querySelector('#main-content').textContent.slice(0,-1);
    if (["","Erro"].includes(document.querySelector('#main-content').textContent)) {
        document.querySelector('#main-content').textContent = "0";
    };
}

function allClear() {
    document.querySelector('#main-content').textContent = '0'; 
    document.querySelector('#upper-content').textContent = '0';
}

function showThemesMenu() {
    document.querySelector('#themes-menu').style.visibility = 'visible'; 
    document.querySelector('#themes-btn').classList.toggle('menu-active'); 
    document.querySelector("#themes-menu").style.height = window.innerHeight;
}

function closeThemesMenu() {
    if (!mouseover) {             // Close menu if clicked outside of menu
        document.querySelector('#themes-menu').style.visibility = 'hidden'; 
        document.querySelector('#custom-theme').style.visibility = 'hidden';
        document.querySelector('#themes-btn').classList.remove('menu-active');
    };
}

function changeTheme(theme) {
    if (rgbOn) {
        toggleRGB();
        rgbOn = false;
    };
    vars = document.querySelector("html");
    for (i in themes[theme]) {
        vars.style.setProperty(i, themes[theme][i]);
    };
    for (i of document.querySelectorAll(".theme")) {
        i.classList.remove("active");
    };
    document.querySelector("#"+theme).classList.toggle("active");
    if (theme == "rgb") {
        toggleRGB();
    };
}

function toggleRGB() {
    document.querySelector('#calculator-grid').classList.toggle("rgb");
    document.querySelector('#main-content').classList.toggle("rgb");
    document.querySelector('#upper-content').classList.toggle("rgb");
    document.querySelector('#themes-btn').classList.toggle("rgb");
    rgbOn = true;
}

function showCustomThemeMenu() {
    colors = getComputedStyle(document.querySelector("html"));
    document.querySelector('#custom-theme').style.visibility = 'visible';
    for (i of Object.keys(themes.apple)) {
        document.querySelector("#" + i.slice(1)).value = colors.getPropertyValue(i);
    };
}

function setCustomTheme() {
    vars = document.querySelector("html");
    for (i of Object.keys(themes.apple)) {
        vars.style.setProperty(i, document.querySelector("#" + i.slice(1)).value);
    };
    for (i of document.querySelectorAll(".theme")) {
        i.classList.remove("active");
    };
    document.querySelector("#custom").classList.toggle("active");
}

// Load a random theme on page load
document.addEventListener("DOMContentLoaded",
    function(event) {
        var randTheme = Object.keys(themes)[Math.floor(Math.random() * Object.keys(themes).length)];
        changeTheme(randTheme);
    }
);