<?php
namespace App\Model;

use App\Service\Config;

class Recipe
{
    private ?int $id = null;
    private ?string $dishName = null;
    private ?string $ingredients = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Recipe
    {
        $this->id = $id;

        return $this;
    }

    public function getDishName(): ?string
    {
        return $this->dishName;
    }

    public function setDishName(?string $dishName): Recipe
    {
        $this->dishName = $dishName;

        return $this;
    }

    public function getIngredients(): ?string
    {
        return $this->ingredients;
    }

    public function setIngredients(?string $ingredients): Recipe
    {
        $this->ingredients = $ingredients;

        return $this;
    }

    public static function fromArray($array): Recipe
    {
        $post = new self();
        $post->fill($array);

        return $post;
    }

    public function fill($array): Recipe
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['subject'])) {
            $this->setDishName($array['subject']);
        }
        if (isset($array['content'])) {
            $this->setIngredients($array['content']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM post';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $posts = [];
        $postsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($postsArray as $postArray) {
            $posts[] = self::fromArray($postArray);
        }

        return $posts;
    }

    public static function find($id): ?Recipe
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM post WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $postArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $postArray) {
            return null;
        }
        $post = Recipe::fromArray($postArray);

        return $post;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO post (subject, content) VALUES (:subject, :content)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'subject' => $this->getDishName(),
                'content' => $this->getIngredients(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE post SET subject = :subject, content = :content WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':subject' => $this->getDishName(),
                ':content' => $this->getIngredients(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM post WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setDishName(null);
        $this->setIngredients(null);
    }
}
