---
Date: 2024-03-29
tags:
  - note
source:
  - https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one
---
#### Related
- [[Database]]
#### Takeaways
- Object-Relational Mapping
	- Definition
		- 📖
			- Technique that lets you query and manipulate data from a database using an object-oriented paradigm.
			- Most people refer ORM as a library that implements the ORM technique.
		- 🤔 personal definition
			- A design to abstract out SQL, to use OOP - class & instance to interact (query & modify) with database. 
			- `Object` -> OOP
			- `Relational` -> Relational DB
			- `Mapping` -> Map from object to relational DB
## Example
Normally
```python
sql = "SELECT * FROM books WHERE 'author' = 'Nam Cao'"
data = conn.execute(sql)
# ...
while (row = data.next())
{
     book = new Book();
     book.setAuthor(row.get('author');
     book_list.add(book);
}
```

With ORM
```python
book_list = BookTable.query(author="Linus");
```
## Why
### Pros
- Source code represents data (DRY: single source)
- Abstraction -> convenience of use
- Sanitized SQL
=> All in all, separate 
### Cons 
- Limit of customization for complex queries. Ex: Performance ops
## ORM of choice
### Python: [SQLAlchemy](https://www.sqlalchemy.org/)
- Philosophy
	- [[Design Pattern_Design mapper pattern]]
	- 
#### Summary
#### Personal thoughts