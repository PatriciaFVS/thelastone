document.addEventListener("DOMContentLoaded", function() {
    const reproductor = document.querySelector('.reproductor');
    const contenedorImagen = reproductor.querySelector('.contenedor-imagen');
    const informacionCancion = reproductor.querySelector('.informacion-cancion');
    const playIcon = document.getElementById('play-icon');
    const nextIcon = document.getElementById('next-icon');
    const prevIcon = document.getElementById('prev-icon');
    const volumenInput = document.querySelector('.volumen');
    const audio = new Audio();
    let cancionActualIndex = 0;
    let isPlaying = false;

    fetch('canciones.json')
        .then(response => response.json())
        .then(data => {
            const cancionActual = data[cancionActualIndex];
            contenedorImagen.querySelector('img').src = cancionActual.imagen; 
            informacionCancion.innerHTML = `
                <h2>${cancionActual.nombre_cancion}</h2>
                <p>${cancionActual.nombre_artista}</p>
            `;
            audio.src = cancionActual.ruta_cancion;

            playIcon.addEventListener('click', togglePlay);
            nextIcon.addEventListener('click', nextSong);
            prevIcon.addEventListener('click', prevSong);
            volumenInput.addEventListener('input', changeVolume);

            function togglePlay() {
                if (!isPlaying) {
                    audio.play();
                    document.getElementById('imagen-circular').style.animation = 'spin 2s infinite linear'; 
                    playIcon.textContent = 'pause_circle';
                    isPlaying = true;
                } else {
                    audio.pause();
                    document.getElementById('imagen-circular').style.animation = ''; 
                    playIcon.textContent = 'play_circle';
                    isPlaying = false;
                }
            }

            function nextSong() {
                cancionActualIndex = (cancionActualIndex + 1) % data.length;
                loadSong();
            }

            function prevSong() {
                cancionActualIndex = (cancionActualIndex - 1 + data.length) % data.length;
                loadSong();
            }

            function loadSong() {
                const cancionActual = data[cancionActualIndex];
                contenedorImagen.querySelector('img').src = cancionActual.imagen;
                informacionCancion.innerHTML = `
                    <h2>${cancionActual.nombre_cancion}</h2>
                    <p>${cancionActual.nombre_artista}</p>
                `;
                audio.src = cancionActual.ruta_cancion;
                audio.play();
                document.getElementById('imagen-circular').style.animation = 'spin 2s infinite linear'; 
                playIcon.textContent = 'pause_circle';
                isPlaying = true;
            }

            function changeVolume() {
                audio.volume = volumenInput.value / 100;
            }
        });
});
