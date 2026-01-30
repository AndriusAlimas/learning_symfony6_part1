<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use function Symfony\Component\String\u;

class PageController
{
    #[Route('/')]
   public function homepage()
   {
    return new Response("Hello World!");
   }
   #[Route('/city/{slug}')]
   public function city(string $slug):Response
   {

   $title =  u(str_replace('-',' ',$slug))->title(true);
    
   return new Response("City: {$title}");
   }
}