export async function loadData(dispatch) {
    const [booksRes, usersRes] = await Promise.all([
      fetch("https://api.org/books").then(r => r.json()),
      fetch("https://api.org/users").then(r => r.json())
    ]);
  
    const books = {};
    const authors = {};
  
    booksRes.response.forEach(book => {
      books[book.id] = { id: book.id, title: book.title, author_id: book.author.id };
      authors[book.author.id] = book.author;
    });
  
    const users = {};
    usersRes.response.forEach(user => {
      users[user.id] = {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        favorite_books_ids: user.favorite_books.map(b => b.id),
        favorited_at: Object.fromEntries(
          user.favorite_books.map(b => [b.id, b.favorited_at])
        )
      };
  
      
      user.favorite_books.forEach(book => {
        if (!books[book.id]) {
          books[book.id] = { id: book.id, title: book.title, author_id: book.author.id };
        }
        if (!authors[book.author.id]) {
          authors[book.author.id] = book.author;
        }
      });
    });
  
    dispatch({ type: "LOAD_DATA", payload: { books, authors, users } });
  }
  