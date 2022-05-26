///<reference types="cypress" />

describe('Cadastro de ongs', ()=> {
    it.skip('deve poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register')
        //cy.get - busca um elemento
        //.type - insere um texto
        cy.get('[data-cy=name]').type('Dog queridos');
        cy.get('[data-cy=email]').type('teste@teste.com');
        cy.get('[data-cy=whatsapp]').type('12345678');
        cy.get('[data-cy=city]').type('valparaiso');
        cy.get('[data-cy=uf]').type('GO');

        //routing
        //start server com cy.server()
        //cy.server();
        //criar uma rota com cy.route()
        //atribuir rota a um alias
        cy.route('POST', '**/ongs').as('postOng');
        cy.get('[data-cy=submit]').click();
        //esperar com cy.wait e fazer uma validacao
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200)
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
           
        })
       
    });
    it.skip('deve pode realizar um login no sistema', () => {
        
        cy.visit('http://localhost:3000/profile')
        cy.get('input').type(Cypress.env('createdOngId'))
        cy.get('.button').click()
    });
    it.skip('devem poder fazer logout', () =>{
        cy.login()
        cy.get('button').click()
    })
    it.skip('devem poder cadastrar novos casos', () => {
        cy.login()
        cy.get('.button').click()
        cy.get('[placeholder="Título do caso"]').type('gadsgdsaf')
        cy.get('textarea').type('testesaeteatastst')
        cy.get('[placeholder="Valor em reais"]').type('100')
        //Post 200/incidents
        cy.route('POST', '**/incidents').as('newIncident')
        cy.get('.button').click()
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200 )
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
        })

    })
    it('devem poder excluir um caso', () => {
        cy.createdNewIncident()
        cy.login()
        cy.route('DELETE', '**/incidents/*').as('deleteIncident')
        cy.get('li > button > svg').click()
        cy.wait('@deleteIncident').then((xhr)=>{
            expect(xhr.status).to.eq(204)
            expect(xhr.response.body).to.be.empty
        })
    })
});
