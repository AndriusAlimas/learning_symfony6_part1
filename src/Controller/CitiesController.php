<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use function Symfony\Component\String\u;

class CitiesController extends AbstractController
{
    #[Route('/')]
   public function homepage()
   {
      $cities = [    
      ['name' => 'London', 'population' => 9000000],
      ['name' => 'York', 'population' => 210000],
      ['name' => 'Manchester', 'population' => 553230],
      ['name' => 'Liverpool', 'population' => 491500],
      ['name' => 'Bristol', 'population' => 467099],
      ['name' => 'Oxford',  'population' => 152457],
      ['name' => 'Cambridge', 'population' => 145674],
      ['name' => 'Birmingham', 'population' => 1141816],
      ['name' => 'Leeds', 'population' => 789194],
      ['name' => 'Newcastle',  'population' => 300196],
      ['name' => 'Wakefield', 'population' => 348312],
      ['name' => 'Sheffield', 'population' => 584853],
      ];

      // dd($cities);
    return $this->render('cities/homepage.html.twig',
    [
      'title'=>'All cities',
      'cities' => $cities,
      'country' => 'UK',
    ]);
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