/*Returns the author object that has the matching ID.*/
function findAuthorById(authors, id) {
  let authorMatch = {}; //author object that will be returned, should match id's
  authors.find(author => {
    if (author.id === id) {
      authorMatch = author; //set object to return to author object
    }
  });
    return authorMatch;
  }

/*Returns the book object that has the matching ID.*/
function findBookById(books, id) {
  let bookMatch = {}; //book object that will be returned, should match id's
  books.find(book => {
    if (book.id === id) {
      bookMatch = book; //set object to return to book object
    }
  });
  return bookMatch;
}

/*Returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array. */
function partitionBooksByBorrowedStatus(books) {
  let allBooks = []; //array will hold 2 arrays, one is books checked out and other is books available
  let tempCheckedOut = [];
  let booksCheckedOut = []; //books currently checked out
  let booksAvailable = []; //books that are available
  
  books.filter(book => {
    if (book.borrows.find(borrow => 
        borrow.returned === false)) {
        tempCheckedOut.push(book);
    }
     else {
        booksAvailable.push(book);
     }
  });
  
  booksCheckedOut = tempCheckedOut.map(book => book);
  
  allBooks = [booksCheckedOut, booksAvailable];
  return allBooks;
}

/*Helper function that returns a trimmed array */
function sliceArray(array, trimStart, trimEnd) {
  return array.slice(trimStart,trimEnd);
}
/*Should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.*/
function getBorrowersForBook(book, accounts) {
  let accountsInBorrows = [];
  
  accounts.forEach(account => {
    book.borrows.forEach(borrow => {
      if (borrow.id === account.id) {
         account['returned'] = borrow.returned;
         accountsInBorrows.push(account);
      }
    });
  });
  
  if (accountsInBorrows.length > 10) {
  return sliceArray(accountsInBorrows, 0, 10);
  }
  return accountsInBorrows;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  sliceArray,
  getBorrowersForBook,
};
