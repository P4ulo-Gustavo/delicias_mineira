<?php

declare(strict_types=1);

namespace App\Controller\View;

use App\Controller\Http\Request;
use App\Controller\Http\Response;
use App\Utils\View;

class LoginController
{
      /**
       * Método responsável por retornar o conteúdo da view home
       * @return string
       */
      public function index(Request $request): Response
      {
            //retorna o conteúdo da view login
            return new Response(200, View::render('login'));
      }
}