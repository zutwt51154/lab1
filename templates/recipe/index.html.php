<?php
/** @var \App\Model\Recipe[] $recipes */
/** @var \App\Service\Router $router */

$title = 'Książka kucharska';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Lista przepisów</h1>

    <a href="<?= $router->generatePath('recipe-create') ?>">Dodaj nowy</a>

    <ul class="index-list">
        <?php foreach ($recipes as $recipe): ?>
            <li><h3><?= $recipe->getDishName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('recipe-show', ['id' => $recipe->getId()]) ?>">Szczegóły</a></li>
                    <li><a href="<?= $router->generatePath('recipe-edit', ['id' => $recipe->getId()]) ?>">Edytuj</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
