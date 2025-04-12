const { MongoClient } = require('mongodb');

// Replace this with your real connection string
const uri = "mongodb://nikoloco2004:125Nmmf1gsp7.@ac-rwfxkxx-shard-00-00.pshxsz5.mongodb.net:27017,ac-rwfxkxx-shard-00-01.pshxsz5.mongodb.net:27017,ac-rwfxkxx-shard-00-02.pshxsz5.mongodb.net:27017/?replicaSet=atlas-ll0757-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=budget-cluster";


// Create a MongoClient
const client = new MongoClient(uri);

// Main function
async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");

    // (Optional) Access a database and collection
    const db = client.db("budgetbuddy");         // You can change this name later
    const collection = db.collection("test");    // Sample/test collection

    // Just insert a test document
    const result = await collection.insertOne({ hello: "world" });
    console.log("📝 Inserted test document:", result.insertedId);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run();
