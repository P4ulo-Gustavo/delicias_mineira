<?php

session_start();

//vizualização de erro
ini_set('display_errors', 1);
error_reporting(E_ALL);
//chamando o autoload
require __DIR__ . "/../../vendor/autoload.php";

use App\Controller\Http\Request;
use App\Controller\Http\Router;

//iniciando o request
$request = new Request();

//iniciando o router
$router = new Router($request);

//carregando todas as rotas de páginas
include __DIR__ . "/../router/page.php";

//retorna a resposta
$response = $router->dispatch();

//enviando a resposta
$response->send();

?>