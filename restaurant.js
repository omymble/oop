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
        // {
        // 'small hamburger': {name:.., price:..., calories:...}
        // 'number': x
        // }

        let newItem = {}
        if (this.mutable === true) {
            newItem[itemInstance.name] = itemInstance
            newItem.number = number
            this.items = this.items.concat(newItem)
            this.price += itemInstance.getPrice * number
            // console.log(this.price)
            this.calories += itemInstance.getCalories * number
            // console.log(this.calories)
        }
        else {
            console.log("Sorry, you've already paid")
        }
    }

    deleteItem(itemName, number = 1) {
        if (this.mutable === true) {
            this.items = this.items.filter(item => {
                if (item.hasOwnProperty(itemName)) {
                    if (item.number < number) {
                        console.log(`Oops, you don't have so many ${itemName}`)
                        return false
                    }
                    else {
                        this.price -= item.getPrice * number
                        this.calories -= item.getCalories * number
                        if (item.number === number) {
                            return true
                        }
                        else {
                            item.number -= number
                            return false
                        }
                    }
                }
                else {
                    console.log(`Oops, you don't have ${itemName} in your order`)
                    return false
                }
            })
        }
        else {
            console.log("Sorry, you've already paid")
        }
    }

    showOrder() {
        console.log(this.items)
    }

    pay() {
        if (this.mutable === false) {
            console.log("Sorry, you've already paid")
        }
        else {
            console.log(`your wallet will lose: ${this.price} tug\nyou will gain: ${this.calories} calories\n`)
            this.mutable = false
        }
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
    static SIZE_SMALL = {
        name: 'small hamburger',
        price: 100,
        calories: 40
    }
    static SIZE_LARGE = {
        name: 'large hamburger',
        price: 100,
        calories: 40
    }
    static STUFFING_CHEESE = {
        name: 'with cheese',
        price: 10,
        calories: 20
    }
    static STUFFING_SALAD = {
        name: 'with salad',
        price: 20,
        calories: 5
    }
    static STUFFING_POTATO = {
        name: 'with potato',
        price: 15,
        calories: 10
    }

    stuffing = []
    constructor(type, stuffing, ...args) {
        let name_and_size = type.name
        let price = type.price + stuffing.price
        let calories = type.calories + stuffing.calories
        for (let i = 0; i < args.length; i++) {
            price += args[i].price
            calories += args[i].calories
        }
        super(name_and_size, price, calories)

        // make one array of stuffings
        let allStuffing = this.stuffing.concat(stuffing.name)
        for (let i = 0; i < args.length; i++) {
            allStuffing = allStuffing.concat(args[i].name)
        }
        this.stuffing = allStuffing
    }

    get getStuffing() {return this.stuffing}
}

class Salad extends MenuItem {
    static CAESAR = {
        name: 'Caesar Salad',
        price: 100,
        calories: 20
    }
    static OLIVIER = {
        name: 'Olivier Salad',
        price: 50,
        calories: 80
    }

    constructor(type, weight) {
        let name = type.name
        let price = type.price * weight / 100
        let calories = type.calories * weight / 100

        super(name, price, calories)
        this.weight = weight
    }
}

class Drink extends MenuItem{
    static COLA = {
        name: 'Cola',
        price: 50,
        calories: 40
    }
    static COFFEE = {
        name: 'Coffee',
        price: 80,
        calories: 20
    }

    constructor(type) {
        let name = type.name
        let price = type.price
        let calories = type.calories
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
myOrder.showOrder()