<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();

$templating = new \App\Service\Templating();
$router = new \App\Service\Router();

$action = $_REQUEST['action'] ?? null;
switch ($action) {
    case 'recipe-index':
    case null:
        $controller = new \App\Controller\RecipeController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'recipe-create':
        $controller = new \App\Controller\RecipeController();
        $view = $controller->createAction($_REQUEST['recipe'] ?? null, $templating, $router);
        break;
    case 'recipe-edit':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\RecipeController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['recipe'] ?? null, $templating, $router);
        break;
    case 'recipe-show':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\RecipeController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'recipe-delete':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\RecipeController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;
    case 'info':
        $controller = new \App\Controller\InfoController();
        $view = $controller->infoAction();
        break;
    default:
        $view = 'Not found';
        break;
}

if ($view) {
    echo $view;
}
