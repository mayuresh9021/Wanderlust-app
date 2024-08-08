const mongoose = require("mongoose");
const initData =require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

// const initDB = async ()=>{
//      await Listing.deleteMany({});
//      const listingsWithImageURL= initData.data.map((obj)=>({
//         ...obj,
//         owner:"65a13cb908c1bfcccd319d2a",
//         image: { url: obj.image.url, filename: obj.image.filename },
//     }))
//      await Listing.insertMany(listingsWithImageURL);
//      console.log("data was initialized");
// };
// const initDB = async () => {
//     await Listing.deleteMany({});
//     const listingsWithImageURL = initData.data.map((listing) => ({
//         ...listing,
//         image: listing.image.url,
//     }));
//     await Listing.insertMany(listingsWithImageURL);
//     console.log("data was initialized");
// };
const initDB = async () => {
    try {
        await Listing.deleteMany({});
        const listingsWithImageURL = initData.data.map((obj) => ({
            ...obj,
            owner: "65a13cb908c1bfcccd319d2a",
            image: `${obj.image.url}/${obj.image.filename}`,
        }));

        console.log("Listings with Image URL:", listingsWithImageURL);

        await Listing.insertMany(listingsWithImageURL);
        console.log("Data was initialized");
    } catch (error) {
        console.error("Error initializing data:", error);
    }
};


initDB();

