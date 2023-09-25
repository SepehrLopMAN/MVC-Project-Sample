import { existsSync, createWriteStream, createReadStream, writeFile } from "fs";
import { parse } from "csv-parse";

export default class DataStream {
  static #db_path = "./db/db.csv";
  constructor() {
    if (!existsSync(DataStream.#db_path)) {
      writeFile(
        DataStream.#db_path,
        "Name, Gender, Age\n",
        { flag: "wx" },
        function (err) {
          if (err) throw err;
        }
      );
    }
  }
  insertData(value) {
    try {
      let stream = createWriteStream(DataStream.#db_path, {
        flags: "a+",
      });
      stream.write(`${value}\n`);
      stream.end();
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  fetchData() {
    let res = [];
    return new Promise((resolve, reject) => {
      createReadStream(DataStream.#db_path)
        .pipe(parse({ delimiter: ", ", from_line: 2 }))
        .on("error", function (error) {
          reject(error);
        })
        .on("data", function (row) {
          res.push({ name: row[0], gender: row[1], age: row[2] });
        })
        .on("end", function () {
          resolve(res);
        });
    });
  }
}
