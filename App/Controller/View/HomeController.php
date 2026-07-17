<?php

declare(strict_types=1);

namespace App\Controller\View;

use App\Controller\Http\Request;
use App\Controller\Http\Response;
use App\Utils\View;

class HomeController
{
    /**
     * Método responsável por retornar o conteúdo da view home
     * @return string
     */
    public function index(Request $request): Response
    {

        $header = View::render('header', [
            'status_abertura' => 'Aberto agora!',
        ]);

        //retorna o conteúdo da view home
        return new Response(200, View::render('home', [
            'header' => $header
        ]));
    }
}