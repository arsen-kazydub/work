<?php

$page = [
  'title' => 'Mortgage Calculator',
  'styles' => ['css/mortgage-calculator.css'],
  'scripts' => ['js/mortgage-calculator.js'],
];

require_once __DIR__ . '/../_shared/header.php';

?>

  <h1><?= $page['title'] ?></h1>

  <div id="mortgage-calculator">
    <div class="mc-form d-flex flex-column gap-3">

      <div class="row">
        <label class="form-label" for="mc-price-input">Total Price</label>
        <div class="col-12 col-sm-6">
          <div class="input-group">
            <input type="text" class="form-control" id="mc-price-input" aria-describedby="mc-price-addon">
            <span class="input-group-text" id="mc-price-addon">USD</span>
          </div>
        </div>
        <div class="col-12 col-sm-6 d-flex align-items-center">
          <label class="visually-hidden" for="mc-price-slider">Total Price Slider</label>
          <input type="range" class="form-range" id="mc-price-slider">
        </div>
      </div>

      <div class="row">
        <label class="form-label" for="mc-down-payment-input">Down Payment</label>
        <div class="col-12 col-sm-6">
          <div class="input-group">
            <input type="text" class="form-control" id="mc-down-payment-input" aria-describedby="mc-down-payment-addon">
            <span class="input-group-text" id="mc-down-payment-addon">USD</span>
          </div>
        </div>
        <div class="col-12 col-sm-6 d-flex align-items-center">
          <label class="visually-hidden" for="mc-down-payment-slider">Down Payment Slider</label>
          <input type="range" class="form-range" id="mc-down-payment-slider">
        </div>
      </div>

      <div class="row">
        <label class="form-label" for="mc-loan-period-input">Loan Period</label>
        <div class="col-12 col-sm-6">
          <div class="input-group">
            <input type="text" class="form-control" id="mc-loan-period-input" aria-describedby="mc-loan-period-addon">
            <span class="input-group-text" id="mc-loan-period-addon">Years</span>
          </div>
        </div>
        <div class="col-12 col-sm-6 d-flex align-items-center">
          <label class="visually-hidden" for="mc-loan-period-slider">Down Payment Slider</label>
          <input type="range" class="form-range" id="mc-loan-period-slider">
        </div>
      </div>

      <div class="row">
        <label class="form-label" for="mc-interest-rate-input">Interest Rate</label>
        <div class="col-12 col-sm-6">
          <div class="input-group">
            <input type="text" class="form-control" id="mc-interest-rate-input" aria-describedby="mc-interest-rate-addon">
            <span class="input-group-text" id="mc-interest-rate-addon">%</span>
          </div>
        </div>
        <div class="col-12 col-sm-6 d-flex align-items-center">
          <label class="visually-hidden" for="mc-interest-rate-slider">Down Payment Slider</label>
          <input type="range" class="form-range" id="mc-interest-rate-slider" step="0.1">
        </div>
      </div>

    </div><!-- / .mc-form -->
    <div class="mc-result border rounded">

      <h4 class="border-bottom text-center">Results</h4>
      <div class="mc-values d-flex flex-column gap-2 gap-sm-1 p-3 fs-5">
        <div>
          Monthly Payment
          <span id="mc-monthly-payment"></span>
        </div>
        <div>
          Total Payment
          <span id="mc-total-payment"></span>
        </div>
      </div>

    </div><!-- / .mc-result -->
  </div><!-- / #mortgage-calculator -->


  <script>
    // Initialization
    document.addEventListener('DOMContentLoaded', () => {
      const root = document.getElementById('mortgage-calculator');
      if (root) {
        new MortgageCalculator(root, {
          price: 500000,
          maxPrice: 1000000,
        });
      }
    });
  </script>

<?php require_once __DIR__ . '/../_shared/footer.php';