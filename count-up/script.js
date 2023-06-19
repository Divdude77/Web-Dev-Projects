const colors = [
    ['#FF7D91','#e05f72'],
    ['#edba97','#daa079'],
    ['#92daba','#79c1a0'],
    ['#6FC2EC','#58add8'],
    ['#A2AAFF','#7f88e8'],
    ['#C2BCE0','#aea8d7'],
    ['#252525','#3e3e3e']
]

window.onload = () => {
    facts = updateTime(true);
    document.querySelector("#fact").innerHTML = facts[Math.floor(Math.random() * 4)];
    color = colors[Math.floor(Math.random() * 7)]
    document.querySelector("html").style.backgroundColor = color[0];
    document.querySelector("html").innerHTML += "<div class='heart'></div>".repeat(70);
    hearts = document.querySelectorAll(".heart");
    left = 2;
    top = -10;
    for (i = 0; i < hearts.length; i++) {
       hearts[i].style.backgroundColor = color[1];
    
       if (Math.floor(Math.random() * 2)) {
        hearts[i].style.transform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
       }
       else {
        hearts[i].style.transform = "rotate(" + Math.floor(Math.random() * 360) + "deg)";
       }

       hearts[i].style.left = left + "%";
       if (left > 100) {
        left = 0;
       }
       else {
        left += Math.floor(3 + Math.random() * 5);
       }
       hearts[i].style.top = (-10 + Math.floor( Math.random() * -150)) + "%";
       if (Math.floor(Math.random() * 3) == 2) {
            hearts[i].style.zIndex = 2;
       }
    }
}

function updateTime(facts) {
    // Calculate the time elapsed in seconds, minutes, hours, days, months, and years
    const itBegan = new Date("2022-12-20T05:07:00Z");
    const currentDate = new Date();

    currentDate.setMinutes(currentDate.getMinutes() - itBegan.getMinutes());
    currentDate.setHours(currentDate.getHours() - itBegan.getHours());
    currentDate.setDate(currentDate.getDate() - itBegan.getDate());
    currentDate.setMonth(currentDate.getMonth() - itBegan.getMonth());
    currentDate.setFullYear(currentDate.getFullYear() - itBegan.getFullYear());

    s = currentDate.getSeconds();
    m = currentDate.getMinutes();
    h = currentDate.getHours();
    d = currentDate.getDate();
    mt = currentDate.getMonth();
    y = currentDate.getFullYear();

    if (s < 10) {
        document.querySelector("#secondsVal").innerHTML = "<span>0</span>" + s.toString();
    }
    else {
        document.querySelector("#secondsVal").innerHTML = s.toString();
    }

    if (m < 10) {
        document.querySelector("#minutesVal").innerHTML = "<span>0</span>" + m.toString();
    }
    else {
        document.querySelector("#minutesVal").innerHTML = m.toString();
    }

    if (h < 10) {
        document.querySelector("#hoursVal").innerHTML = "<span>0</span>" + h.toString();
    }
    else {
        document.querySelector("#hoursVal").innerHTML = h.toString();
    }

    if (d < 10) {
        document.querySelector("#daysVal").innerHTML = "<span>0</span>" + d.toString();
    }
    else {
        document.querySelector("#daysVal").innerHTML = d.toString();
    }

    if (mt < 10) {
        document.querySelector("#monthsVal").innerHTML = "<span>0</span>" + mt.toString();
    }
    else {
        document.querySelector("#monthsVal").innerHTML = mt.toString();
    }

    if (y > 0) {
        document.querySelector("#years").classList.remove("not-yet");
        document.querySelector("#yearsColon").classList.remove("not-yet");
        document.querySelector("#yearsVal").innerHTML = y;
        document.querySelector("#clock").style.setProperty('--number-size', '11vmax');
    }
    else {
        document.querySelector("#years").classList.add("not-yet");
        document.querySelector("#yearsColon").classList.add("not-yet");
        document.querySelector("#clock").style.setProperty('--number-size', '12vmax');
    }

    if (facts) {
        return [
            "I hope this counter eventually runs out of space.",
            "That's " + (365 * y + 30 * mt + d).toString() + " days! 😲",
            "🍝",
            "❤️❤️❤️"
        ]
    }
}

setInterval(updateTime, 1000);
