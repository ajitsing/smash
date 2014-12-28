Smash
=====

### Smash solves following problems

1. Concurrency
2. Low latency
3. Cache


If you have a service which calls N number of services as shown in the picture, and your service is not cuncurrent
enough. Then smash is a perfect candidate for your service.

###Usage

####Without Cache

```bash
npm start

> Smash@0.0.1 start /Users/.../smash
> node app.js

Smash server listening on port 3000
```

####With Cache

```bash
CACHE=true INVALIDATE_CACHE_AFTER=3600 npm start                                                                                                                                                130 ↵

> Smash@0.0.1 start /Users/.../smash
> node app.js

[WARN] - Starting app with cache, and cache will be invalidated after 3600 seconds.
Smash server listening on port 3000
```

INVALIDATE_CACHE_AFTER should be configured in seconds. After the interval cache will be invalidated automatically.

###Payload

POST call should be made as: 

```bash
localhost:3000/smash.json
```

Smash accepts the following payload format:

```javascript
{
"urls": ["http://localhost:9199/metrics.json", "http://localhost:9299/metrics.json", ....], 
  "params": {
    "for_user": "Alpha"
  }
}
```

###Cache
To use cache you need to install the "memcached" server in the same machine where the smash is running.
Smash uses the default configureation of memcached server like port number etc.






