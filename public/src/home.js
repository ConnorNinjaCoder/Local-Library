/*Returns a _number_ that represents the number of book objects inside of the array.*/
function getTotalBooksCount(books) {
  return books.reduce((totalBooks) => totalBooks = totalBooks + 1, 0);
}


/*Returns a _number_ that represents the number of account objects inside of the array.*/
function getTotalAccountsCount(accounts) {
  return accounts.reduce(totalAccounts => totalAccounts = totalAccounts + 1, 0);
}

/*Returns a _number_ that represents the number of books _that are currently checked out of the library._ This number can be found by looking at the first transaction object in the `borrows` array of each book. If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.*/
function getBooksBorrowedCount(books) {
    return books.reduce((totalBooksBorrowed, book) => {
    if (!book.borrows[0].returned) {
        totalBooksBorrowed++;
    }
     return totalBooksBorrowed;
  }, 0);
}

/*Helper function that returns a trimmed array */
function sliceArray(array, trimStart, trimEnd) {
  return array.slice(trimStart,trimEnd);
}

/*Returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.

Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

Even if there is a tie, the array should only contain no more than five objects.*/
function getMostCommonGenres(books) {
    let mostCommonGenres = [];
    let genres = [];
    let genresDuplicates = [];

    books.forEach(book => { 
        genresDuplicates.push(book.genre);
        if (!genres.includes(book.genre)) {
            genres.push(book.genre);
            mostCommonGenres.push({'name' : book.genre, 'count' : 0});
        }
    });
    
      mostCommonGenres.forEach(element => {
          let count = 0;
          genresDuplicates.forEach(duplicate => {
        if (element.name === duplicate) {
            count++;
        }
      });
      element['count'] = count;
    });

    mostCommonGenres.sort((genreA, genreB) => genreA.count > genreB.count ? -1 : 1);

    return sliceArray(mostCommonGenres, 0, 5);
  }

/*Returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.

Even if there is a tie, the array should only contain no more than five objects.*/
function getMostPopularBooks(books) {
    let mostPopularBooks = [];
    books.sort((bookA, bookB) => bookA.borrows.length > bookB.borrows.length ? -1 : 1);
  
  books.forEach(book => {
        let tempPopularBook = {'name' : book.title, 'count' :       book.borrows.length};
        mostPopularBooks.push(tempPopularBook);
     });
             
    return sliceArray(mostPopularBooks, 0, 5);
}


/*Returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.

Even if there is a tie, the array should contain no more than five objects.*/
function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach(author => {
    let count = 0;
    books.forEach(book => {
      let bookArray = [];
      if (book.authorId === author.id) {
        bookArray = book.borrows;
        count += bookArray.reduce(total => total = total + 1, 0);
      }
    });
    result.push({'name' : `${author.name.first} ${author.name.last}`, 'count' : count});
  });
  result.sort((resultA, resultB) => resultA.count > resultB.count ? -1 : 1);
  
  return sliceArray(result, 0, 5);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  sliceArray,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
