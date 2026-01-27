<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;

class PageController
{
    #[Route('/')]
   public function homepage()
   {
    die('Hello!');
   }
}