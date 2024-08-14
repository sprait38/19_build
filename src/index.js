import 'babel-polyfill';

import { createCard } from './create-form.js';
import { setChildren } from 'redom';
import { isExpirationDateValid, isSecurityCodeValid, getCreditCardNameByNumber, } from 'creditcard.js';
import IMask from 'imask';

import Mir from './assets/img/mir.svg';
import Visa from './assets/img/visa.svg';
import MasterCard from './assets/img/mastercard.svg';

const Payment = require('payment');
const validatorMail = require('email-validator');

setChildren(window.document.body, createCard());

const cardNumber = document.getElementById('card-number');
const cardDate = document.getElementById('card-date');
const cardCvv = document.getElementById('card-cvv');
const cardEmail = document.getElementById('card-email');
const formPayment = document.getElementById('form-payment');
const logoCard = document.getElementById('logo-card');
const btnPay = document.getElementById('btn-pay');


Payment.formatCardNumber(cardNumber);
Payment.formatCardCVC(cardCvv);
Payment.formatCardExpiry(cardDate)

IMask(cardDate, {
  mask: '00/00'
})

IMask(cardCvv, {
  mask: '000'
})

cardNumber.addEventListener('blur', (e) => {
  if (e.target.value.trim() === '') return;

  const nameByNumber = getCreditCardNameByNumber(e.target.value);
  console.log(nameByNumber);
  if (nameByNumber === 'Credit card is invalid!') {
    cardNumber.classList.add('not-valid');
    cardNumber.classList.remove('is-valid');
    logoCard.src = ''
  } else if (nameByNumber === 'Visa') {
    cardNumber.classList.remove('not-valid');
    cardNumber.classList.add('is-valid');
    logoCard.src = Visa;
  } else if (nameByNumber === 'MasterCard') {
    cardNumber.classList.remove('not-valid');
    cardNumber.classList.add('is-valid');
    logoCard.src = MasterCard;
  } else if (nameByNumber === 'Mir') {
    cardNumber.classList.remove('not-valid');
    cardNumber.classList.add('is-valid');
    logoCard.src = Mir;
  } else {
    alert('Поддерживае только карты Visa, MasterCard и Мир :(')
    cardNumber.classList.add('is-valid');
  }
  checkValid()
});

cardDate.addEventListener('blur', (e) => {
  if (e.target.value.trim() === '') return;
  const value = cardDate.value.split('/');

  const isDateValid = isExpirationDateValid(value[0], value[1])

  if (!isDateValid) {
    cardDate.classList.add('not-valid');
    cardDate.classList.remove('is-valid');
  } else {
    cardDate.classList.add('is-valid');
    cardDate.classList.remove('not-valid');
  }
  checkValid()
})

cardCvv.addEventListener('blur', (e) => {
  if (e.target.value.trim() === '') return;
  const isCvcValid = isSecurityCodeValid(cardNumber.value, e.target.value)
  if (isCvcValid) {
    cardCvv.classList.remove('not-valid')
    cardCvv.classList.add('is-valid');
  } else {
    cardCvv.classList.add('not-valid');
    cardCvv.classList.remove('is-valid');
  }
  checkValid()
})

cardEmail.addEventListener('blur', e => {
  if (e.target.value.trim() === '') return;
  console.log(e.target.value.trim);
  if (validatorMail.validate(e.target.value.trim())) {
    cardEmail.classList.remove('not-valid');
    cardEmail.classList.add('is-valid');
  } else {
    cardEmail.classList.add('not-valid');
    cardEmail.classList.remove('is-valid');
  }
  checkValid()
})


function checkValid() {
  if (formPayment.querySelectorAll('input').length === formPayment.querySelectorAll('input.is-valid').length) btnPay.disabled = false
}

// 2200150907492745 mir
// 4539578763621486 visa
