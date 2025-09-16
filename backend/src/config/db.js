const mongoose = require("mongoose");

(async () => {
  const MONGO_DB_URI = process.env.MONGO_DB_URI;
  if (!MONGO_DB_URI) {
    console.error("❌ MONGO_DB_URI no está definido en las variables de entorno.");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
})();