<?php

$nombre = $_POST ["name"];
$correo = $_POST ["email"];
$asunto = $_POST ["subject"];
$mensaje= $_POST ["message"];


$destino = "mgrdesarrollo@gmail.com";
$mensaje = "Hola soy $nombre y este es mi mensaje: $mensaje";

$cabeceras = "From: $correo";

if (mail($destino, $asunto, $mensaje, $cabeceras))
{
    echo("Mail enviado");
    header("Location: ./index.html#contact?ok");
    exit;
}
else
{
    echo("Error en el envío");
    header("Location: ./index.html#contact?fail");
    exit;
}
?>