import {PAGE_LOGIN} from "../../src/PathConstants";

describe('React App', () => {
    //sign
    it('sign in success', () => {
        cy.visit('/' + PAGE_LOGIN);
        cy.contains('SigmaSchedule').should('be.visible');
        cy.get('input[type="text"]').first().type('testuser');
        cy.get('input[type="password"]').type('password123');
        cy.contains('button', 'Log in').click();
        cy.pause();


    });
    it('sign in unsuccessful', () => {
    });
    it('manual registration successful', () => {
    });
    it('manual registration unsuccessful', () => {
    });
    it('invite sign up successful', () => {
    });
    it('invite sign up unsuccessful', () => {
    });

});