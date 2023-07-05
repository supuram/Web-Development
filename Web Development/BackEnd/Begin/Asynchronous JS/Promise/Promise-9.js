function getUser(id) {
    return new Promise((resolve, reject) => {
      // Simulating fetching user data
      setTimeout(() => {
        const users = [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
          { id: 3, name: "Bob Johnson" },
        ];
        const user = users.find((user) => user.id === id);
        if (user) {
          resolve(user);
        } else {
          reject("User not found");
        }
      }, 2000);
    });
}
  
console.log("Start");
getUser(2).then((user) => {
    console.log("User:", user);
}).catch((error) => {
    console.log("An error occurred:", error);
});