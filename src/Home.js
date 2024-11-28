import React, { useState } from "react";
import tutors from "./tutors/Tutors";
import TutorCard from "./tutors/TutorCard";

function Home({ user, goToTutorPage }) {
    const [language, setLanguage] = useState("");
    const [country, setCountry] = useState("");
    const [priceRange, setPriceRange] = useState([0, 50]);
    const [sortOption, setSortOption] = useState("");

    // Get unique languages and countries for dropdown menus
    const languages = [...new Set(tutors.map((tutor) => tutor.language))];
    const countries = [...new Set(tutors.map((tutor) => tutor.country))];

    // Filter and sort tutors
    const filteredTutors = tutors
        .filter(
            (tutor) =>
                (!language || tutor.language === language) &&
                (!country || tutor.country === country) &&
                tutor.price >= priceRange[0] &&
                tutor.price <= priceRange[1]
        )
        .sort((a, b) => {
            if (sortOption === "bestReviews") return b.rating - a.rating;
            if (sortOption === "lowToHigh") return a.price - b.price;
            if (sortOption === "highToLow") return b.price - a.price;
            return 0;
        });

    return (
        <div>
            <h1>Welcome, {user.fullName || "User"}!</h1>
            <p>You are logged in with email: {user.email}</p>
            <h2>Search for Tutors</h2>

            {/* Search Filters */}
            <div style={{ marginBottom: "20px" }}>
                {/* Language Dropdown */}
                <label>
                    Language:
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="">All Languages</option>
                        {languages.map((lang, index) => (
                            <option key={index} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Price Range Slider */}
                <label style={{ marginLeft: "20px" }}>
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    />
                </label>

                {/* Country Dropdown */}
                <label style={{ marginLeft: "20px" }}>
                    Country:
                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="">All Countries</option>
                        {countries.map((c, index) => (
                            <option key={index} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Sorting Options */}
                <label style={{ marginLeft: "20px" }}>
                    Sort By:
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">Default</option>
                        <option value="bestReviews">Best Reviews</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </label>
            </div>

            {/* Display Filtered and Sorted Tutors */}
            <h2>Available Tutors</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {filteredTutors.map((tutor, index) => (
                    <TutorCard key={index} tutor={tutor} onClick={() => goToTutorPage(tutor)}/>

                ))}
            </div>
        </div>
    );
}

export default Home;
