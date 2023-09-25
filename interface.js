import inquirer from "inquirer";
import handlers from "./handler.js";

export default class UCLI {
  #hanlderUtils;

  constructor() {
    this.#hanlderUtils = new handlers();
  }
  mainInterface() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "option",
          message: "Select an option:",
          choices: ["Input", "Data Report", "Quit"],
        },
      ])
      .then(({ option }) => {
        switch (option) {
          case "Input":
            this.newInput();
            break;
          case "Data Report":
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
    await inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter your name: (Alphabetical characters only!)",
          validate: (val) => {
            if (!val.match(/^[a-zA-Z ]+$/g))
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
      .then((data) => {
        if (this.#hanlderUtils.dataInsertionHandler(data)) {
          console.log("\n\tSuccess!\n");
        } else {
          console.log("\n\tSomething went wrong!\n");
        }
      })
      .catch((err) => console.error(err));

    this.mainInterface();
    return;
  }
  async login() {
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
      .then(async (data) => {
        if (this.#hanlderUtils.loginHandler(data)) {
          console.log("\n\tLogin was successful!\n");
          await this.#hanlderUtils
            .dataFetchHanlder()
            .then((data) => console.table(data));
        } else {
          console.error("\n\tLogin Failed, Access Denied!\n");
        }
      })
      .catch((err) => console.error(err));
    this.mainInterface();
    return;
  }
}
