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

const products = new Array<Product>(
    {
        id: "1",
        photoUrl: "https://static.wirtualnemedia.pl/media/top/NOWY%20HARNAS_butelka655.jpg",
        name: "Piwo Harnaś"
    },
    {
        id: "2",
        photoUrl: "https://sklep-domwhisky.pl/pol_pl_Jagermeister-35-1-0l-13016_2.jpg",
        name: "Likier ziołowy Jaegermeister"
    },
    {
        id: "3",
        photoUrl: "https://images.ctfassets.net/lcr8qbvxj7mh/4e5eSCxix7lyRPoN7L3gmw/21363f2c5bac103a91718ae4274fd13d/PL_RBED_250_Single-Unit_close_cold_ORIGINAL_canwidth528px.png",
        name: "Napój energetyczny RedBull"
    },
    {
        id: "4",
        photoUrl: "https://www.taniahurtownia.pl/userdata/public/gfx/601/Bialy-Bocian-40-500ml.jpg",
        name: "Wódka Bocian"
    },
    {
        id: "5",
        photoUrl: "https://a.allegroimg.com/s1024/0c3301/46ce8ff24f2c865c0ba09564d92b",
        name: "Chipsy Pringles Paprykowe"
    },
    {
        id: "6",
        photoUrl: "https://wodkiregionalne.pl/wp-content/uploads/2012/09/sliwowica-goralska-wodka-regionalna.png",
        name: "Śliwowica Zbójnicka"
    },
    {
        id: "7",
        photoUrl: "https://delikatesywloskie.pl/wp-content/uploads/2019/02/65.jpg",
        name: "Mąka 00 Barilla"
    },
    {
        id: "8",
        photoUrl: "https://a.allegroimg.com/original/11ddaa/3526508a4ef1b7da328751941cbb/Drozdze-do-pizzy-wloskie-Caputo",
        name: "Drożdże do Pizzy - Caputo Lievito"
    },
    {
        id: "9",
        photoUrl: "https://deli2.pl/media/catalog/product/cache/b2c1921a71e5c0d0d1855c48928a81d6/p/r/przechwytywanie_1.png",
        name: "Pomidory San Marzano - Strianese"
    },
    {
        id: "10",
        photoUrl: "https://www.wloskiklimat.pl/userdata/public/gfx/554/Kielbasa-do-smarowania-Nduja-di-Spillinga-CALIPPO-200-g.png",
        name: "Kiełbasa Nduja di Spilinga - Callipo"
    },
    {
        id: "11",
        photoUrl: "https://hurtownia-spozywcza.pl/media/products/4a268cadd7ed7e0a1881284ca3cdaacf/images/thumbnail/large_5900120060647-T1.png?lm=1601467785",
        name: "Mozzarella di latte di Bufala - Galbani"
    },
    {
        id: "12",
        photoUrl: "https://ae01.alicdn.com/kf/Ub25a23404f8c4158a1cf1bdb59acbf42r/Ser-Mozzarella-Galbani-burrata-200g-bzmj.png_.webp",
        name: "Burrata - Galbani"
    },
    {
        id: "13",
        photoUrl: "https://lunter.com/wp-content/uploads/2020/07/tofu-naturalne-pl-e1617724196276.png",
        name: "Tofu - Lunter"
    },
);


const shops = new Array<Shop>(
    {
        productIds: ["1", "2", "3", "4", "5", "6"],
        location: { latitude: 52.238572830930586, longitude: 21.106051282983003 },
        name: "Monopolowy u Marcina",
        googleMapsLink: "https://goo.gl/maps/AT94mRaY5HxV5sqq6",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/1280px-Flag_of_Armenia.svg.png"
    },
    {
        productIds: ["7", "8", "9", "10", "11", "12"],
        location: { latitude: 52.20380139905279, longitude: 20.964674780643932 },
        name: "Pizza Shop u Bartolomeo",
        googleMapsLink: "https://goo.gl/maps/J42QdH7kXB4RqyVd7",
        photoUrl: "https://imgs.search.brave.com/660tM9gK-IiU1ld7zGt7jc_86AHvlj9nK_cegd-KtGE/rs:fit:480:457:1/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzEy/OTIvNjYzMy9maWxl/cy9NYXJxdWVlX1Bp/enphX01BU0tfNDgw/eDQ4MC5qcGc_dj0x/NjA3MjkyNTU4"
    },
    {
        productIds: ["13"],
        location: { latitude: 52, longitude: 21 },
        name: "Tofu Shop",
        googleMapsLink: "https://goo.gl/maps/bB5KeFTzmbjZzAce9",
        photoUrl: "https://imgs.search.brave.com/5tXNNpKMtRSQNvoRd_NjlMYjTypwsmUrNjEu4IKbuy8/rs:fit:756:800:1/g:ce/aHR0cHM6Ly9paDEu/cmVkYnViYmxlLm5l/dC9pbWFnZS40NDkw/MTAwMTIuOTg2MC9m/bGF0LDgwMHg4MDAs/MDc1LGYudTIuanBn"
    },
    {
        productIds: products.map(p=>p.id),
        location: { latitude:  52.21190299222512, longitude: 20.982229105789465 },
        name: "WszystexPol",
        googleMapsLink: "https://goo.gl/maps/oPiuiSAg7jHJRNHP7",
        photoUrl: "https://ih1.redbubble.net/image.1278355944.2727/st,small,507x507-pad,600x600,f8f8f8.jpg",
    },
);

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