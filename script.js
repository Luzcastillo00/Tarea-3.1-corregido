
const products = [
    {
        id: 1,
        name: "Mezcla original 200g",
        price: 500,
    },
    {
        id: 2,
        name: "Mezcla original 500g",
        price: 900,
    },
    {
        id: 3,
        name: "Mezcla especial 200g",
        price: 700,
    },
    {
        id: 4,
        name: "Mezcla especial 500g",
        price: 1200,
    }
];
const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
    const targetId = parseInt(priceElement.value);
    const product = products.find(item => item.id === targetId);
    const number = numberElement.value;

    let purchase = {
        product: product,
        number: parseInt(number),
    };

    const newPurchaseIndex = purchases.findIndex((item) => item.product.id === purchase.product.id);
    if (purchases.length < 1 || newPurchaseIndex === -1) {
        purchases.push(purchase);
    } else {
        purchases[newPurchaseIndex].number += purchase.number;
    }

    alert(`${mostrar()}\nSubtotal ${subtotal()} yen`);
    priceElement.value = "";
    numberElement.value = "";
}

function subtotal() {
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.product.price * purchase.number;
    }, 0);
}

function mostrar() {
    return purchases.map(purchase => {
        return `${purchase.product.name} ${purchase.product.price} yen: ${purchase.number} unidades\n`;
    }).join("");
}

function calcPostageFromPurchase(sum) {
    if (sum === 0 || sum >= 3000) {
        return 0;
    } else if (sum < 1000) {
        return 500;
    } else {
        return 250;
    }
}

function calc() {
    const sum = subtotal();
    const shippingCost = calcPostageFromPurchase(sum);
    alert(`${mostrar()}\nEl subtotal es de ${sum} yen, el costo de envío es de ${shippingCost} yen. El total es de ${sum + shippingCost} yen`);
    purchases = [];
    priceElement.value = "";
    numberElement.value = "";
}
