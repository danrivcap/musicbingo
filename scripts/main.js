(function () {

    let songs = {}
    let bombos = []
    let trackList = []
    let bomboSelected = "";

    let audio = document.getElementById("audio");
    let waitAudio = document.getElementById("waitAudio")


    let play = document.getElementById("play");
    let waitPlay = document.getElementById("waitPlay");


    let pause = document.getElementById("pause");
    let waitPause = document.getElementById("waitPause");

    let nextBtn = document.getElementById("next");

    let stopEachSong = document.getElementById("stopEachSong");
    let bomboSelect = document.getElementById("bombo");
    let trackList10 = document.getElementById("trackList10");
    let trackList20 = document.getElementById("trackList20");
    let trackList30 = document.getElementById("trackList30");
    let vinilo = document.getElementsByClassName("outerheader")[0];

    let cancion = document.getElementsByClassName("cancion")[0];
    let total = document.getElementsByClassName("total")[0];

    let currentSong = 0;

    fetch('bombo.json')
        .then(response => response.json())
        .then(cargrarBombos);


    function cargrarBombos(data) {
        songs = data;
        bombos = Object.keys(songs);

        bombos.forEach((elem, i, arr) => {
            let option = document.createElement("option");
            option.append(elem);
            option.setAttribute("value", elem)
            bomboSelect.append(option);
        })

        bomboSelected = bomboSelect.value;
        audio.src = "canciones/" + songs[bomboSelected][currentSong].src;
        cargarTrackList();
    }

    function cargarTrackList() {
        trackList = Array(songs[bomboSelected].length);
        songs[bomboSelected].forEach((elem, i, arr) => {
            let bola = elem.bola - 1;
            trackList[bola] = elem;
        })

        let ul10 = trackList10.getElementsByTagName("ul")[0];
        if (ul10 != null) {
            trackList10.removeChild(ul10);
        }
        ul10 = document.createElement("ul");

        let ul20 = trackList20.getElementsByTagName("ul")[0];
        if (ul20 != null) {
            trackList20.removeChild(ul20);
        }
        ul20 = document.createElement("ul");

        let ul30 = trackList30.getElementsByTagName("ul")[0];
        if (ul30 != null) {
            trackList30.removeChild(ul30);
        }
        ul30 = document.createElement("ul");


        trackList.forEach((elem, i, arr) => {
            let li = document.createElement("li");
            let span = document.createElement("span");
            span.textContent = elem.bola;
            span.classList.add("roundedBall")
            li.append(elem.titulo + " - " + elem.autor + " ", span);
            if (i >= 0 && i <= 9) {
                ul10.append(li)
            } else if (i >= 10 && i <= 19) {
                ul20.append(li)
            } else {
                ul30.append(li)
            }

        });
        trackList10.append(ul10);
        trackList20.append(ul20);
        trackList30.append(ul30);

        cancion.textContent = currentSong + 1;
        total.textContent = songs[bomboSelected].length;

    }

    /*
    * Pasa la siguiente canción, si llega a la última entonces vuelve a reproducir la primera
    */
    function next() {
    
        let parar = false

        if (currentSong === songs[bomboSelected].length - 1) {
            parar = true;
        } else {
            currentSong++;
        }

        audio.src = "canciones/" + songs[bomboSelected][currentSong].src;
        if (!stopEachSong.checked) {
            audio.play();
        }

        if(parar){
            audio.pause();
        }

    }

    /**
     * Cambia el juego de canciones y pone la primera canción de la lista.
    */
    function cambiarBombo() {
        bomboSelected = bomboSelect.value;
        currentSong = 0;
        if (songs[bomboSelected] != undefined) {
            audio.src = "canciones/" + songs[bomboSelected][currentSong].src;
        } else {
            audio.src = "";
        }
        cargarTrackList();

    }

    play.addEventListener("click", () => audio.play(), false);
    pause.addEventListener("click", () => audio.pause(), false);

    audio.addEventListener("playing", () => {
        play.setAttribute("disabled", "disabled")
        pause.removeAttribute("disabled")
        waitPlay.setAttribute("disabled", "disabled")

        vinilo.classList.add("spin")

        cancion.textContent = currentSong + 1;

    }, false)

    audio.addEventListener("pause", () => {
        pause.setAttribute("disabled", "disabled")
        play.removeAttribute("disabled")
        waitPlay.removeAttribute("disabled")

        vinilo.classList.remove("spin")

    }, false)


    audio.addEventListener("ended", next, false);

    bomboSelect.addEventListener("change", cambiarBombo, false);


    waitPlay.addEventListener("click", () => waitAudio.play(), false);
    waitPause.addEventListener("click", () => waitAudio.pause(), false);


    waitAudio.addEventListener("ended", () => waitAudio.play(), false);


    waitAudio.addEventListener("playing", () => {
        waitPlay.setAttribute("disabled", "disabled")
        waitPause.removeAttribute("disabled")
        play.setAttribute("disabled", "disabled")

        vinilo.classList.add("spin")

    }, false)

    waitAudio.addEventListener("pause", () => {
        waitPause.setAttribute("disabled", "disabled")
        waitPlay.removeAttribute("disabled")
        play.removeAttribute("disabled")

        vinilo.classList.remove("spin")

    }, false)

    nextBtn.addEventListener("click",next,false);


})()