<?php
/** @var \App\Model\Recipe $recipe */
/** @var \App\Service\Router $router */

$title = 'Dodaj przepis';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Dodaj przepis</h1>
    <form action="<?= $router->generatePath('recipe-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="recipe-create">
    </form>

    <a href="<?= $router->generatePath('recipe-index') ?>">Powrót do listy</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
