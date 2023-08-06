var proto = function(a,b){
    function route(c,d){
        route.handle(c,d)
    }
    route.a = {}
    route.b = []
    return route
}

proto.handle = function handle(c,d){
    return this.a.push({k:'22', l:c, s:d})
}
var myRoute = proto(3,4)
console.log(myRoute)