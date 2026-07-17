<?php
declare(strict_types=1);

namespace App\Utils;

class View
{

    //variáveis padrões da View
    private static $vars = [];

    //Método responsável por definir os dados iniciais da Classe
    //Retorna os dados da classe
    public static function init(array $vars = [])
    {
        self::$vars = $vars;
    }

    /**
     * Método responsável por retornar o conteúdo de uma view
     * @param string $view
     * @return string
     */
    private static function getContentView(string $view)
    {
        //Navega pelos diretórios até a view, 
        //afim de encontrar uma view com o nome passado como parâmetro
        $file = __DIR__ . '/../view/' . $view . '.html';

        //Se o arquivo existir, retorne o conteúdo, caso contrário, retorne uma string vazia
        return file_exists($file) ? file_get_contents($file) : '';
    }

    /** 
     * Método responsável por retornar o conteúdo renderizado de uma view
     * @param string $view
     * @param array $vars (string/numeric)
     * @return string
     */
    public static function render(string $view, array $vars = [])
    {
        //Conteúdo da view
        $contentView = self::getContentView($view);

        //Merge de variáveis da view
        $vars = array_merge(self::$vars, $vars);

        //Chaves dos arrays de variáveis
        $keys = array_keys($vars); //Pegando as chaves dos arrays

        $keys = array_map(function ($item) { //utilizando a função de array map para adicionar chaves nas variáveis 
            return '{{' . $item . '}}'; //retorna a chave com chaves duplas, para ser trocado posteriormente
        }, $keys); //retorna o array de chaves

        /*
        EX: 
        $keys = ['name', 'description'];
        $keys = array_map(function ($item) {
              return '{{' . $item . '}}';
        }, $keys);
        $keys = ['{{name}}', '{{description}}'];

        $values = ["Paulo Gustavo", "Aproveite os melhores pratos da culinária mineira"];

        str_replace($keys, $values, $contentView); -> os valores são trocados pelas chaves, ou seja, o {{name}} é trocado por "Paulo Gustavo" e o {{description}} é trocado por "Aproveite os melhores pratos da culinária mineira"
        */

        //Retorna o conteúdo renderizado
        return str_replace($keys, array_values($vars), $contentView); //substitui as chaves pelas variáveis
    }
}