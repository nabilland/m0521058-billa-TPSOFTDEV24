var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display book page
router.get('/', function(req, res, next) {  
    dbConn.query('SELECT * FROM books JOIN categories ON books.category_id = categories.id JOIN authors ON books.author_id = authors.id ORDER BY books.id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});

router.get('/', function(req, res, next) {  
    dbConn.query('SELECT * FROM books JOIN categories ON books.category_id = categories.id JOIN authors ON books.author_id = authors.id ORDER BY books.id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });

    dbConn.query('SELECT * FROM authors ORDER BY id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});

// display add book page
router.get('/add', function(req, res, next) {   
    // dbConn.query('SELECT * FROM categories ORDER BY id desc',function(err,rows)     {
    //     if(err) {
    //         req.flash('error', err);
    //         // render to views/books/index.ejs
    //         res.render('books',{data:''});   
    //     } else {
    //         // render to views/books/index.ejs
    //         res.render('books',{data:rows});
    //     }
    // });

    // render to add.ejs
    res.render('books/add', {
        // category: '',
        title: ''
    })
})

// display add author page
router.get('/add-author', function(req, res, next) {   
    // render to add-author.ejs
    res.render('books/add-author', {
        // category: '',
        author_name: ''
    })
})

// display add author page
router.get('/add-category', function(req, res, next) {   
    // render to add-category.ejs
    res.render('books/add-category', {
        // category: '',
        name: ''
    })
})

// add a new book
router.post('/add', function(req, res, next) {    

    // let category = req.body.category;
    let title = req.body.title;
    let errors = false;

    if(title.length === 0 || category.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please choose category");
        req.flash('error', "Please enter title");
        // render to add.ejs with flash message
        res.render('books/add', {
            // category: category,
            title: title
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            // category: category,
            title: title
        }
        
        // insert query
        dbConn.query('INSERT INTO books SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('books/add', {
                    // category_id: form_data.category,
                    name: form_data.title
                })
            } else {                
                req.flash('success', 'Book successfully added');
                res.redirect('/books');
            }
        })
    }
})

// add a new author
router.post('/add-author', function(req, res, next) {    

    let author_name = req.body.author_name;
    let errors = false;

    if(author_name.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter author's name");
        // render to add.ejs with flash message
        res.render('books/add-author', {
            author_name: author_name
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            // category: category,
            author_name: author_name
        }
        
        // insert query
        dbConn.query('INSERT INTO authors SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('books/add-author', {
                    // category_id: form_data.category,
                    author_name: form_data.author_name
                })
            } else {                
                req.flash('success', 'Author successfully added');
                res.redirect('/books');
            }
        })
    }
})

// add a new category
router.post('/add-category', function(req, res, next) {    

    let name = req.body.name;
    let errors = false;

    if(name.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter category's name");
        // render to add.ejs with flash message
        res.render('books/add-category', {
            name: name
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            // category: category,
            author_name: author_name
        }
        
        // insert query
        dbConn.query('INSERT INTO authors SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('books/add-author', {
                    // category_id: form_data.category,
                    author_name: form_data.author_name
                })
            } else {                
                req.flash('success', 'Author successfully added');
                res.redirect('/books');
            }
        })
    }
})

// display edit author page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM books WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if book not found
        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + id)
            res.redirect('/books')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('books/edit', {
                title: 'Edit Book', 
                id: rows[0].id,
                title: rows[0].title
            })
        }
    })
})

// display edit author page
router.get('/edit-author/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM authors WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if author not found
        if (rows.length <= 0) {
            req.flash('error', 'Author not found with id = ' + id)
            res.redirect('/books')
        }
        // if author found
        else {
            // render to edit.ejs
            res.render('books/edit', {
                title: 'Edit Author', 
                id: rows[0].id,
                author_name: rows[0].author_name
            })
        }
    })
})

// display edit book page
router.get('/edit-category/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM categories WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if book not found
        if (rows.length <= 0) {
            req.flash('error', 'Category not found with id = ' + id)
            res.redirect('/books')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('books/edit', {
                title: 'Edit Category', 
                id: rows[0].id,
                name: rows[0].name
            })
        }
    })
})

// update book data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let title = req.body.title;
    let errors = false;

    if(title.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter title");
        // render to add.ejs with flash message
        res.render('books/edit', {
            id: req.params.id,
            title: title
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            title: title
        }
        // update query
        dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('books/edit', {
                    id: req.params.id,
                    title: form_data.title
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/books');
            }
        })
    }
})
   

router.post('/update-author/:id', function(req, res, next) {

    let id = req.params.id;
    let author_name = req.body.author_name;
    let errors = false;

    if(author_name.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter title");
        // render to add.ejs with flash message
        res.render('books/edit', {
            id: req.params.id,
            title: title
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            author_name: author_name
        }
        // update query
        dbConn.query('UPDATE authors SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('books/edit-author', {
                    id: req.params.id,
                    author_name: form_data.author_name
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/books');
            }
        })
    }
})
// delete book
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM books WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to book page
            res.redirect('/books')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! ID = ' + id)
            // redirect to book page
            res.redirect('/books')
        }
    })
})

module.exports = router;