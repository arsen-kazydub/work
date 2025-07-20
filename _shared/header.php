<?php

/** @var array $page */

?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= $page['title']; ?> | Arsen Kazydub</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700&display=swap">

  <link rel="stylesheet" crossorigin="anonymous"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr">

  <link rel="stylesheet" href="../_shared/shared.css">

  <?php if (!empty($page['styles'])): ?>
    <?php foreach ($page['styles'] as $style): ?>
      <link rel="stylesheet" href="<?= $style ?>">
    <?php endforeach; ?>
  <?php endif; ?>
</head>

<body>
<div id="wrapper" class="container-xxl">