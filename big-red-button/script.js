function buttonPress() {
    if (!document.querySelector("#button").classList.contains("pressed")) {
        document.querySelector("#button").classList.add("pressed");
        document.querySelector("#button-shadow").classList.add("pressed-shadow");
        var clickSound = new Audio("click.mp3");
        clickSound.play();
        setTimeout(function() {
            document.querySelector("#button").classList.remove("pressed");
        document.querySelector("#button-shadow").classList.remove("pressed-shadow");
        }, 500);
    }
}

document.querySelector("#button").addEventListener("click", buttonPress);
