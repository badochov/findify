export interface Location {
    latitude: number
    longitude: number
}

type ProductId = string

export interface Product {
    id: ProductId
    photoUrl: string
    name: string
}

export interface Shop {
    productIds: ProductId[]
    location: Location
    googleMapsLink: string
    name: string
    photoUrl: string
}

const products = new Array<Product>({
    id: "1",
    photoUrl: "",
    name: "piwo 1"
});


const shops = new Array<Shop>({
    productIds: ["1"],
    location: {latitude: 52.2109537, longitude: 
        20.9751821},
    name: "Monopolowy",
    googleMapsLink: "nie ma",
    photoUrl: "nie ma"
});

// search returns shops in given distance from the location which have all selected products.
export function search(location: Location, distance: number, products: ProductId[]): Shop[] {
    console.log("[BACKEND] Searching for shops: ", location, distance, products)
    const shopsInLoc = getShops(location, distance);
    console.log("[BACKEND] shops in loc: ", shopsInLoc)
    return shopsInLoc.filter(shop => hasAll(shop, products))
}

// returns all products mathing the search phrase.
export function getMatchingProducts(searchPhrase: string): Product[] {
    return products.filter((prod) => prod.name.includes(searchPhrase))
}

function getShops(location: Location, dist: number): Shop[] {
    return shops.filter((shop) => distance(shop.location, location) < dist)
}

function hasAll(shop: Shop, products: ProductId[]): boolean {
    return products.every((id) => shop.productIds.includes(id))
}

function distance(location: Location, location2: Location): number {
    // From https://www.movable-type.co.uk/scripts/latlong.html

    const R = 6371e3; // metres
    const φ1 = location.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = location2.latitude * Math.PI / 180;
    const Δφ = (location2.latitude - location2.latitude) * Math.PI / 180;
    const Δλ = (location2.longitude - location.latitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d;
}