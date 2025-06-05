const artists = {
    "Artist_1": {
        "name": "The RockMasters",
        "genre": "Rock",
        "tournées" : {
            "01/07/2026": {
                "location": "18 rue Eugène Varlin, 94800 Villejuif",
                "client": "Ville de Villejuif"
            },
            "04/07/2026": {
                "location": "456 avenue des Champs, 75008 Paris",
                "client": "Ville de Paris"
            },
            "07/07/2026": {
                "location": "46 rue de Mareil 78112 Saint-Germain-en-Laye",
                "client": "Mairie de Saint-Germain-en-Laye"
            },
            "14/07/2026": {
                "location": "123 rue du moulin, 75004 Paris",
                "client": "Mairie de Paris"
            },
            "17/07/2026": {
                "location": "456 avenue des Champs, 75008 Paris",
                "client": "Ville de Paris"
            },
            "16/07/2026": {
                "location": "789 boulevard Saint-Michel, 75005 Paris",
                "client": "Université de Paris"
            },
            "11/07/2026": {
                "location": "321 rue de Lyon, 69003 Lyon",
                "client": "Mairie de Lyon"
            },
            "28/07/2026": {
                "location": "654 avenue de la République, 13001 Marseille",
                "client": "Ville de Marseille"
            },
            "29/07/2026": {
                "location": "987 place Stanislas, 54000 Nancy",
                "client": "Mairie de Nancy"
            },
            "20/07/2026": {
                "location": "123 rue de Bretagne, 44000 Nantes",
                "client": "Ville de Nantes"
            }
        }
    },
    "Artist_2": {
        "name": "Jazz Fusionists",
        "genre": "Jazz",
        "tournées": {
            "12/07/2026": {
                "location": "12 rue de la Paix, 75002 Paris",
                "client": "Salle de Concert Paris"
            },
            "18/07/2026": {
                "location": "34 avenue des Arts, 69001 Lyon",
                "client": "Théâtre de Lyon"
            },
            "05/07/2026": {
                "location": "78 rue de la Liberté, 21000 Dijon",
                "client": "Festival Dijon"
            },
            "15/07/2026": {
                "location": "90 avenue Mozart, 75016 Paris",
                "client": "Opéra de Paris"
            },
            "22/07/2026": {
                "location": "123 rue Beethoven, 67000 Strasbourg",
                "client": "Philharmonie Strasbourg"
            }
        }
    },
    "Artist_3": {
        "name": "Electro Beats",
        "genre": "Electronic",
        "tournées": {
            "15/07/2026": {
                "location": "56 boulevard Haussmann, 75009 Paris",
                "client": "Club Parisien"
            },
            "22/07/2026": {
                "location": "78 rue de la Liberté, 21000 Dijon",
                "client": "Festival Dijon"
            }
        }
    },
    "Artist_4": {
        "name": "Classical Virtuosos",
        "genre": "Classical",
        "tournées": {
            "10/07/2026": {
                "location": "90 avenue Mozart, 75016 Paris",
                "client": "Opéra de Paris"
            },
            "25/07/2026": {
                "location": "123 rue Beethoven, 67000 Strasbourg",
                "client": "Philharmonie Strasbourg"
            }
        }
    },
    "Artist_5": {
        "name": "Pop Sensations",
        "genre": "Pop",
        "tournées": {
            "13/07/2026": {
                "location": "45 rue des Étoiles, 75020 Paris",
                "client": "Stade de Paris"
            },
            "19/07/2026": {
                "location": "67 avenue des Lumières, 59000 Lille",
                "client": "Arena Lille"
            }
        }
    },
    "Artist_6": {
        "name": "Hip-Hop Legends",
        "genre": "Hip-Hop",
        "tournées": {
            "16/07/2026": {
                "location": "89 rue du Flow, 75011 Paris",
                "client": "Club Hip-Hop Paris"
            },
            "23/07/2026": {
                "location": "101 avenue des Rimes, 33000 Bordeaux",
                "client": "Festival Bordeaux"
            },
            "25/07/2026": {
                "location": "12 rue des Rimes, 75012 Paris",
                "client": "Salle Hip-Hop Paris"
            },
            "28/07/2026": {
                "location": "45 avenue des Beats, 69000 Lyon",
                "client": "Festival Hip-Hop Lyon"
            }
        }
    },
    "Artist_7": {
        "name": "Reggae Rhythms",
        "genre": "Reggae",
        "tournées": {
            "11/07/2026": {
                "location": "123 rue du Soleil, 13008 Marseille",
                "client": "Plage de Marseille"
            },
            "26/07/2026": {
                "location": "456 avenue des Palmiers, 06000 Nice",
                "client": "Festival Nice"
            },
            "30/07/2026": {
                "location": "78 rue des Tropiques, 13009 Marseille",
                "client": "Plage Reggae Marseille"
            }
        }
    },
    "Artist_8": {
        "name": "Blues Wanderers",
        "genre": "Blues",
        "tournées": {
            "14/07/2026": {
                "location": "789 rue du Delta, 44000 Nantes",
                "client": "Salle Blues Nantes"
            },
            "21/07/2026": {
                "location": "321 avenue des Notes, 76000 Rouen",
                "client": "Théâtre Rouen"
            }
        }
    },
    "Artist_9": {
        "name": "Folk Storytellers",
        "genre": "Folk",
        "tournées": {
            "17/07/2026": {
                "location": "654 rue des Contes, 25000 Besançon",
                "client": "Festival Folk Besançon"
            },
            "28/07/2026": {
                "location": "987 avenue des Légendes, 72000 Le Mans",
                "client": "Salle Folk Le Mans"
            },
            "01/07/2026": {
                "location": "123 rue des Chants, 75003 Paris",
                "client": "Festival Folk Paris"
            },
            "03/07/2026": {
                "location": "56 avenue des Ballades, 69002 Lyon",
                "client": "Salle Folk Lyon"
            },
            "18/07/2026": {
                "location": "89 boulevard des Légendes, 33000 Bordeaux",
                "client": "Festival Folk Bordeaux"
            },
            "25/07/2026": {
                "location": "34 rue des Contes, 31000 Toulouse",
                "client": "Salle Folk Toulouse"
            }
        }
    },
    "Artist_10": {
        "name": "Metal Warriors",
        "genre": "Metal",
        "tournées": {
            "20/07/2026": {
                "location": "123 rue du Tonnerre, 68000 Colmar",
                "client": "Festival Metal Colmar"
            },
            "30/07/2026": {
                "location": "456 avenue des Titans, 31000 Toulouse",
                "client": "Arena Metal Toulouse"
            }
        }
    }
}

export default artists;