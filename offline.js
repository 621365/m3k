const offline = "offline";
const sources = [
    "KEYBOARD.HTML",
    "INFO.JSON",
    "offline.js",
    "favicon.png",
    "hd-favicon.png",
    "error.mp3",
    "horizontal.mp3",
    "music.mp3",
    "select.mp3",
    "success.mp3",
    "unselect.mp3",
    "vertical.mp3"
    
    ];
    
// Install/Refresh
self.addEventListener("install", async function (e) {
   e.waitUntil(
    caches.open(offline).then(async function(cache){
        for (items of sources) if (await cache.match(items).then(function(result) { // If items in source cache, delete it.
            try {
                return result.ok;
            } catch (err) {
                return false;
            }
        })) {
            cache.delete(items);
        }
        
        return cache.addAll(sources); // Re-add sources.
    })   
    ); 
});

// Imported Cache 2.0 from GCN
self.addEventListener("fetch", async function(e) {
   e.respondWith(
       caches.match(e.request, {"ignoreSearch": true}).then(async function(response){
           try {
               return response;
           } catch (e) {
                console.warn(e);
                return (fetch(e.request) || fetch(reponse.url));
           }
       })
       ); 
});
