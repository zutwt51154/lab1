<?php
/** @var \App\Model\Recipe $recipe */
/** @var \App\Service\Router $router */

$title = "{$recipe->getDishName()} ({$recipe->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $recipe->getDishName() ?></h1>
    <article>
        <?= $recipe->getIngredients();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('recipe-index') ?>">Powrót do listy</a></li>
        <li><a href="<?= $router->generatePath('recipe-edit', ['id'=> $recipe->getId()]) ?>">Edytuj</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
