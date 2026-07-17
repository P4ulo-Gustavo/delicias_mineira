<?php

use App\Controller\View\HomeController;
use App\Controller\View\LoginController;
use App\Controller\View\SiginController;

//ROTA HOME
$router->get('/', [HomeController::class, 'index']);

//ROTA DE LOGIN
$router->get('/login', [LoginController::class, 'index']);

//ROTA DE CADASTRO
$router->get('/sigin', [SiginController::class, 'index']);