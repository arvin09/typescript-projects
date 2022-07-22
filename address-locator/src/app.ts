import axios from "axios";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const API_KEY = "AIzaSyAAPYZVDNyS4r4vF8yHyqPjOqDnQLH1sDI";

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
};

function submitHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    axios
        .get<GoogleGeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
                enteredAddress
            )}&key=${API_KEY}`
        )
        .then(response => {
            if(response.data.status !== "OK") {
                throw new Error(" Could not fetch location!");
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map")! as HTMLElement, {
                center: coordinates,
                zoom: 16,
            });
            // The marker, positioned at coordinates
            new google.maps.Marker({
                position: coordinates,
                map: map,
            });
        })
        .catch((err) => {
            alert(err.message);
            console.log(err);
        });
}

form.addEventListener("submit", submitHandler);
