describe('Покупка автара', function () {
    
    it('Верный пароль и верный логин', function () {
        cy.visit('https://pokemonbattle.ru/login');
        cy.get(':nth-child(1) > .auth__input').type('Homerstr@yandex.ru');
        cy.get('#password').type('K2ymSmgvj575-Wk')
        cy.get('.auth__button').click();
        cy.wait(2000);
        cy.get('.header__container > .header__id').should('be.visible'); // Есть кнопка ID аватара и видна для пользователю
        cy.get('.header__container > .header__id').click(); // нажимаем на кнопку аватара
        cy.wait(1000);
        cy.get('[href="/shop"]').should('be.visible');// Есть кнопка смена аватара и видна для пользователю
        cy.get('[href="/shop"]').click(); // нажимаем на кнопку смены аватара
        cy.wait(1000);
        cy.get('.available > button').first().click({ force: true }); // Кликаем первого аватара
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').should('be.visible'); // Есть поле номера карты
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996'); // Вводим номер карты
        cy.get(':nth-child(1) > .pay_base-input-v2').should('be.visible'); // Есть поле дата карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('1225'); // Вводим дату карты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').should('be.visible'); // Есть поле CVV карты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Вводим CVV карты
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').should('be.visible'); // Есть поле имя и фамилия карты
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Vitaliy Ilkiv');
        cy.get('.pay-btn').should('be.visible'); // Есть кнопка оплатить
        cy.get('.pay-btn').click(); // нажимаем на кнопку оплатить
        cy.get('#cardnumber').should('be.visible'); // Есть поле Код из пуша или СМС
        cy.get('#cardnumber').type('56456'); // Вводим код из СМС
        cy.get('.payment__submit-button').should('be.visible'); // Есть кнопка отправить
        cy.get('.payment__submit-button').click(); // нажимаем на кнопку отправить
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // Проверяем успешную оплату
              })
})