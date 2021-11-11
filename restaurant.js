class Order {
    price = 0
    calories = 0
    items = []
    mutable = true
    constructor() {
        this.price = 0
        this.calories = 0
        this.items = []
        this.mutable = true
    }

    get getPrice() {return this.price}
    get getCalories() {return this.calories}
    get getItems() {return this.items}

    addItem(itemInstance, number = 1) {
        let item = {}
        item[itemInstance.name] = itemInstance
        item.number = number
        if (this.mutable === true) {
            this.items = this.items.concat(item)
            this.price += itemInstance.getPrice * number
            console.log(this.price)
            this.calories += itemInstance.getCalories * number
            console.log(this.calories)
        }
        else {
            console.log("Sorry, you've already paid")
        }
    }

    // DELETE METHOD DOESN'T WORK PROPERLY YET
    deleteItem(itemName, number = 1) {
        if (this.mutable === true) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].hasOwnProperty(itemName)) {
                    if (this.items[i].number >= number) {
                        this.price -= this.items[i].getPrice * number
                        this.calories -= this.items[i].getCalories * number
                        this.items[i].number -= number
                    } else {
                        console.log(`Oops, you don't have so many ${itemName}`)
                    }
                } else {
                    console.log(`Oops, you don't have ${itemName} in your order`)
                }
            }
        }
        else {
            console.log("Sorry, you've already paid")
        }
    }

    showOrder() {
        console.log(this.items)
    }

    pay() {
        this.mutable = false
        console.log(`your wallet will lose: ${this.price} tug\nyou will gain: ${this.calories} calories`)
    }
}

class MenuItem {
    name
    price = 0
    calories = 0
    constructor(name, price, calories) {
        this.name = name
        this.price = price
        this.calories = calories
    }
    get getName() {return this.name}
    get getPrice() {return this.price}
    get getCalories() {return this.calories}
}

class Hamburger extends MenuItem{
    static SIZE_SMALL = [50, 20, 'small hamburger']
    static SIZE_LARGE = [100, 40, 'large hamburger']
    static STUFFING_CHEESE = [10, 20, 'cheese']
    static STUFFING_SALAD = [20, 5, 'salad']
    static STUFFING_POTATO = [15, 10, 'potato']

    size
    stuffing = []
    constructor(size, stuffing, ...args) {
        let name = size[2]
        // calculate the final parameters
        let price = size[0] + stuffing[0]
        let calories = size[1] + stuffing[1]
        for (let i = 0; i < args.length; i++) {
            price += args[i][0]
            calories += args[i][1]
        }
        super(name, price, calories)

        // make one array of stuffings
        let allStuffings = this.stuffing.concat(stuffing[2])
        for (let i = 0; i < args.length; i++) {
            allStuffings = allStuffings.concat(args[i][2])
        }

        this.size = size[2]
        this.stuffing = allStuffings
    }
    get getSize() {return this.size}
    get getStuffing() {return this.stuffing}
}

class Salad extends MenuItem {
    static CAESAR = [100, 20, 'Caesar']
    static OLIVIER = [50, 80, 'Olivier']

    weight
    constructor(type, weight) {
        let name = type[2]
        // calculate the final parameters
        let price = type[0] * weight / 100
        let calories = type[1] * weight / 100

        super(name, price, calories)
        this.weight = weight
    }
}

class Drink extends MenuItem{
    static COLA = [50, 40, 'Cola']
    static COFFEE = [80, 20, 'Coffee']

    constructor(type) {
        let name = type[2]
        let price = type[0]
        let calories = type[1]
        super(name, price, calories)
    }
}

const hamburger1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_POTATO, Hamburger.STUFFING_SALAD)
const hamburger2 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO, Hamburger.STUFFING_SALAD)

const salad1 = new Salad(Salad.CAESAR, 150)
const salad2 = new Salad(Salad.OLIVIER, 250)

const cola1 = new Drink(Drink.COLA)
const coffee1 = new Drink(Drink.COFFEE)
const coffee2 = new Drink(Drink.COFFEE)

let myOrder = new Order()
myOrder.addItem(hamburger1, 2)
myOrder.addItem(salad1)
myOrder.addItem(cola1, 3)
myOrder.addItem(coffee1, 3)
myOrder.showOrder()
myOrder.pay()
myOrder.addItem(coffee2, 3)