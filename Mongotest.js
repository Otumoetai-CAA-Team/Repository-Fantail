var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/test";

MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    var query = { Age: "17" };

    dbo.collection("mydbcollect").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});
