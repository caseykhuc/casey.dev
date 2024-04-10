---
Date: 2024-04-02
tags:
  - note
  - pro
source:
  - https://www.youtube.com/watch?v=HiBDZgTNpXY
---
#### Related
- [[Web development]]
#### Takeaways
### Overview - why cache is needed
- Non-cache request ![[Pasted image 20240402002951.png]]
- Consequetive calls (cache available) ![[Pasted image 20240402003040.png]]
- Benefits
	- Faster response time (reduce latency) - the obvious, most important one
	- Cuts down bandwidth #to-read 
	- Less load on server
- Cache locations
	- Browser
		- Depends on the caching header
	- Proxy cache [[Web dev_Proxy]]
	- Reverse proxy cache [[Web dev_Reverse proxy]]
### Mechanism
- HTTP Headers related
	- Caching headers
		- `expires` (stale - there for backward compatibility)
		- `pragma` (stale - there for backward compatibility)
		- `content-control`: <mark style="background: #FFF3A3A6;">important, determine the caching behavior</mark>
			- Private: can only cache in browser
			- Public: can cache for multiple user, in proxies
			- no-store: no cache-able
			- no-cache: can be cache, but always requires validation before use
			- max-age
			- must-revalidate: never serve stale content 
				- without this, sometime client will server stale content if server is down
			- proxy-revalidate
			-  
	- Validators => used by client to know if cache content is usable
		- `etag`![[Pasted image 20240402005525.png]]
			- entity tag
			- act as resource unique identifier
		- `if-none-match`: <mark style="background: #FFF3A3A6;">sent by client</mark> - [official RFC doc](https://www.rfc-editor.org/rfc/rfc9110.html#name-etag)
			- After max-age, client sends `if-none-match` with ETag to server to validate
				- If new resource available: responds with new ETag, new resource
				- Else: status code 304
			- Note: weak ETag - resources may not be the same, but replacable
		- `last-modified` - [official RFC doc](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.8.2
		- `if-modified-since` <mark style="background: #FFF3A3A6;">sent by client</mark>
			- similar to the etag - client sends `last-modified` to validate
		- If neither `etag` nor `last-modified` are in response header -> no validation request
			- request for fresh content is fired as soon as the content gets stale
### Caching Strategy 
- #to-read ![[Pasted image 20240403102522.png]]
- []()
#### Summary
- Concepts
	- Stale content: cached content, expired
	- Fresh content: cached, usable
	- Cache validation: contacting server to check the validity (whether it's expired). Normally validation also gets updated content if the checked one is expired.
	- Cache invalidation: remove stale content in cache
#### Personal thoughts
- How server generates etag? Is there any automatic mechanism?
- `ETag` and `Last-modified` have the same purpose, but different sematic.
	- `ETag` - information is hidden from the client
	- `Last-modified` - transparent
- Why need `etag` and `last-modified` (validators)
	- well without them, server don't know what's in the cache, therefore reuse cache content after the max-age time is not possible
	- simply put, it's a way to reuse the cache even more after the max-age (some hour)
		- if a resource is barely modified, each few hour, client will validate cache with only a light request (<mark style="background: #FFF3A3A6;">only response status code - no REAL image got sent</mark>) -> still save the bandwidth and latency