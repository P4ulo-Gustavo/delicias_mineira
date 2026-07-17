<?php

declare(strict_types=1);

namespace App\Controller\View;

use App\Controller\Http\Request;
use App\Controller\Http\Response;
use App\Utils\View;

class SiginController
{
    /**
     * Método responsável por retornar o conteúdo da view sigin
     * @return string
     */
    public function index(Request $request): Response
    {
        //retorna o conteúdo da view sigin
        return new Response(200, View::render('sigin'));
    }
}