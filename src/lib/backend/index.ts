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
    photoUrl: "https://static.wirtualnemedia.pl/media/top/NOWY%20HARNAS_butelka655.jpg",
    name: "Piwo Harnaś"
},{
    id: "2",
    photoUrl: "https://sklep-domwhisky.pl/pol_pl_Jagermeister-35-1-0l-13016_2.jpg",
    name: "Likier ziołowy Jaegermeister"
},
);


const shops = new Array<Shop>({
    productIds: ["1"],
    location: { latitude: 52.238572830930586, longitude: 21.106051282983003 },
    name: "Monopolowy u Marcina",
    googleMapsLink: "https://goo.gl/maps/AT94mRaY5HxV5sqq6",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/1280px-Flag_of_Armenia.svg.png"
});

// search returns shops in given distance from the location which have all selected products.
export async function search(location: Location, distance: number, products: ProductId[]): Promise<Shop[]> {
    console.log("[BACKEND] Searching for shops: ", location, distance, products)
    const shopsInLoc = getShops(location, distance);
    console.log("[BACKEND] shops in loc: ", shopsInLoc)
    return shopsInLoc.filter(shop => hasAll(shop, products))
}

// returns all products mathing the search phrase.
export async function getMatchingProducts(searchPhrase: string): Promise<Product[]> {
    return products.filter((prod) => prod.name.toLowerCase().includes(searchPhrase.toLowerCase()))
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
    const Δλ = (location2.longitude - location.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d;
}