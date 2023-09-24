import inquirer from "inquirer";

export default class UCLI {
  mainInterface() {
    // console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "option",
          message: "Select an option:",
          choices: ["Input", "Login", "Quit"],
        },
      ])
      .then(({ option }) => {
        switch (option) {
          case "Input":
            this.newInput();
            break;
          case "Login":
            this.login();
            break;
          case "Quit":
            process.exit(0);
          default:
            throw Error("Invalid option!!");
        }
      })
      .catch((err) => console.error(err));
  }
  async newInput() {
    // console.log("newInput Triggered!");
    await inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter your name: (Alphabetical characters only!)",
          validate: (val) => {
            if (!val.trim().match(/^[a-zA-Z ]+$/g))
              return "Please enter alphabetical characters only!";
            return true;
          },
        },
        {
          type: "list",
          name: "gender",
          message: "Select your gender!",
          choices: ["male", "female", "non-binary"],
        },
        {
          type: "input",
          name: "age",
          message: "Enter your age: (Numbers only!)",
          validate: (val) => {
            if (isNaN(+val)) return "Please enter numbers only!";
            return true;
          },
        },
      ])
      .then(({ name, gender, age }) => {
        console.log(`${name} ${gender} ${age}`);
        /* TODO -> validation and insetrtion in DB */
        console.log("Success!");
      })
      .catch((err) => console.error(err));

    this.mainInterface();
    return;
  }
  async login() {
    // console.log("login Triggered!");
    await inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "Username:",
        },
        {
          type: "password",
          name: "password",
          message: "Password:",
          mask: true,
        },
      ])
      .then(({ username, password }) => {
        console.log(`${username} ${password}`);
        /* TODO -> validation and Login procces */
      })
      .catch((err) => console.error(err));
    this.mainInterface();
    return;
  }
}
