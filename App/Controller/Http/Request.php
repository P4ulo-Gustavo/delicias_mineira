<?php

declare(strict_types=1);

namespace App\Controller\Http;

class Request
{

    //Definindo os atributos da classe
    private string $method;
    private string $uri;
    private array $queryParams = [];
    private array $postVars = [];
    private array $headers = [];


    //Método construtor
    public function __construct()
    {
        $this->setMethod();
        $this->setUri();
        $this->setQueryParams();
        $this->setHeaders();
        $this->setPostVars();
    }

    //++++++++++++++++++++++MÉTODOS SETTERS++++++++++++++++++++++++

    private function setMethod(): void
    {
        $this->method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    }

    private function setUri(): void
    {
        $this->uri = $_SERVER['REQUEST_URI'] ?? '/';
    }

    private function setQueryParams(): void
    {
        //pegando a string da query
        $query = parse_url($this->uri, PHP_URL_QUERY) ?? '';

        //Transformando esta string em array associativo
        parse_str($query, $this->queryParams);

    }

    private function setHeaders(): void
    {
        $this->headers = getallheaders();
    }

    private function setPostVars(): void
    {
        if ($this->method === 'POST') {
            //pegando o tipo do content type
            $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

            //se for json, decodifica
            if (str_contains($contentType, 'application/json')) {
                $this->postVars = json_decode(file_get_contents('php://input'), true) ?? [];
            } else {
                //caso contrário pega o post normal
                $this->postVars = $_POST;
            }
        }
    }

    //++++++++++++++++++++++MÉTODOS GETTERS++++++++++++++++++++++++

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getUri(): string
    {
        return $this->uri;
    }

    public function getQueryParams(): array
    {
        return $this->queryParams;
    }

    public function getHeaders(): array
    {
        return $this->headers;
    }

    public function getPostVars(): array
    {
        return $this->postVars;
    }

}