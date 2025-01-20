import * as data from '../helpers/default_data.json'
import * as mane_page from '../locators/main_page.json'
import * as result_page from '../locators/result_page.json'
import * as recovery_page from '../locators/recovery_password_page.json'

describe('Проверка авторизации', function () {
   beforeEach('Начало теста', function() {
   cy.visit('/');
   cy.get(mane_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
   });
   afterEach('Конец теста', function () {
      cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
   })

         it('Верный пароль и верный логин', function () {
         cy.get(mane_page.email).type(data.login); // копировали и вставили поле логина, ввели адрес почты
         cy.get(mane_page.password).type(data.password); // копировали и вставили поле пароля, ввели пароль
         cy.get(mane_page.login_button).click(); // нажал на кнопку войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible'); //Проверяю что текст "Авторизация прошла успешно" виден
         })
             
         it('Верный логин и неверный пароль', function () {
            cy.get(mane_page.email).type(data.login); // копировали и вставили поле логина, ввели адрес почты
            cy.get(mane_page.password).type('iLoveqastudio7'); // копировали и вставили поле пароля, ввели пароль
            cy.get(mane_page.login_button).click(); // нажал на кнопку войти
            cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю что после авторизации вижу текст
            cy.get(result_page.title).should('be.visible'); //Проверяю что текст "Такого логина или пароля нет" виден   
         })
   
         it('Неверный логин и верный пароль', function () {
            cy.get(mane_page.email).type('german@dolnikof.ru'); // копировали и вставили поле логина, ввели неправильный адрес почты
            cy.get(mane_page.password).type(data.password); // копировали и вставили поле пароля, ввели пароль
            cy.get(mane_page.login_button).click(); // нажал на кнопку войти
            cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю что после авторизации вижу текст
            cy.get(result_page.title).should('be.visible'); //Проверяю что текст "Нужно исправить проблему валидации" виден  
         })

         it('Проверка валидации без @ в логине и верный пароль', function () {
            cy.get(mane_page.email).type('germandolnikov.ru'); // копировали и вставили поле логина, ввели неправильный адрес почты(без @)
            cy.get(mane_page.password).type(data.password); // копировали и вставили поле пароля, ввели пароль
            cy.get(mane_page.login_button).click(); // нажал на кнопку войти
            cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю что после авторизации вижу текст
            cy.get(result_page.title).should('be.visible'); //Проверяю что текст "Нужно исправить проблему валидации" виден   
         })

         it('Верный логин с приведением к строчным буквам и верный пароль', function () {
            cy.get(mane_page.email).type('GerMan@Dolnikov.ru'); // копировали и вставили поле логина, ввели строчные и заглавные буквы
            cy.get(mane_page.password).type(data.password); // копировали и вставили поле пароля, ввели пароль
            cy.get(mane_page.login_button).click(); // нажал на кнопку войти
            cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю что после авторизации вижу текст
            cy.get(result_page.title).should('be.visible'); //Проверяю что текст "Нужно исправить проблему валидации" виден  
         })

         it('Проверка восстановления пароля', function () {
            cy.get(mane_page.fogot_pass_btn).click(); // нажимаем на кнопку Забыли пароль
            cy.get(recovery_page.title).contains('Восстановите пароль'); // Проверяем поле Восстановите пароль
            cy.get(recovery_page.title).should('be.visible'); //Проверяем видимость надписи Восстановите пароль
            cy.get(recovery_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
            cy.get(recovery_page.email).type(data.login); // копировали и вставили поле логина, ввели адрес почты
            cy.get(recovery_page.send_button).should('be.visible'); // Кнопка Отправить код видна
            cy.get(recovery_page.send_button).click(); // нажал на кнопку Отправить код
            cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю что после нажатия кнопки Отправить код вижу текст 
         })

 })
 
 // npx cypress run --spec cypress/e2e/login.cy.js --browser chrome
 