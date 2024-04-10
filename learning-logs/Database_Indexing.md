---
Date: 2024-03-28
tags:
  - note
source:
---
#### Related
- [[]]
#### Takeaways
## WHAT
- Special data structure to help improve db query performance. Ex: join and extract data from 2 tables with millions rows.
- Store extra data (index) for performance.
## WHY NEEDED
- Databases are internally optimised. However, only the developer knows which data queries are needed ([[Data access pattern]], needs to be perform -> create an index to do such thing. (Pre-optimised for all query are inefficient and need more storage cost)
- When data is small ( #to-search how small) - the whole thing can be loaded to memory -> no need to index
## HOW
### How it helps
- It reduces the number of record to search for
- Mostly an index is created on the column targeted by WHERE clause
- Millions record: Naive -> some seconds / with index -> milli secs
- Naive:
	- Table
		- ![[Pasted image 20240328010454.png]]
	- Select by name
		- ![[Pasted image 20240328010505.png]]
		- Possible_keys NULL meaning no indeces found, key means none used
- Primary key -> primary index -> try adding to "phone_no"
	- Added index
		- ![[Pasted image 20240328010814.png]]
	- Search by phone (primary key)
		- ![[Pasted image 20240328010912.png]]
	- => PRIMARY key is used. Only 1 row scanned (see column `rows`)
- => Essentially reduces search scope at the cost of extra **space**
### Create index on column (not primary key) [[C_Secondary index]]
- Without index -> scan the whole thing ~ **3 seconds**
	- ![[Pasted image 20240328160136.png]]
	- ![[Pasted image 20240328160224.png]]
- With index -> Bitmap Heap scan -> **some 10 milliseconds**
	- Create -> slow, since we need to generate a BTree
		- ![[Pasted image 20240328160025.png]]
		- ![[Pasted image 20240328160259.png]]
- With index, but not search equal (**name = "Zs"**), this time search matching (**name like "%Zs%"**) -> <mark style="background: #FFF3A3A6;">slow again</mark> -> [[C_Trigram Index]]

Normally, (in MySQL - InnoDB) primary key is stored with every index -> pulling primary + indexed column (ex: name) would be fast.
### What to index
#### Summary
## Concept
- [[C_Index]]
	- Definition (above)
		- 📖 (quote)
			- A database index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure.
		- 🤔 Your definition
			- Special data structure to help improve db query performance.
	- Example
		- Primary key index
	- Additional information
		- Indexes do not have to fit **entirely** into RAM in all cases. [source]([http://docs.mongodb.org/manual/applications/indexes/#indexing-right-handed](http://docs.mongodb.org/manual/applications/indexes/#indexing-right-handed))
- [[C_Clustered index]] / [[C_Primary index]]
- [[C_Secondary index]]
- [[C_Heap fetch]]
	- Heap fetch = 0 means one does not have to go to heap to fetch, because it's already in the index (inline query)
		- ![[Pasted image 20240328153949.png]]
	- Takes much more time (2.5ms) if we need the **name** -> since name is not in the index, it's in the table (heap) -> need to go to disk to retrieve data
		- ![[Pasted image 20240328154141.png]]
	- 
#### Personal thoughts
