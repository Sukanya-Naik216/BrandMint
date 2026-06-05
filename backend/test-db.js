const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://naiksukanya021_db_user:Sukanya%402003@cluster0.1ryaqwn.mongodb.net/brandmint?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("CONNECTED");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});