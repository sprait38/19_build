import { el, setChildren } from 'redom';
import './create-form.css';

export function createCard() {
  const appContainer = el('div', {
    class: 'container',
  }, [
    el('form', {
      class: 'card-wrapper',
      id: 'form-payment',
      autocomplete: 'on'
    }, [
      el('div', {
        class: 'card-back',
      }, [
        el('div', {
          class: 'card-back-line',
        }),
        el('div', {
          class: 'error-label-cvv',
        },'Код', [
          el('input', {
            class: 'input-cvv',
            id: 'card-cvv',
            placeholder: 'CVC',
            autocomplete: 'off'
          })
        ])
      ]),
      el('div', {
        class: 'card-front',
      }, [
        el('img', {
          class: 'card-logo-pay',
          id: 'logo-card',
        }),
        el('div', {
          class: 'error-label-num',
        },'Номер карты', [
          el('input', {
            class: 'input-card-number',
            id: 'card-number',
            placeholder: '0000 0000 0000 0000',
          })
        ]),
        el('div', {
          class: 'error-label-date',
        },'Срок действия', [
          el('input', {
            class: 'input-card-date',
            id: 'card-date',
            placeholder: 'MM/ГГ',
          })
        ])
      ]),
      el('div', {
        class: 'wrap-btn'
      }, [
        el('div', {
          class: 'error-label',
        }, [
          el('input', {
            class: 'input-mail',
            id: 'card-email',
            placeholder: 'ivanov.ivan@mail.ru',
          })
        ]),
        el('button', {
          class: 'btn-send',
          type: 'submit',
          disabled: true,
          id: 'btn-pay'
        }, 'Оплатить')
      ])
    ])
  ])

  return appContainer;

}
