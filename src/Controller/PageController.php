<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
    return new Response("City: {$slug}");
   }
}