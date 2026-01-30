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
   public function city(?string $slug= null):Response
   {
   if($slug){
      $title =  u(str_replace('-',' ',$slug))->title(true);
   }else{
     $title = "All cities";
   }
  
    
   return new Response($title);
   }
}