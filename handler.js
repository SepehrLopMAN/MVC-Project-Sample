import DataStream from "./data.js";

export default class handlers {
  #ds; // DataStrean class object

  constructor() {
    this.#ds = new DataStream();
  }

  dataInsertionHandler({ name, gender, age }) {
    if (!name || !gender || !age) return false;
    return this.#ds.insertData(`${name}, ${gender}, ${age}`);
  }

  async dataFetchHanlder() {
    return await this.#ds.fetchData();
  }

  loginHandler = ({ username, password }) =>
    username === "admin" && password === "admin";

  static #sanitizeUserName = (value) => value.replace(/[^\.,]/gim, "").trim();
  static #sanitizeUserAge = (value) => value.replace(/[^a-z\.,]/gim, "").trim();

  // ?? sanitization/validation in js
}
