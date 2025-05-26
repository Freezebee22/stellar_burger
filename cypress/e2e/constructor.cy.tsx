/// <reference types="cypress" />
import * as orderFixture from '../fixtures/order.json';

describe('E2E тест', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    cy.visit('http://localhost:4000');
  });

  it('список ингредиентов', () => {
    cy.get('[data-cy="bun"]').should('have.length.at.least', 1);
    cy.get('[data-cy="main"],[data-cy="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('проверка работы модалок описаний ингредиентов', () => {
    describe('проверка открыти модалок', () => {
      it('по карточке', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });

      it('после перезагрузки', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.reload(true);
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('проверка закрытия модалок', () => {
      it('крестик', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('оверлей', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('esc', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('процесс оформления заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

      cy.visit('http://localhost:4000');
    });

    it('оформление заказа', () => {
      cy.get('[data-cy="order-button"]').should('be.disabled');
      cy.get('[data-cy="bun"]:first-of-type button').click();
      cy.get('[data-cy="order-button"]').should('be.disabled');
      cy.get('[data-cy="main"]:first-of-type button').click();
      cy.get('[data-cy="order-button"]').should('be.enabled');

      cy.get('[data-cy="order-button"]').click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );
      cy.get('[data-cy="order-button"]').should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});

