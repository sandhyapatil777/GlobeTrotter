const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const Destination = require("./models/Destination");

const destinations = [
    {
        name: "India",
        city: "",
        country: "India",
        description: "Explore the diverse culture, history and landscapes of India.",
        category: "Country",
        popular: true
    },
    {
        name: "Goa",
        city: "Goa",
        country: "India",
        description: "Famous for beaches, nightlife and Portuguese heritage.",
        category: "Beach",
        popular: true
    },
    {
        name: "Mumbai",
        city: "Mumbai",
        country: "India",
        description: "The city of dreams, famous for Bollywood and Marine Drive.",
        category: "City",
        popular: true
    },
    {
        name: "Delhi",
        city: "Delhi",
        country: "India",
        description: "Explore India's capital with historic monuments and culture.",
        category: "City",
        popular: true
    },
    {
        name: "Jaipur",
        city: "Jaipur",
        country: "India",
        description: "The Pink City, famous for forts and palaces.",
        category: "Heritage",
        popular: true
    },
    {
        name: "Manali",
        city: "Manali",
        country: "India",
        description: "A beautiful Himalayan destination known for mountains and adventure.",
        category: "Mountain",
        popular: true
    },
    {
        name: "Paris",
        city: "Paris",
        country: "France",
        description: "The City of Lights, famous for the Eiffel Tower and art.",
        category: "City",
        popular: true
    },
    {
        name: "London",
        city: "London",
        country: "United Kingdom",
        description: "A historic city famous for landmarks, museums and culture.",
        category: "City",
        popular: true
    },
    {
        name: "Dubai",
        city: "Dubai",
        country: "United Arab Emirates",
        description: "Known for luxury shopping and skyscrapers.",
        category: "City",
        popular: true
    },
    {
        name: "New York",
        city: "New York",
        country: "United States",
        description: "A global city famous for Times Square and Central Park.",
        category: "City",
        popular: true
    },
    {
        name: "Tokyo",
        city: "Tokyo",
        country: "Japan",
        description: "A vibrant city combining traditional culture and technology.",
        category: "City",
        popular: true
    },
    {
        name: "Bali",
        city: "Bali",
        country: "Indonesia",
        description: "A tropical destination famous for beaches, temples and nature.",
        category: "Beach",
        popular: true
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await Destination.deleteMany({});

        await Destination.insertMany(destinations);

        console.log("Destination data inserted successfully!");
        console.log(`${destinations.length} destinations added.`);

        process.exit(0);

    } catch (error) {
        console.error("Seed Error:", error);
        process.exit(1);
    }
};

seedDatabase();