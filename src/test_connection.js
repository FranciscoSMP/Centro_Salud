const sql = require('mssql/msnodesqlv8');

const config = {
  server: "CRISTIAN\\SQLEXPRESS",
  database: "Centro_Salud",
  options: {
    trustedConnection: true, // Set to true if using Windows Authentication
    trustServerCertificate: true, // Set to true if using self-signed certificates
  },
  driver: "msnodesqlv8", // Required if using Windows Authentication
};

(async () => {
  try {
    await sql.connect(config);
    const result = await sql.query`select TOP 10 * from dbo.Rol`;
    console.dir(result);
  } catch (err) {
    console.error(err);
  }
})();