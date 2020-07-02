let wood = 0;
let gold = 0;
let stone = 0;
let timer = 10; // laat hem bij begin meteen de resources zien


function timertick() {
    console.log("tik"); // laat in console F12 zien wat het doet
    if (timer == 10) {
        timer = 0;
        mygold(); //hiermee roep je de function ervan op
        mywood();
        mystone();
    }
    else {
        timer++;
    }
}

function mywood() {
    $("#Wood").html(" Wood: " + wood);//hiermee stuur je hem naar html toe
    wood++;
}

function mygold() {
    $("#Gold").html(" Gold: " + gold);//hiermee stuur je hem naar html toe
    gold++;
}

function mystone() {
    $("#Stone").html(" Stone: " + stone);//hiermee stuur je hem naar html toe
    stone++;
}

function upgrade() {
    $("#Upgrade").html("Upgrade");
}

class Game {
    //gold: number = 0;
    //wood: number = 0;
    //stone: number = 0;
    Resources: Resources = new Resources(0, 0, 0, 0, 0, 0, 0, 0, 0, 0); // verwijst naar de class resources
    buildings: Building[] = [];

    constructor() {  // gold piece , villagers , food , wood , stone , gold , iron , Gems , Jewels
        this.buildings.push(new Building("House", new Resources(4, 3, 0, 0, 0, 0, 0, 0, 0, 0)/* income */, new Resources(2, 0, 0, 0, 0, 0, 0, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("Woodcutter", new Resources(0, 0, 0, 3, 0, 0, 0, 0, 0, 0)/* income */, new Resources(10, 6, 2, 0, 0, 0, 0, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("Farm", new Resources(0, 0, 3, 0, 0, 0, 0, 0, 0, 0)/* income */, new Resources(14, 10, 0, 0, 0, 0, 0, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("Quarry", new Resources(0, 0, 0, 0, 2, 0, 0, 0, 0, 0)/* income */, new Resources(0, 22, 34, 24, 0, 0, 0, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("GoldMine", new Resources(0, 0, 0, 0, 0, 1, 0, 0, 0, 0)/* income */, new Resources(0, 40, 20, 22, 150, 0, 40, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("IronMine", new Resources(0, 0, 0, 0, 0, 0, 2, 0, 0, 0)/* income */, new Resources(0, 35, 13, 15, 150, 0, 0, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("GemMine", new Resources(0, 0, 0, 0, 0, 5, 0, 5, 0, 0)/* income */, new Resources(0, 10, 0, 0, 0, 0, 0, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("JewelCrafter", new Resources(0, 0, 0, 0, 0, -100, 0, -100, 0, 0)/* income */, new Resources(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)/* cost voor upgrade */, this));
        this.buildings.push(new Building("Wonder", new Resources(0, 0, 0, 0, 0, 0, 0, 0, 0, 1)/* income */, new Resources(0, 0, 0, 0, 0, 0, 0, 0, 50, 0), this));


        //Set Me vanwege dat die 2x this in dezelfde regel hier niet kan begrijpen.
        let Me = this;

        setInterval(() => { Me.gametick(); }, 2000);
    }
    gametick() {
        this.buildings.forEach(building => {
            building.UpdateDraw();
            this.Resources = Resources.Add(this.Resources, building.DeliverIncome());
        });
        this.UpdateDraw();
    }
    UpdateDraw() {
        $("#GoldPiece").html(" Gold Piece: " + BigNumbers.ToString(this.Resources.GoldPiece));
        $("#Wood").html(" Wood: " + BigNumbers.ToString(this.Resources.Wood));
        $("#Stone").html(" Stone: " + BigNumbers.ToString(this.Resources.Stone));
        $("#Food").html(" Food: " + BigNumbers.ToString(this.Resources.Food));
        $("#Villagers").html(" Villagers: " + BigNumbers.ToString(this.Resources.Villagers));
        $("#Gold").html(" Gold: " + BigNumbers.ToString(this.Resources.Gold));
        $("#Iron").html(" Iron: " + BigNumbers.ToString(this.Resources.Iron));
        $("#Gems").html(" Gems: " + BigNumbers.ToString(this.Resources.Gems));
        $("#Jewels").html(" Jewels: " + BigNumbers.ToString(this.Resources.Jewels));
        $("#Prayers").html(" Prayers: " + BigNumbers.ToString(this.Resources.Prayers));
    }
}
class Building {
    Name: string;
    Level: number;
    Income: Resources;
    Costs: Resources;

    constructor(inputName: string, inputIncome: Resources, inputCosts: Resources, inputGame: Game) {
        this.Name = inputName;
        this.Income = inputIncome;
        this.Costs = inputCosts;
        this.Level = 0;

        if (this.Name == "House") {
            this.Level = 1;
        }
        if (this.Name == "Woodcutter") {
            this.Level = 1;
        }
        if (this.Name == "Farm") {
            this.Level = 1;
        }
        // testing --------------------------------------------------------------------------------------------------------------------------------
        if (this.Name == "House") {
            //    this.Income = new Resources(1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 0);
        }


        //Set Me vanwege dat die 2x this in dezelfde regel hier niet kan begrijpen.
        let Me = this;

        $("#" + this.Name + " .Button").click(() => { Me.Upgrade(inputGame); });
    }
    // geeft een waarde terug van wat de income is, gebaseerd op de income en het level.
    CurrentIncome(): Resources {
        return Resources.Multiply(this.Income, Math.pow(this.Level, 2)); // math.pow = ( this.Level * this.Level )
    }
    // geeft een waarde terug van wat de upgrade cost is, gebaseerd op de income en het level.
    CurrentUpgradeCost(): Resources {
        return Resources.Multiply(this.Costs, Math.pow(this.Level + 1, 3)); // math.pow = ( this.Level * this.Level * this.level )
    }
    // geeft een waarde terug naar html. schrijft een waarde weg naar html
    UpdateDraw() {
        $("#" + this.Name + " .Income").html("Income: " + this.CurrentIncome().ToString());
        $("#" + this.Name + " .Costs").html("Costs: " + this.CurrentUpgradeCost().ToString());
        $("#" + this.Name + " .Level").html("Level: " + this.Level);
        //console.log($("#" + this.Name + " .Income")); // hiermee laat zoek je naar bepaalde infomatie in de console log ( nu zoeken we naar de .Income)
    }
    // als dit wordt uitgevoerd dan gaat het level met 1 omhoog
    Upgrade(game: Game) {
        if (Resources.CanSubstract(game.Resources, this.CurrentUpgradeCost())) {
            game.Resources = Resources.Substract(game.Resources, this.CurrentUpgradeCost());

            this.Level++;
            game.UpdateDraw();

            // aanpassingen aan costs voor het upgrade van het gebouw    
        }
        if (this.Name == "House" && this.Level >= 2) {
            this.Costs = new Resources(14, 9, 3, 0, 0, 0, 0, 0, 0, 0)
        }
        if (this.Name == "House" && this.Level >= 4) {
            this.Costs = new Resources(26, 16, 8, 9, 0, 0, 0, 0, 0, 0)
        }
        if (this.Name == "House" && this.Level >= 6) {
            this.Costs = new Resources(30, 22, 10, 9, 9, 0, 0, 0, 0, 0)
        }
        if (this.Name == "Woodcutter" && this.Level >= 2) {
            this.Costs = new Resources(30, 20, 4, 0, 0, 0, 0, 0, 0, 0)
        }
        if (this.Name == "GoldMine" && this.Level >= 2) {
            this.Costs = new Resources(38, 40, 20, 22, 150, 0, 30, 0, 0, 0)
        }
        if (this.Name == "Farm" && this.Level >= 3) {
            this.Costs = new Resources(8, 10, 0, 0, 0, 0, 5, 0, 0, 0)
        }
        if (this.Name == "Wonder" && this.Level == 1) {
            this.Costs = new Resources(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        }
        if (this.Name == "Wonder" && this.Level == 2) {
            this.Level = 1;
        }



        //Operator zijn de tekens waarmee we iets uitvoeren (+ - * / = == != ! > < ect)

        //if (this.Name == "Quarry" && this.Level >= 5) {
        //    this.Costs = new Resources(0, 0, 0, 0, 0, 0);
        //}
        //if (this.Name == "Lumberyard" && this.Level >= 5) {
        //    this.Costs = new Resources(0, 0, 0, 0, 0, 0);
        //}

        //console.log("Upgrade " + this.Name);
        //this.Level++;
        // kijken of we genoeg gold hebben.
        // gold eraf halen van wat de kosten van de upgrade is
        // upgrade!!
    }
    DeliverIncome(): Resources {
        return this.CurrentIncome();
    }

}
class Resources {
    //property == variable die onderdeel is van een class / Gold is a property form Resources
    GoldPiece: number = 0;
    Wood: number = 0;
    Stone: number = 0;
    Food: number = 0;
    Villagers: number = 0;
    Gold: number = 0;
    Iron: number = 0;
    Gems: number = 0;
    Jewels: number = 0;
    Prayers: number = 0;

    //parameter == variable die meegestuurd word naar een function/method, bv gold is the parameter for the constructor
    constructor(goldpiece: number, villagers: number, food: number, wood: number, stone: number, gold: number, iron: number, gems: number, jewels: number, prayers: number) {
        this.GoldPiece = goldpiece;
        this.Wood = wood;
        this.Stone = stone;
        this.Food = food;
        this.Villagers = villagers;
        this.Iron = iron;
        this.Gold = gold;
        this.Gems = gems;
        this.Jewels = jewels;
        this.Prayers = prayers;
    }

    static Add(a: Resources, b: Resources) {
        let goldpiece = a.GoldPiece + b.GoldPiece;
        let wood = a.Wood + b.Wood;
        let stone = a.Stone + b.Stone;
        let food = a.Food + b.Food;
        let villagers = a.Villagers + b.Villagers;
        let gold = a.Gold + b.Gold;
        let iron = a.Iron + b.Iron;
        let gems = a.Gems + b.Gems;
        let jewels = a.Jewels + b.Jewels;
        let prayers = a.Prayers + b.Prayers;

        return new Resources(goldpiece, villagers, food, wood, stone, gold, iron, gems, jewels, prayers);
    }

    static Multiply(a: Resources, multiplier: number) {
        let goldpiece = a.GoldPiece * multiplier;
        let wood = a.Wood * multiplier;
        let stone = a.Stone * multiplier;
        let food = a.Food * multiplier;
        let villagers = a.Villagers * multiplier;
        let gold = a.Gold * multiplier;
        let iron = a.Iron * multiplier;
        let gems = a.Gems * multiplier;
        let jewels = a.Jewels * multiplier;
        let prayers = a.Prayers * multiplier;

        return new Resources(goldpiece, villagers, food, wood, stone, gold, iron, gems, jewels, prayers);
    }

    static CanSubstract(a: Resources, b: Resources) {
        let goldpiece = a.GoldPiece >= b.GoldPiece;
        let wood = a.Wood >= b.Wood;
        let stone = a.Stone >= b.Stone;
        let food = a.Food >= b.Food;
        let villagers = a.Villagers >= b.Villagers;
        let gold = a.Gold >= b.Gold;
        let iron = a.Iron >= b.Iron;
        let gems = a.Gems >= b.Gems;
        let jewels = a.Jewels >= b.Jewels;
        let prayers = a.Prayers >= b.Prayers;
        if (goldpiece && wood && stone && food && villagers && gold && iron && gems && jewels && prayers) {
            return true;
        }
        else {
            return false;
        }
    }
    static Substract(a: Resources, b: Resources) {
        let goldpiece = a.GoldPiece - b.GoldPiece;
        let wood = a.Wood - b.Wood;
        let stone = a.Stone - b.Stone;
        let food = a.Food - b.Food;
        let villagers = a.Villagers - b.Villagers;
        let gold = a.Gold - b.Gold;
        let iron = a.Iron - b.Iron;
        let gems = a.Gems - b.Gems;
        let jewels = a.Jewels - b.Jewels;
        let prayers = a.Prayers - b.Prayers;

        return new Resources(goldpiece, villagers, food, wood, stone, gold, iron, gems, jewels, prayers);
    }

    ToString() {
        let txt = "";

        if (this.GoldPiece > 0) {
            txt += "<br>" + BigNumbers.ToString(this.GoldPiece) + " Gold Piece";
        }
        // == gelijk
        // != niet gelijk, ! inverse
        // > en < of >= en <=
        // ? is gelijk aan the then van (if then else)
        // : is gelijk aan the else van (if then else)
        if (this.Wood > 0) {
            // if (txt != "") {
            //     txt = txt + ", ";
            // }                          // dit gedeelte is de zin die erboven staat in het klein    
            // else {
            //     txt = txt;
            // }
            txt += "<br>" + BigNumbers.ToString(this.Wood) + " Wood";
        }
        if (this.Stone > 0) {
            txt += "<br>" + BigNumbers.ToString(this.Stone) + " Stone";
        }
        if (this.Food > 0) {
            txt += "<br>" + BigNumbers.ToString(this.Food) + " Food";
        }
        if (this.Villagers > 0) {
            txt += "<br>" + BigNumbers.ToString(this.Villagers) + " Villagers";
        }
        if (this.Gold > 0) {
            txt += "<br>" + BigNumbers.ToString(this.Gold) + " Gold";
        }
        if (this.Iron > 0) {
            txt += "<br>" + BigNumbers.ToString(this.Iron) + " Iron";
        }
        if (this.Gems > 0) {
            txt += "<br>" + BigNumbers.ToString(this.Gems) + " Gems";
        }
        if (this.Jewels > 0) {
            txt += "<br>" + BigNumbers.ToString(this.Jewels) + " Jewels";
        }

        return txt;
    }
}

class BigNumbers {
    //method (method == function die in een class staat, onderdeel is van een class)
    static ToString(number: number): string {
        let txt: string = "";


        if (number >= 1000000000) {
            number = number / 1000000000;
            txt = number.toFixed(2) + " B";
            return txt;
        }
        if (number >= 1000000) {
            number = number / 1000000;
            txt = number.toFixed(2) + " M";
            return txt;
        }
        if (number >= 1000) {
            number = number / 1000; //1
            txt = number.toFixed(2) + " K";
            return txt;
        }
        if (number >= 0) {
            txt = number.toString();
            return txt;
        }

        // als het getal groter is dan 1,000,000,000 dan komt er een B achter en verwijnen de nullen
        // als het getal groter is dan 1,000,000 dan komt er een M achter en verwijnen de nullen
        // if:  als het getal groter is dan 1000 
        // then:    achter en verwijnen de nullen 
        //          dan komt er een K
        // else: 
        // als het getal rond is dan geen getal achter de komma
        // getal achter de komma ( bijv : 1.53k = 1530)

        txt = number.toString();
        return txt;
    }
}