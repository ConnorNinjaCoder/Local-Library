/*Returns account object having the matching id as the one passed through in'stringId'*/
function findAccountById(accounts, id) {
  //returns a single object from accounts object that has an 'id' matching 'stringId'
  return accounts.find((account) => account.id === id);
}

/*Returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name. */
function sortAccountsByLastName(accounts) {
  //sort objects in array of objects 'accounts' by last name a-z
  //if first account object has last name coming before second account object then return -1 else return 1
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

/*Returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.*/
function getTotalNumberOfBorrows(account, books) {
let totalBorrows = 0; //accumulator variable for number of borrows
for (let book of books) {  // loop through each object in the array then check if id of account object matches id of book in array of borrowed books
  if (book.borrows.find((borrowedBook) => borrowedBook.id === account.id)) {  
    totalBorrows++;
 }
}
return totalBorrows;
}

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



/*Returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it. */
function getBooksPossessedByAccount({id}, books, authors) {
let booksInPossession = [];

books.forEach(book => {
  if (book.borrows.find(element => element.id === id && element.returned == false)) {
        booksInPossession.push(book);
      }
});

booksInPossession.forEach(book => {
  let theAuthor = findAuthorById(authors, book.authorId);
  //authors.find(author => author.id === book.authorId);
  book['author'] = theAuthor;
});

return booksInPossession;
}


module.exports = {
findAccountById,
sortAccountsByLastName,
getTotalNumberOfBorrows,
findAuthorById,
getBooksPossessedByAccount,
};
