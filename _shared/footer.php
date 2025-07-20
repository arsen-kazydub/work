</div><!-- / #wrapper -->

<?php if (!empty($page['scripts'])): ?>
  <?php foreach ($page['scripts'] as $script): ?>
    <script src="<?= $script ?>"></script>
  <?php endforeach; ?>
<?php endif; ?>

</body>
</html>