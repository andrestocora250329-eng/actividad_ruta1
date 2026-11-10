function enviar() {
    var contenido = document.querySelector('#contenido');
    var v1 = document.querySelector('#t1').value;
    var v2 = document.querySelector('#t2').value;
    var v3 = document.querySelector('#t3').value;
    var url = "";

    if (document.querySelector('#opcion1').checked) {
        url = 'http://127.0.0.1:5000/';
    } else if (document.querySelector('#opcion2').checked) {
        url = 'http://127.0.0.1:5000/notas/' + v1 + '/' + v2 + '/' + v3;
    } else if (document.querySelector('#opcion3').checked) {
        url = 'http://127.0.0.1:5000/edades/' + v1;
    } else if (document.querySelector('#opcion4').checked) {
        url = 'http://127.0.0.1:5000/arreglos/' + v1 + '/' + v2;
        if (v3 !== "") {
            url += '/' + v3;
        }
    } else {
        swal("Mensaje", "Seleccione una opción", "warning");
        return;
    }

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                throw "Error en la llamada";
            }
        })
        .then(function (texto) {
            console.log(texto);
            contenido.innerHTML = texto;
        })
        .catch(function (error) {
            console.log(error);
            swal({
                title: "Advertencia",
                text: String(error),
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        });
}

// Función auxiliar para configurar los campos
function configurar(h1, h2, h3, p1, p2, p3) {
    var t1 = document.querySelector('#t1');
    var t2 = document.querySelector('#t2');
    var t3 = document.querySelector('#t3');
    t1.disabled = !h1;
    t2.disabled = !h2;
    t3.disabled = !h3;
    t1.value = "";
    t2.value = "";
    t3.value = "";
    t1.placeholder = p1;
    t2.placeholder = p2;
    t3.placeholder = p3;
}

// Opción para mensaje
function opcion1() {
    configurar(false, false, false, "", "", "");
}

// Opción para notas
function opcion2() {
    configurar(true, true, true, "Nota 1", "Nota 2", "Nota 3");
}

// Opción para edad
function opcion3() {
    configurar(true, false, false, "Edad", "", "");
}