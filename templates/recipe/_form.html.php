<?php
    /** @var $recipe ?\App\Model\Recipe */
?>

<div class="form-group">
    <label for="subject">Danie</label>
    <input type="text" id="subject" name="recipe[subject]" value="<?= $recipe ? $recipe->getDishName() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Składniki</label>
    <textarea id="content" name="recipe[content]"><?= $recipe? $recipe->getIngredients() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Dodaj">
</div>
