describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: "foobar",
      username: 'foobar',
      password: 'foobar123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000');
  });

  it('shows the login form by default', function(){
    cy.contains('Username');
    cy.contains('Password')
  });

  describe('Login', function(){
    it('succeesds with the correct credentials', function(){
      cy.get('#username').type('foobar');
      cy.get('#password').type('foobar123');
      cy.get('#loginBtn').click();

      cy.contains('Logged in as foobar')
    });
    it('fails with wrong credentials', function(){
      cy.get('#username').type('foobar');
      cy.get('#password').type('foobar');
      cy.get('#loginBtn').click();

      cy.contains('Wrong username or password')

    })

    describe('When logged in', function(){
      beforeEach(function(){
        cy.login({username: 'foobar', password: 'foobar123'});
      });

      it('can create a blog', function(){
        cy.contains('New blog').click();
        cy.get('#title').type('New blog');
        cy.get('#author').type('Author Authorson');
        cy.get('#url').type('www.url.com');
        cy.get('#addBlogBtn').click();

        cy.contains('New blog');

        cy.contains('View More').click();
        cy.contains('Author Authorson')
        cy.contains('www.url.com')
      });
      it('test', function(){
        cy.contains('New blog').click();
        cy.get('#title').type('New blog');
        cy.get('#author').type('Author Authorson');
        cy.get('#url').type('www.url.com');
        cy.get('#addBlogBtn').click();

        cy.contains('View More').click();
        cy.get('.likeBtn').click();
        cy.contains('1')
      });
      it('can delete a blog', function(){
        cy.contains('New blog').click();
        cy.get('#title').type('New blog');
        cy.get('#author').type('Author Authorson');
        cy.get('#url').type('www.url.com');
        cy.get('#addBlogBtn').click();

        cy.contains('New blog');

        cy.contains('View More').click();
        cy.contains('Delete').click();

        cy.get('html').should('not.contain', '.blogComp');
      });

      describe('when multiple blogs', function(){
        beforeEach(function(){
          cy.createBlog({ title: 'First blog', author: 'An Author', url: 'www.url.com', likes: 2 });
          cy.createBlog({ title: 'Second blog', author: 'An Author', url: 'www.url.com', likes: 0 });
          cy.createBlog({ title: 'Third blog', author: 'An Author', url: 'www.url.com', likes: 4 });
        });

        it.only('shows blog with most likes first', function(){

          //cy.get('.blogComp:first').children().should('contain', 'View More')
          cy.get('.blogComp:first').contains('Third blog')
          cy.get('.blogComp:last').contains('Second blog')


        })
      });
    });
  });
});