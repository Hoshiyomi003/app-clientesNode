import mysql from 'mysql2';


export const pool = mysql.createPool({
  host:"clientes-db.mysql.database.azure.com", 
  user:"test2_DB", 
  password:"prueba1234!", 
  database:"clientes-db", 
  port:3306,
});
