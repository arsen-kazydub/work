class MortgageCalculator {
  constructor(root, options = {}) {
    this.root = root;

    // Options
    this.options = {
      // the initial values
      price: 1000000,
      downPayment: 20,
      loanPeriod: 25,
      interestRate: 4,
      // the price range
      minPrice: 10000,
      maxPrice: 2000000,
      // the down payment range (percents)
      minDownPayment: 10,
      maxDownPayment: 80,
      // the loan period range (years)
      minLoanPeriod: 1,
      maxLoanPeriod: 30,
      // the interest rate range (percents)
      minInterestRate: 1,
      maxInterestRate: 10,
      ...options
    };

    // Elements for displaying results
    this.elMonthlyPayment = document.querySelector('#mc-monthly-payment');
    this.elTotalPayment = document.querySelector('#mc-total-payment');

    // Inputs and sliders
    this.priceInput = root.querySelector('#mc-price-input');
    this.priceSlider = root.querySelector('#mc-price-slider');

    this.downPaymentInput = root.querySelector('#mc-down-payment-input');
    this.downPaymentSlider = root.querySelector('#mc-down-payment-slider');
    this.downPaymentPercents = root.querySelector('#mc-down-payment-addon');

    this.loanPeriodInput = root.querySelector('#mc-loan-period-input');
    this.loanPeriodSlider = root.querySelector('#mc-loan-period-slider');

    this.interestRateInput = root.querySelector('#mc-interest-rate-input');
    this.interestRateSlider = root.querySelector('#mc-interest-rate-slider');

    this.inputs = [this.priceInput, this.downPaymentInput, this.loanPeriodInput, this.interestRateInput];
    this.sliders = [this.priceSlider, this.downPaymentSlider, this.loanPeriodSlider, this.interestRateSlider];

    // Set slider ranges
    this.priceSlider.min = this.options.minPrice;
    this.priceSlider.max = this.options.maxPrice;

    this.updateDownPaymentSliderRange(this.options.price);

    this.loanPeriodSlider.min = this.options.minLoanPeriod;
    this.loanPeriodSlider.max = this.options.maxLoanPeriod;

    this.interestRateSlider.min = this.options.minInterestRate;
    this.interestRateSlider.max = this.options.maxInterestRate;

    // Set initial values
    this.priceInput.value = this.formatMonetaryValue(this.options.price);
    this.priceSlider.value = this.options.price;

    const initialDownPayment = Math.floor(this.options.price * this.options.downPayment / 100);
    this.downPaymentInput.value = this.formatMonetaryValue(initialDownPayment);
    this.downPaymentSlider.value = initialDownPayment;

    this.loanPeriodInput.value = this.options.loanPeriod;
    this.loanPeriodSlider.value = this.options.loanPeriod;

    this.interestRateInput.value = this.options.interestRate;
    this.interestRateSlider.value = this.options.interestRate;

    this.updateDownPaymentPercentsLabel();
    this.displayResult();

    // User uses an input - calculate on blur and on pressing the Enter key
    this.inputs.forEach(input => {
      input.addEventListener('blur', this.handleInputChange);
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') this.handleInputChange(event);
      });
    });

    // User uses a slider - update a corresponding input's value
    this.sliders.forEach(slider => {
      slider.addEventListener('input', this.handleSliderChange);
    });
  }


  // Returns the value of an input as an integer
  getInputValue(input) {
    return parseFloat(input.value.replace(/,/g, '')) || 0;
  }


  // Make sure provided input values are in the range of the corresponding slider
  clampInputValue = (input, slider) => {
    const value = this.getInputValue(input);
    const min = parseInt(slider.min);
    const max = parseInt(slider.max);
    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }


  // Returns a price-formatted string
  formatMonetaryValue(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


  // Updates the down payment slider range
  updateDownPaymentSliderRange(price) {
    this.downPaymentSlider.min = Math.floor(price * this.options.minDownPayment / 100);
    this.downPaymentSlider.max = Math.floor(price * this.options.maxDownPayment / 100);
  }


  // Updates the down payment percents' label
  updateDownPaymentPercentsLabel = () => {
    const price = this.getInputValue(this.priceInput);
    const downPayment = this.getInputValue(this.downPaymentInput);
    this.downPaymentPercents.textContent = (!price || price <= 0)
      ? '0%'
      : Math.round((downPayment * 100 / price)) + '%';
  }


  // Updates the down payment input and slider value when changing the price
  synchronizeDownPaymentInputAndSliderWithPrice() {
    const price = this.getInputValue(this.priceInput);
    const percents = parseInt(this.downPaymentPercents.textContent);
    const newDownPayment = Math.round(price * percents / 100);
    this.downPaymentInput.value = this.formatMonetaryValue(newDownPayment);
    this.downPaymentSlider.value = newDownPayment;
    this.downPaymentSlider.dataset.value = newDownPayment.toString();
    this.updateDownPaymentSliderRange(price);
  }


  handleInputChange = (event) => {
    // validation and formatting
    const input = event.target;
    // remove all non-digit characters
    input.value = input.value.replace(/\D/g, '');
    // remove leading zeroes (but still leaves a single "0")
    input.value = input.value.replace(/^0+(?!$)/, '');
    // transform negative values into positive
    input.value = input.value.replace(/^-/, '');

    // check min-max range
    if (input === this.priceInput) {
      this.clampInputValue(this.priceInput, this.priceSlider);
    } else if (input === this.downPaymentInput) {
      this.clampInputValue(this.downPaymentInput, this.downPaymentSlider);
    } else if (input === this.loanPeriodInput) {
      this.clampInputValue(this.loanPeriodInput, this.loanPeriodSlider);
    } else if (input === this.interestRateInput) {
      this.clampInputValue(this.interestRateInput, this.interestRateSlider);
    }

    // update a corresponding slider
    const inputId = input.getAttribute('id');
    const slider = this.root.querySelector('#' + inputId.replace('-input', '-slider'));
    slider.value = input.value;

    // format monetary values
    if (input === this.priceInput || input === this.downPaymentInput) {
      input.value = this.formatMonetaryValue(input.value);
    }

    // if the price is changing, we update the value of the down payment too
    if (input === this.priceInput) {
      this.synchronizeDownPaymentInputAndSliderWithPrice();
    }
    // update down payment percents label
    else if (input === this.downPaymentInput) {
      this.updateDownPaymentPercentsLabel();
    }

    this.displayResult();
  }


  handleSliderChange = (event) => {
    const slider = event.target;
    const sliderId = slider.getAttribute('id');

    // update a corresponding input
    const input = this.root.querySelector('#' + sliderId.replace('-slider', '-input'));
    input.value = (input === this.priceInput || input === this.downPaymentInput)
      ? this.formatMonetaryValue(slider.value)
      : slider.value;

    // if the price is changing, we update the value of the down payment too
    if (slider === this.priceSlider) {
      this.synchronizeDownPaymentInputAndSliderWithPrice();
    }
    // update down payment percents label
    else if (slider === this.downPaymentSlider) {
      this.updateDownPaymentPercentsLabel();
    }

    this.displayResult();
  }


  // Returns the monthly payment for a mortgage.
  calcMonthlyPayment(price, downPayment, loanPeriod, interestRate) {
    const loanAmount = price - downPayment;
    const yearlyRate = interestRate / 100;
    const monthlyRate = yearlyRate / 12;
    const numberOfPayments = loanPeriod * 12;
    const compoundFactor = Math.pow(1 + monthlyRate, numberOfPayments);
    return loanAmount * ((monthlyRate * compoundFactor) / (compoundFactor - 1));
  }


  // Returns the total payment for a mortgage.
  calcTotalPayment(monthlyPayment, loanPeriod) {
    const numberOfPayments = loanPeriod * 12;
    return monthlyPayment * numberOfPayments;
  }


  // Update UI with mortgage calculations
  displayResult() {
    // get values as integers
    const price = this.getInputValue(this.priceInput);
    const downPayment = this.getInputValue(this.downPaymentInput);
    const loanPeriod = this.getInputValue(this.loanPeriodInput);
    const interestRate = this.getInputValue(this.interestRateInput);

    // update monthly and total payments
    const monthlyPayment = this.calcMonthlyPayment(price, downPayment, loanPeriod, interestRate);
    const totalPayment = this.calcTotalPayment(monthlyPayment, loanPeriod);
    this.elMonthlyPayment.textContent = this.formatMonetaryValue(monthlyPayment);
    this.elTotalPayment.textContent = this.formatMonetaryValue(totalPayment);
  }
}