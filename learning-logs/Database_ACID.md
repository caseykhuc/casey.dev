---
Date: 2024-03-31
tags:
  - note
  - pro
  - learning-log
source:
  - https://retool.com/blog/whats-an-acid-compliant-database
---
#### Related
- [[Database]]
#### Takeaways
### What is it and why do we need it?
- ACID
	- Definition
		- 📖
			- **Transactional** standards to ensure **<mark style="background: #BBFABBA6;">data integrity</mark>** and keep your users from seeing wrong or stale data.
- Database **transaction**
	- Series of logically grouped DB **operations**
- Example of errors (something gone wrong in the middle of transaction) - defined in [SQL standard](https://en.wikipedia.org/wiki/Isolation_(database_systems)?ref=retool-blog.ghost.io#Read_phenomena)
	- **Dirty reads**
		- ![[Pasted image 20240331012621.png]]
		- -> Dirty read happens if transaction 2 reads the token before trans 1 completes
	- **Non-Repeatable Reads**
		- Transaction 1: 2 reads of the same record
		- Transaction 2: Update the record
		- ![[Pasted image 20240331012948.png]]
		- -> Non-repeatable read happens if the 2 reads in transaction 1 are not the same

<mark style="background: #ABF7F7A6;">ACID is the solution for those</mark> [read phenomena](https://vladmihalcea.com/a-beginners-guide-to-acid-and-database-transactions/?ref=retool-blog.ghost.io) #to-read

- Popular relational DB (MySQL, Postgre) are ACID-compliant
- ACID are 4 principles, but come down to only **completeness** and **concurrency**
- The 4 rules
	- **Atomicity**: "all or nothing" - transaction happens completely or nothing at all
	- **Consistency**: data is consistent before and after a transaction
	- **Isolation**: multiple transactions can happen concurrently without reading the wrong data
	- **Durability**: transactional success is robust to system failure
### How SQL DB actually implement those properties?
- Solution: **Locking**
	- Definition
		- 📖
			- Keep the database on hold while transactions happen.
		- 🤔
			- One set of data is currently being queried / modify by **only 1 transaction at most**
			- Cocurrency is satisfied, only not with the same data
		- => If 1st transaction succeeds, the 2nd one get new data. Else, old data => Everything or nothing, hence data integrity
### How about [[Database_NoSQL]]?
- The problem
	- NoSQL DBs are built with distributed system
	- can't ensure transactional consistency (the [[Distributed data store_CAP theorem]])
- Solution: **BASE**
	- Definition
		- 📖: A weak (soft) consistency model that relaxes some of the assumptions of ACID in order to achieve scalability
			- **Basic Availability**: DB will work most of the time
			- **Soft-State**: nodes of database aren't necessarily consistent with each other all the time
			- **Eventual Consistency**: data across nodes won't be consistent all the time, but eventually will
		- 🤔
			- A standard we settle for in place of ACID when using NoSQL
			- Want good availability -> accept good-enough consistency (only applied for distributed SQL DB)
#### Concept
- [[C_Commiting]]
- [[C_Lock]]
#### Summary
#### Personal thoughts
#### To learn more
- Consistency in [[Distributed data store_CAP theorem]] and Consistency in [[Database_ACID]] http://www.bailis.org/blog/linearizability-versus-serializability/
