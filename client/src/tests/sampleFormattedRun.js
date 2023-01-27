const sampleFormattedRun = {
    "ascension_level": 5,
    "floor_reached": 56,
    "victory": true,
    "run_time": "02:22:10",
    "score": 1806,
    "score_breakdown": [
        "Floors Climbed (56): 280",
        "Enemies Slain (20): 40",
        "Exordium Elites Killed (2): 20",
        "City Elites Killed (3): 60",
        "Beyond Elites Killed (2): 60",
        "Bosses Slain (4): 500",
        "Money Money (1175): 25",
        "Collector (1): 25",
        "Librarian: 25",
        "Champion (6): 150",
        "Perfect (1): 50",
        "C-c-c-combo: 25",
        "Ascension (5): 296",
        "Heartbreaker: 250"
    ],
    "seed": "549873309889132568",
    "character": "The Silent",
    "neow_bonus": {
        "neow_bonus_chosen": {
            "original_name": "REMOVE_TWO",
            "formatted_name": "Remove 2 cards",
            "has_bonus_card": false,
            "has_bonus_relic": false,
            "bonus_cards": {
                "picked": null,
                "not_picked": null
            },
            "bonus_relic": null
        },
        "neow_cost_chosen": "Lose 10% Max HP",
        "neow_skipped": [
            {
                "original_name": "REMOVE_CARD",
                "formatted_name": "Remove a card",
                "has_bonus_card": false,
                "has_bonus_relic": false
            },
            {
                "original_name": "THREE_ENEMY_KILL",
                "formatted_name": "Enemies in your first 3 combats will have 1 HP",
                "has_bonus_card": false,
                "has_bonus_relic": true
            },
            {
                "original_name": "BOSS_RELIC",
                "formatted_name": "Obtain a random boss relic",
                "has_bonus_card": false,
                "has_bonus_relic": true
            }
        ]
    },
    "run_nodes": [
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 1,
            "current_hp": 63,
            "current_gold": 117,
            "enemies": "Small Slimes",
            "damage_taken": 0,
            "turns_taken": 4,
            "card_picked": "Heel Hook",
            "card_not_picked": [
                "Riddle With Holes",
                "Choke"
            ],
            "potion_found": "FairyPotion",
            "relics_found": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 2,
            "current_hp": 59,
            "current_gold": 133,
            "enemies": "2 Louse",
            "damage_taken": 4,
            "turns_taken": 4,
            "card_picked": "Blade Dance",
            "card_not_picked": [
                "Outmaneuver",
                "Setup"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "$",
            "type": "Shop",
            "floor": 3,
            "current_hp": 59,
            "current_gold": 20,
            "purchases": [
                "Flechettes"
            ],
            "card_removal_choice": "Strike_G"
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 4,
            "current_hp": 59,
            "current_gold": 31,
            "enemies": "Cultist",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "Leg Sweep",
            "card_not_picked": [
                "Blur",
                "Dodge and Roll"
            ],
            "potion_found": "GamblersBrew",
            "relics_found": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 5,
            "current_hp": 53,
            "current_gold": 42,
            "enemies": "2 Fungi Beasts",
            "damage_taken": 6,
            "turns_taken": 4,
            "card_picked": "SKIP",
            "card_not_picked": [
                "Finisher",
                "Unload",
                "Dagger Spray"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 6,
            "current_hp": 53,
            "current_gold": 42,
            "campfire_action": "SMITH",
            "upgraded_card": "Blade Dance"
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 7,
            "current_hp": 34,
            "current_gold": 71,
            "enemies": "3 Sentries",
            "damage_taken": 19,
            "turns_taken": 10,
            "card_picked": "Storm of Steel",
            "card_not_picked": [
                "Acrobatics",
                "Prepared"
            ],
            "potion_found": "Swift Potion",
            "relics_found": "Tough Bandages"
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 8,
            "current_hp": 34,
            "current_gold": 71,
            "campfire_action": "SMITH",
            "upgraded_card": "Storm of Steel"
        },
        {
            "orig_type": "T",
            "type": "Treasure",
            "floor": 9,
            "current_hp": 34,
            "current_gold": 149,
            "skipped_relic": false,
            "found_relic": "Toxic Egg 2"
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 10,
            "current_hp": 30,
            "current_gold": 177,
            "enemies": "Gremlin Nob",
            "damage_taken": 4,
            "turns_taken": 4,
            "card_picked": "Backflip+1",
            "card_not_picked": [
                "Dagger Throw",
                "Burst+1"
            ],
            "potion_found": null,
            "relics_found": "Happy Flower"
        },
        {
            "orig_type": "QEV",
            "type": "Event",
            "floor": 11,
            "current_hp": 30,
            "current_gold": 127,
            "cards_removed": [
                "Strike_G"
            ],
            "damage_healed": 0,
            "gold_gain": 0,
            "player_choice": "Card Removal",
            "damage_taken": 0,
            "max_hp_gain": 0,
            "max_hp_loss": 0,
            "event_name": "The Cleric",
            "gold_loss": 50
        },
        {
            "orig_type": "$",
            "type": "Shop",
            "floor": 12,
            "current_hp": 30,
            "current_gold": 59,
            "purchases": [
                "Noxious Fumes"
            ],
            "card_removal_choice": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 13,
            "current_hp": 30,
            "current_gold": 77,
            "enemies": "Exordium Thugs",
            "damage_taken": 0,
            "turns_taken": 4,
            "card_picked": "Acrobatics+1",
            "card_not_picked": [
                "Prepared+1",
                "Poisoned Stab"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 14,
            "current_hp": 30,
            "current_gold": 92,
            "enemies": "3 Louse",
            "damage_taken": 0,
            "turns_taken": 2,
            "card_picked": "Well Laid Plans",
            "card_not_picked": [
                "Underhanded Strike",
                "Dodge and Roll+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 15,
            "current_hp": 30,
            "current_gold": 92,
            "campfire_action": "SMITH",
            "upgraded_card": "Noxious Fumes"
        },
        {
            "orig_type": "BOSS",
            "type": "Boss",
            "floor": 16,
            "current_hp": 21,
            "current_gold": 195,
            "enemies": "The Guardian",
            "damage_taken": 9,
            "turns_taken": 10,
            "card_picked": "Adrenaline+1",
            "card_not_picked": [
                "Doppelganger+1",
                "A Thousand Cuts"
            ],
            "potion_found": "Fire Potion",
            "relics_found": null
        },
        {
            "orig_type": "AB",
            "type": "After Boss",
            "floor": 17,
            "current_hp": 53,
            "current_gold": 195,
            "boss_picked_relic": "Coffee Dripper",
            "boss_skipped_relic": [
                "Velvet Choker",
                "SacredBark"
            ]
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 18,
            "current_hp": 53,
            "current_gold": 206,
            "enemies": "Shell Parasite",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "SKIP",
            "card_not_picked": [
                "All Out Attack",
                "Noxious Fumes",
                "Endless Agony"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 19,
            "current_hp": 44,
            "current_gold": 226,
            "enemies": "2 Thieves",
            "damage_taken": 9,
            "turns_taken": 3,
            "card_picked": "Acrobatics+1",
            "card_not_picked": [
                "Riddle With Holes",
                "PiercingWail+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 20,
            "current_hp": 44,
            "current_gold": 241,
            "enemies": "Snecko",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "PiercingWail+1",
            "card_not_picked": [
                "Backflip+1",
                "Dagger Throw"
            ],
            "potion_found": "BlessingOfTheForge",
            "relics_found": null
        },
        {
            "orig_type": "$",
            "type": "Shop",
            "floor": 21,
            "current_hp": 44,
            "current_gold": 90,
            "purchases": [
                "SteroidPotion"
            ],
            "card_removal_choice": "Strike_G"
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 22,
            "current_hp": 44,
            "current_gold": 105,
            "enemies": "Cultist and Chosen",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "Footwork+1",
            "card_not_picked": [
                "Dagger Spray",
                "Noxious Fumes"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 23,
            "current_hp": 44,
            "current_gold": 105,
            "campfire_action": "SMITH",
            "upgraded_card": "Flechettes"
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 24,
            "current_hp": 44,
            "current_gold": 139,
            "enemies": "Slavers",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "Adrenaline+1",
            "card_not_picked": [
                "Catalyst+1",
                "Deflect+1"
            ],
            "potion_found": null,
            "relics_found": "TungstenRod"
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 25,
            "current_hp": 44,
            "current_gold": 158,
            "enemies": "Sentry and Sphere",
            "damage_taken": 0,
            "turns_taken": 2,
            "card_picked": "Tactician+1",
            "card_not_picked": [
                "Backflip+1",
                "Prepared+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "T",
            "type": "Treasure",
            "floor": 26,
            "current_hp": 44,
            "current_gold": 212,
            "skipped_relic": false,
            "found_relic": "CeramicFish"
        },
        {
            "orig_type": "QEV",
            "type": "Event",
            "floor": 27,
            "current_hp": 44,
            "current_gold": 212,
            "damage_healed": 0,
            "gold_gain": 0,
            "player_choice": "Ignored",
            "damage_taken": 0,
            "max_hp_gain": 0,
            "max_hp_loss": 0,
            "event_name": "N'loth",
            "gold_loss": 0
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 28,
            "current_hp": 44,
            "current_gold": 247,
            "enemies": "Gremlin Leader",
            "damage_taken": 0,
            "turns_taken": 4,
            "card_picked": "Expertise+1",
            "card_not_picked": [
                "Footwork",
                "Flechettes+1"
            ],
            "potion_found": null,
            "relics_found": "Blood Vial"
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 29,
            "current_hp": 46,
            "current_gold": 271,
            "enemies": "Snecko",
            "damage_taken": 0,
            "turns_taken": 4,
            "card_picked": "Eviscerate",
            "card_not_picked": [
                "Sucker Punch",
                "Choke"
            ],
            "potion_found": "Regen Potion",
            "relics_found": null
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 30,
            "current_hp": 48,
            "current_gold": 305,
            "enemies": "Book of Stabbing",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "Calculated Gamble+1",
            "card_not_picked": [
                "Dodge and Roll+1",
                "Infinite Blades"
            ],
            "potion_found": "GamblersBrew",
            "relics_found": "Singing Bowl"
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 31,
            "current_hp": 50,
            "current_gold": 334,
            "enemies": "Snake Plant",
            "damage_taken": 0,
            "turns_taken": 2,
            "card_picked": "Backflip+1",
            "card_not_picked": [
                "Leg Sweep+1",
                "Slice"
            ],
            "potion_found": "PowerPotion",
            "relics_found": null
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 32,
            "current_hp": 50,
            "current_gold": 334,
            "campfire_action": "SMITH",
            "upgraded_card": "Well Laid Plans"
        },
        {
            "orig_type": "BOSS",
            "type": "Boss",
            "floor": 33,
            "current_hp": 45,
            "current_gold": 440,
            "enemies": "Automaton",
            "damage_taken": 7,
            "turns_taken": 6,
            "card_picked": "Malaise+1",
            "card_not_picked": [
                "Glass Knife",
                "Doppelganger+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "AB",
            "type": "After Boss",
            "floor": 34,
            "current_hp": 64,
            "current_gold": 499,
            "boss_picked_relic": "Tiny House",
            "boss_skipped_relic": [
                "Snecko Eye",
                "Pandora's Box"
            ]
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 35,
            "current_hp": 68,
            "current_gold": 517,
            "enemies": "Orb Walker",
            "damage_taken": 0,
            "turns_taken": 1,
            "card_picked": "Singing Bowl",
            "card_not_picked": [
                "Underhanded Strike+1",
                "Distraction+1",
                "Dagger Throw+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "QM",
            "type": "Unknown / Monster",
            "floor": 36,
            "current_hp": 70,
            "current_gold": 541,
            "enemies": "3 Shapes",
            "damage_taken": 0,
            "turns_taken": 2,
            "card_picked": "Deflect+1",
            "card_not_picked": [
                "Footwork+1",
                "Tactician+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "QEV",
            "type": "Event",
            "floor": 37,
            "current_hp": 70,
            "current_gold": 541,
            "damage_healed": 0,
            "gold_gain": 0,
            "player_choice": "Ignored",
            "damage_taken": 0,
            "max_hp_gain": 0,
            "max_hp_loss": 0,
            "event_name": "SecretPortal",
            "gold_loss": 0
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 38,
            "current_hp": 69,
            "current_gold": 568,
            "enemies": "Jaw Worm Horde",
            "damage_taken": 1,
            "turns_taken": 3,
            "card_picked": "Accuracy+1",
            "card_not_picked": [
                "Flying Knee",
                "Poisoned Stab"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "$",
            "type": "Shop",
            "floor": 39,
            "current_hp": 69,
            "current_gold": 330,
            "purchases": [
                "Membership Card",
                "Setup+1"
            ],
            "card_removal_choice": "Strike_G"
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 40,
            "current_hp": 69,
            "current_gold": 330,
            "campfire_action": "SMITH",
            "upgraded_card": "Eviscerate"
        },
        {
            "orig_type": "$",
            "type": "Shop",
            "floor": 41,
            "current_hp": 69,
            "current_gold": 128,
            "purchases": [
                "Molten Egg 2"
            ],
            "card_removal_choice": "Defend_G"
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 42,
            "current_hp": 70,
            "current_gold": 168,
            "enemies": "Nemesis",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "Reflex+1",
            "card_not_picked": [
                "Poisoned Stab+1",
                "Tactician+1"
            ],
            "potion_found": null,
            "relics_found": "Frozen Egg 2"
        },
        {
            "orig_type": "T",
            "type": "Treasure",
            "floor": 43,
            "current_hp": 70,
            "current_gold": 195,
            "skipped_relic": true,
            "found_relic": "Skipped Oddly Smooth Stone for Blue Key (Skipped relic not available for old runs)"
        },
        {
            "orig_type": "QM",
            "type": "Unknown / Monster",
            "floor": 44,
            "current_hp": 70,
            "current_gold": 224,
            "enemies": "Sphere and 2 Shapes",
            "damage_taken": 0,
            "turns_taken": 2,
            "card_picked": "Blur+1",
            "card_not_picked": [
                "Grand Finale+1",
                "Prepared+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 45,
            "current_hp": 70,
            "current_gold": 252,
            "enemies": "Maw",
            "damage_taken": 0,
            "turns_taken": 5,
            "card_picked": "Acrobatics+1",
            "card_not_picked": [
                "Well Laid Plans+1",
                "Cloak And Dagger+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 46,
            "current_hp": 70,
            "current_gold": 273,
            "enemies": "Transient",
            "damage_taken": 0,
            "turns_taken": 5,
            "card_picked": "Noxious Fumes+1",
            "card_not_picked": [
                "Underhanded Strike+1",
                "Footwork+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 47,
            "current_hp": 72,
            "current_gold": 305,
            "enemies": "Reptomancer",
            "damage_taken": 0,
            "turns_taken": 4,
            "card_picked": "Singing Bowl",
            "card_not_picked": [
                "Bane+1",
                "Flying Knee+1",
                "Deadly Poison+1"
            ],
            "potion_found": null,
            "relics_found": "Sundial"
        },
        {
            "orig_type": "M",
            "type": "Monster",
            "floor": 48,
            "current_hp": 74,
            "current_gold": 320,
            "enemies": "Sphere and 2 Shapes",
            "damage_taken": 0,
            "turns_taken": 2,
            "card_picked": "Singing Bowl",
            "card_not_picked": [
                "Poisoned Stab+1",
                "Expertise+1",
                "Dagger Spray+1"
            ],
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 49,
            "current_hp": 74,
            "current_gold": 320,
            "campfire_action": "RECALL",
            "upgraded_card": null
        },
        {
            "orig_type": "BOSS",
            "type": "Boss",
            "floor": 50,
            "current_hp": 67,
            "current_gold": 320,
            "enemies": "Time Eater",
            "damage_taken": 7,
            "turns_taken": 10,
            "card_picked": null,
            "card_not_picked": null,
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "AB",
            "type": "After Boss",
            "floor": 51,
            "current_hp": 72,
            "current_gold": 320,
            "boss_picked_relic": null,
            "boss_skipped_relic": null
        },
        {
            "orig_type": "R",
            "type": "Rest Site",
            "floor": 52,
            "current_hp": 72,
            "current_gold": 320,
            "campfire_action": "SMITH",
            "upgraded_card": "Leg Sweep"
        },
        {
            "orig_type": "$",
            "type": "Shop",
            "floor": 53,
            "current_hp": 74,
            "current_gold": 124,
            "purchases": [
                "Orrery",
                "Tools of the Trade+1"
            ],
            "card_removal_choice": "Defend_G"
        },
        {
            "orig_type": "E",
            "type": "Elite",
            "floor": 54,
            "current_hp": 78,
            "current_gold": 157,
            "enemies": "Shield and Spear",
            "damage_taken": 0,
            "turns_taken": 3,
            "card_picked": "Singing Bowl",
            "card_not_picked": [
                "Slice+1",
                "Crippling Poison+1",
                "Noxious Fumes+1"
            ],
            "potion_found": null,
            "relics_found": "Paper Crane"
        },
        {
            "orig_type": "BOSS",
            "type": "Boss",
            "floor": 55,
            "current_hp": 78,
            "current_gold": 157,
            "enemies": "The Heart",
            "damage_taken": 0,
            "turns_taken": 10,
            "card_picked": null,
            "card_not_picked": null,
            "potion_found": null,
            "relics_found": null
        },
        {
            "orig_type": "AB",
            "type": "After Boss",
            "floor": 56,
            "boss_picked_relic": null,
            "boss_skipped_relic": null
        }
    ],
    "final_deck": [
        {
            "base_card_name": "Defend",
            "card_name": "Defend",
            "copies": 2,
            "card_upgrade": 0
        },
        {
            "base_card_name": "Survivor",
            "card_name": "Survivor",
            "copies": 1,
            "card_upgrade": 0
        },
        {
            "base_card_name": "Neutralize",
            "card_name": "Neutralize+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Heel Hook",
            "card_name": "Heel Hook",
            "copies": 1,
            "card_upgrade": 0
        },
        {
            "base_card_name": "Blade Dance",
            "card_name": "Blade Dance+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Flechettes",
            "card_name": "Flechettes+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Leg Sweep",
            "card_name": "Leg Sweep+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Storm of Steel",
            "card_name": "Storm of Steel+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Backflip",
            "card_name": "Backflip+",
            "copies": 2,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Noxious Fumes",
            "card_name": "Noxious Fumes+",
            "copies": 2,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Acrobatics",
            "card_name": "Acrobatics+",
            "copies": 4,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Well Laid Plans",
            "card_name": "Well Laid Plans+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Adrenaline",
            "card_name": "Adrenaline+",
            "copies": 2,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Piercing Wail",
            "card_name": "Piercing Wail+",
            "copies": 2,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Footwork",
            "card_name": "Footwork+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Tactician",
            "card_name": "Tactician+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Expertise",
            "card_name": "Expertise+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Eviscerate",
            "card_name": "Eviscerate+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Calculated Gamble",
            "card_name": "Calculated Gamble+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Malaise",
            "card_name": "Malaise+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Deflect",
            "card_name": "Deflect+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Accuracy",
            "card_name": "Accuracy+",
            "copies": 2,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Setup",
            "card_name": "Setup+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Reflex",
            "card_name": "Reflex+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Blur",
            "card_name": "Blur+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Prepared",
            "card_name": "Prepared+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Envenom",
            "card_name": "Envenom+",
            "copies": 1,
            "card_upgrade": 1
        },
        {
            "base_card_name": "Tools of the Trade",
            "card_name": "Tools of the Trade+",
            "copies": 1,
            "card_upgrade": 1
        }
    ],
    "relics_obtained": [
        {
            "relic_name": "Tiny House",
            "floor_found": 34,
            "relic_stats": null
        },
        {
            "relic_name": "Happy Flower",
            "floor_found": 10,
            "relic_stats": [
                34
            ]
        },
        {
            "relic_name": "Singing Bowl",
            "floor_found": 30,
            "relic_stats": [
                10
            ]
        },
        {
            "relic_name": "CeramicFish",
            "floor_found": 26,
            "relic_stats": [
                162
            ]
        },
        {
            "relic_name": "Frozen Egg 2",
            "floor_found": 42,
            "relic_stats": null
        },
        {
            "relic_name": "Paper Crane",
            "floor_found": 54,
            "relic_stats": null
        },
        {
            "relic_name": "Blood Vial",
            "floor_found": 28,
            "relic_stats": [
                15
            ]
        },
        {
            "relic_name": "Tough Bandages",
            "floor_found": 7,
            "relic_stats": [
                2178
            ]
        },
        {
            "relic_name": "Sundial",
            "floor_found": 47,
            "relic_stats": [
                18
            ]
        },
        {
            "relic_name": "Orrery",
            "floor_found": 53,
            "relic_stats": null
        },
        {
            "relic_name": "Molten Egg 2",
            "floor_found": 41,
            "relic_stats": null
        },
        {
            "relic_name": "Coffee Dripper",
            "floor_found": 17,
            "relic_stats": null
        },
        {
            "relic_name": "Membership Card",
            "floor_found": 39,
            "relic_stats": [
                540
            ]
        },
        {
            "relic_name": "Toxic Egg 2",
            "floor_found": 9,
            "relic_stats": null
        },
        {
            "relic_name": "TungstenRod",
            "floor_found": 24,
            "relic_stats": [
                4
            ]
        },
        {
            "relic_name": "Ring of the Snake",
            "floor_found": 0,
            "relic_stats": [
                64
            ]
        }
    ]
}

export default sampleFormattedRun