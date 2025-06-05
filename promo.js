
const promo = {
    'Artist_1': {
        promo1 : {
            debut: '01/07/2026',
            fin : '10/07/2026',
            region: 'Île-de-France',
            dates : 10,
            reservations : {
                '01/07/2026': {
                    location: "18 rue Eugène Varlin, 94800 Villejuif",
                    client: "Ville de Villejuif"
                },
                '04/07/2026': {
                    location: "456 avenue des Champs, 75008 Paris",
                    client: "Ville de Paris"
                },
                '07/07/2026': {
                    location: "46 rue de Mareil 78112 Saint-Germain-en-Laye",
                    client: "Mairie de Saint-Germain-en-Laye"
                },
            },
            description: 'Profitez de notre promotion estivale pour découvrir les meilleurs artistes de la scène musicale française ! Réservez dès maintenant vos places pour des concerts inoubliables à Paris et dans toute l\'Île-de-France.',
            image: 'promo.jpg',
            paliers : {
                0: {
                    prix: 10,
                    description: 'Reduction de 10% sur le prix normal',
                },
                5: {
                    prix: 20,
                    description: 'Réduction de 20% sur le prix normal',
                },
                8: {
                    prix: 30,
                    description: 'Réduction de 30% sur le prix normal',
                }
            }
        }
    }
}

export default promo;
// Note: This code snippet is a mock implementation of a promotional offer for an artist.
// It includes a promotion for an artist with specific dates, region, and reservation details.