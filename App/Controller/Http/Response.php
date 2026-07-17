<?php
declare(strict_types=1);
namespace App\Controller\Http;

class Response
{
    private int $statusCode;
    private string $body;
    private array $headers = [];

    public function __construct(int $statusCode, string $body)
    {
        $this->statusCode = $statusCode;
        $this->body = $body;
    }

    //++++++++++++++++++++++MÉTODOS SETTERS++++++++++++++++++++++++

    public function setStatusCode(int $statusCode): void
    {
        $this->statusCode = $statusCode;
    }

    public function setBody(string $body): void
    {
        $this->body = $body;
    }

    public function setHeader(string $key, string $value): void
    {
        $this->headers[$key] = $value;
    }

    //++++++++++++++++++++++MÉTODOS GETTERS++++++++++++++++++++++++

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getBody(): string
    {
        return $this->body;
    }

    public function getHeaders(): array
    {
        return $this->headers;
    }

    //++++++++++++++++++++++MÉTODO DE ENVIO++++++++++++++++++++++++

    public function send(): void
    {
        // Envia o status HTTP
        http_response_code($this->statusCode);

        // Envia os headers
        foreach ($this->headers as $key => $value) {
            header("$key: $value");
        }

        // Envia o corpo
        echo $this->body;
    }

    //++++++++++++++++++++++MÉTODOS ESTÁTICOS++++++++++++++++++++++++

    public static function json(array $data, int $statusCode = 200): self
    {
        $response = new self($statusCode, json_encode($data));
        $response->setHeader('Content-Type', 'application/json');
        return $response;
    }

    public static function redirect(string $uri, int $statusCode = 302): self
    {
        $response = new self($statusCode, '');
        $response->setHeader('Location', $uri);
        return $response;
    }
}