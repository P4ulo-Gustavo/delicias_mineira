<?php

namespace App\Controller\Http;

use App\Controller\Http\Request;
use App\Controller\Http\Response;

class Router
{

    //Definindo os atributos da classe
    private array $routes = [];
    private Request $request;


    //Método construtor
    public function __construct(Request $request)
    {
        $this->request = $request;
    }


    //++++++++++++++++++++++MÉTODOS DE REGISTRO++++++++++++++++++++++++

    public function get(string $uri, array $action): void
    {
        $this->routes['GET'][$uri] = $action;
    }

    public function post(string $uri, array $action): void
    {
        $this->routes['POST'][$uri] = $action;
    }

    //++++++++++++++++++++++MÉTODO DE DESPACHO++++++++++++++++++++++++

    public function dispatch(): Response
    {
        // Pega o método e a URI do request
        $method = $this->request->getMethod();
        $uri = $this->request->getUri();

        // Remove a query string da URI para comparar
        $path = parse_url($uri, PHP_URL_PATH);

        // Procura a rota no array
        $action = $this->routes[$method][$path] ?? null;

        // Se não achar, retorna 404
        if (!$action) {
            return new Response(404, 'Página não encontrada');
        }

        // Separa a classe e o método
        [$controller, $method] = $action;

        // Instancia o controller e chama o método
        $controllerInstance = new $controller();
        return $controllerInstance->$method($this->request);
    }

}