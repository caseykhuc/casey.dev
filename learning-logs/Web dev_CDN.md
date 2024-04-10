---
Date: 2024-04-03
tags:
  - note
  - pro
source:
  - https://www.cloudflare.com/en-ca/learning/cdn/what-is-a-cdn/
  - https://www.youtube.com/watch?v=bJ9NnLLMQ78
---
#### Related
- [[System Design]]
#### Takeaways
![[Pasted image 20240403010436.png]]
- Content Delivery Network
	- Definition
		- 📖
			- a geographically distributed group of servers that caches content close to end users
			- allows for the quick transfer of assets needed for loading Internet content, including HTML pages, JavaScript files, stylesheets, images, and videos
		- 🤔
			- a network of server
			- distributed worldwide
			- help to provide user access to static files from the closest server
	- Example
		- CAI's FE static files - served through Cloudfront - AWS CDN services
	- Additional information
		-  The majority of of web traffic is served through CDNs
		- Help protect sties from attacks - DDOS for example
- <mark style="background: #BBFABBA6;">CDNs do not host, it caches</mark> content at [network edge](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) 
- Benefit (over traditional web hosting)
	- <mark style="background: #BBFABBA6;">improve load time</mark>
	- reduced hosting bandwidth -> can handle <mark style="background: #BBFABBA6;">large traffic</mark>
<mark style="background: #ADCCFFA6;"></mark>	- security
	- availability
### Mechanism
- CDN servers are placed at [[Internet exchange points (IXPs)]]
	- Where different Internet providers connect
	- High speed, highly interconnected locations
	- -> Lower cost, lower transit time
- Data Centers of CDN are at **strategic locations** worldwide #to-read 
	- Secure
	- Designed to survive types of failures and Internet congestion
- Other tactics
	- Minification - some CDN provides [option](https://developers.cloudflare.com/speed/optimization/content/auto-minify/) to do this
	- File compression
	- In-depth how it makes web load faster - [cloudfare article](https://www.cloudflare.com/learning/cdn/performance/) #to-read 
	![[CDN hierachy architecture.canvas|CDN hierachy architecture]]
#### Summary
#### Personal thoughts
- Different between hosting bandwidth and server load?
- CDN are often large, secure and have strategic position because <mark style="background: #FFF3A3A6;">CDN providers are often big company</mark>
	- -> They pre-invest in data centers and server -> Then provide CDN as services