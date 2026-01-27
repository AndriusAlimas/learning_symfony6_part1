<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    #[Route('/')]
    public function index(): Response
    {
        return new Response('
            <html>
                <head>
                    <title>Welcome to Symfony with Docker!</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            max-width: 800px; 
                            margin: 50px auto; 
                            padding: 20px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                        }
                        .container {
                            background: rgba(255,255,255,0.1);
                            padding: 40px;
                            border-radius: 15px;
                            backdrop-filter: blur(10px);
                            text-align: center;
                        }
                        h1 { color: #fff; margin-bottom: 20px; }
                        p { font-size: 18px; line-height: 1.6; }
                        .badge { 
                            display: inline-block;
                            background: rgba(255,255,255,0.2);
                            padding: 5px 15px;
                            border-radius: 20px;
                            margin: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🚀 Welcome to Symfony with Docker!</h1>
                        <p>Your Symfony application is running successfully in Docker container.</p>
                        <p>
                            <span class="badge">Symfony 6.4</span>
                            <span class="badge">PHP 8.2</span>
                            <span class="badge">Docker</span>
                            <span class="badge">Nginx</span>
                        </p>
                        <p>Edit <strong>src/Controller/PageController.php</strong> to customize this page.</p>
                    </div>
                </body>
            </html>
        ');
    }
}