import knex from "knex";

export class SqlContenedor{
  constructor(o, t) {
    this.o = o;
    this.t = t;
  }

  #ConectarDb() {
    return (this.sql = knex(this.o));
  }

  async #DestroyDb() {
    return await this.sql.destroy();
  }

  async save(object) {
    try {
      this.#ConectarDb();
      return await this.sql(this.t).insert(object);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#DestroyDb();
    }
  }

  async getById(id) {
    try {
      this.#ConectarDb();
      return await this.sql(this.t).select("*").where("id", "=", id);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#DestroyDb();
    }
  }

  async update(id, newObject){
    try {
      this.#ConectartDb();
      return await this.sql(this.t).where("id", "=", id).update(newObject);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#DestroyDb();
    }
  }

  async getAll() {
    try {
      this.#ConectarDb();
      return await this.sql(this.t).select("*");
    } catch (error) {
      console.log(error);
    } finally {
      await this.#DestroyDb();
    }
  }

  async deleteById(id) {
    try {
      this.#ConectarDb();
      return await this.sql(this.t).where("id", "=", id).del();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#DestroyDb();
    }
  }

  async deleteAll() {
    try {
      this.#ConectarDb();
      return await this.sql(this.t).truncate();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#DestroyDb();
    }
  }

  async createMessagesTable() {
    try {
      this.#ConectarDb();
      await this.sql.schema.createTable("Mensaje", (table) => {
        table.increments("id").primary();
        table.string("FechaYHora", 100).notNullable();
        table.string("Email", 50).notNullable();
        table.string("Mensaje", 200).notNullable();
      });
      return "Messages table was created";
    } catch (error) {
      console.log(error);
    } finally {
      await this.#DestroyDb();
    }
  }

  async createProductsTable() {
    try {
      this.#ConectarDb();
      await this.sql.schema.createTable("Productos", (table) => {
        table.increments("id").primary();
        table.string("Titulo", 100).notNullable();
        table.float("Precio").notNullable();
        table.string("thumbnail", 200).notNullable();
      });
    } catch (error) {
    } finally {
      await this.#DestroyDb();
    }
  }
}