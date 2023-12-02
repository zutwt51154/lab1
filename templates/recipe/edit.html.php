<?php
/** @var \App\Model\Recipe $recipe */
/** @var \App\Service\Router $router */

$title = "Edytuj przepis {$recipe->getDishName()} ({$recipe->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('recipe-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="recipe-edit">
        <input type="hidden" name="id" value="<?= $recipe->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('recipe-index') ?>">Powrót do listy</a></li>
        <li>
            <form action="<?= $router->generatePath('recipe-delete') ?>" method="post">
                <input type="submit" value="Usuń" onclick="return confirm('Jesteś pewien/pewna?')">
                <input type="hidden" name="action" value="recipe-delete">
                <input type="hidden" name="id" value="<?= $recipe->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
