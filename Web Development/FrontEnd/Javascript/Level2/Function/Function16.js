var proto = function(a,b){
    function route(c,d){
        route.handle(c,d)
    }
    return route
}

proto.handle = function handle(c,d){
    return c*d
}
var myRoute = proto(3,4)
console.log(myRoute)

/**
*! Q)so route is a function of proto which can inherit all the characteristics of proto and handle is also a function which is attached to proto and can inherit all the characteristics of proto. so handle can call route and route can call handle as both are under proto ? Am i correct ?
*? Ans)You are mostly correct, but there's a slight clarification needed.                                 In your code, both `route` and `handle` are functions that are attached to the `proto` object. They can indeed access properties and methods of the `proto` object because they are defined within its scope. However, there's one important  distinction:                                                                                              1. `route` is a function defined within the scope of the `proto` function. It is returned from the `proto` function and can access properties and methods of the `proto` object because it's created within that scope. It doesn't have its own separate instance; it's a function defined within the `proto` function's context.                                                                                                  2. `handle` is directly attached to the `proto` object. It is a property of the `proto` object and can be accessed as `proto.handle`. It can also access properties and methods of the `proto` object because it's part of that object's properties.                                                                         So, you can think of it like this:                                                                         - `proto` is a function that defines properties and methods for the `proto` object and its instances.      - `route` is a function defined within the scope of the `proto` function and returned as part of the `proto` object. It can access properties and methods of the `proto` object.                                - `handle` is a property of the `proto` object itself. It's not created within a function scope but directly attached to the `proto` object. It can also access properties and methods of the `proto` object.

Here's a representation of the relationships:

proto
├── route (defined within the scope of proto)
└── handle (direct property of proto)

*? So, `handle` and `route` can indeed call each other as they are both part of the `proto` object's properties, and they both have access to the properties and methods of the `proto` object.

*! Q)So handle is a property of the proto object. so route can access handle ? But can handle access route, like handle.route is valid ?
*? Ans)In the code you've provided, `handle` is a property of the `proto` object, and `route` is a function defined within the scope of the `proto` function. While `route` can access `handle` using `proto.handle`, the reverse is not true. 

*? In other words, `handle.route` would not be valid because the `handle` property doesn't have any direct relationship with the `route` function.

var myRoute = proto(5, 7); // Create a new route function with a = 5 and b = 7

In this code, within the `route` function, you can access `handle` using `proto.handle`, as shown in the line `route.handle(c, d);`.

However, the `handle` function itself doesn't have a `route` property or any direct relationship with the `route` function. Therefore, `handle.route` wouldn't be a valid way to access the `route` function.

*? In summary, `route` can access `handle` using `proto.handle`, but `handle` cannot directly access `route` using `handle.route` in the context of the code you've provided.
*/