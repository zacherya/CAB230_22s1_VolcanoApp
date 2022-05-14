export default class DataRequestService {
    constructor() {
        this.data = {};
        this.data.volcanoes = [];
        this.data.volcanoes.push({
            id: 1,
            name: "Mount Fuji",
            description: "The highest volcano in Japan",
            lat: 35.3608,
            lng: 138.7271,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Mount_Fuji_from_Hakone_Park.jpg/1200px-Mount_Fuji_from_Hakone_Park.jpg"
        });
        this.data.volcanoes.push({
            id: 2,
            name: "Mount Etna",
            description: "The highest volcano in Italy",
            lat: 37.5667,
            lng: 14.75,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Etna_Volcano_from_the_Island_of_Etna.jpg/1200px-Etna_Volcano_from_the_Island_of_Etna.jpg"
        });
        this.data.volcanoes.push({
            id: 3,
            name: "Mount Yasur",
            description: "The highest volcano in Turkey",
            lat: 38.7167,
            lng: 27.9667,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Yasur_Volcano.jpg/1200px-Yasur_Volcano.jpg"
        });
        this.data.volcanoes.push({
            id: 4,
            name: "Mount Krakatau",
            description: "The highest volcano in Indonesia",
            lat: -6.9167,
            lng: 107.6,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Krakatau_Volcano.jpg/1200px-Krakatau_Volcano.jpg"
        });
    }
    getVolcanoes() {
        return this.data.volcanoes;
    }
    getVolcano(id) {
        return this.data.volcanoes.find(v => v.id === id);
    }
    
}