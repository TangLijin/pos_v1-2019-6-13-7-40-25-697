'use strict';

//先直接引用  后期再从文件读取
function loadAllItems() {
    return [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
    ];
  }
  
  function loadPromotions() {
    return [
      {
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
          'ITEM000000',
          'ITEM000001',
          'ITEM000005'
        ]
      }
    ];
  }


//const fixtures = require("../test/fixtures.js");

let allItems = loadAllItems();
//console.log(allItems);
let promotions = loadPromotions();

let shopList = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
  ];

const getAllItemBarcode = () =>{
    let allItemBarcode = [];
    /*for(let i = 0; i < allItems.length; i++){
        allItemBarcode.push(allItems[i].barcode);
    }*/
    allItems.forEach(element => {
        allItemBarcode.push(element.barcode);
    });
    return allItemBarcode;
}

const getShopListChanged = (shopList) => {
    let shopListChanged = [];
    shopList.forEach(shopItem => {
        if(shopItem.indexOf("-") != -1){
            for(let i = 0; i < shopItem.split("-")[1]; i++){
                shopListChanged.push(shopItem.split("-")[0]);
            }
            
        }
        else shopListChanged.push(shopItem);
    });
    return shopListChanged;
}

const isValid = (allItemBarcode,shopListChanged) => {
    
    for(let i = 0; i < shopListChanged.length; i++){
        if(allItemBarcode.indexOf(shopListChanged[i]) == -1){
            console.log("false");
            return false;
        }
    }
    console.log("true");
    return true;
}

const getShopListCount = (shopListChanged) => {
    let shopListCount = [];
    shopListChanged.sort();
    var temp = {};
    for(let i = 0; i < shopListChanged.length - 1; i++) {
        if(i == 0){
            temp.barcode = shopListChanged[i];
            temp.count = 1;
            if(shopListChanged[0] === shopListChanged[1])
                ++ temp.count;
            continue;
        }
        if(shopListChanged[i] === shopListChanged[i+1]){
            ++temp.count;
        }else{
            shopListCount.push(temp);
            temp = {};
            temp.barcode = shopListChanged[i+1];
            temp.count = 1;
        }
    }
    if(temp.length != 0)
        shopListCount.push(temp);
    console.log(shopListCount);
    return shopListCount;
}

const getItemCart = (shopListCount,shopListChanged) => {
    let itemCart = [];
    
    for(let i = 0; i < shopListCount.length; i++){
        let item = {};
        for(let j = 0; j < allItems.length; j++){
            if(shopListCount[i].barcode == allItems[j].barcode){
                item.barcode = shopListCount[i].barcode;
                item.name = allItems[j].name;
                item.unit = allItems[j].unit;
                item.price = allItems[j].price;
                item.count = shopListCount[i].count;
                item.sumPrice = shopListCount[i].count * allItems[j].price;
                /*item.barcode = shopList[i];
                item.名称 = allItems[j].name;
                item.数量 = 1;
                item.名称 = allItems[j].name;*/
                
            }
        }
        itemCart.push(item);
        item = {};
    }
    console.log("itemCart");
    console.log(itemCart);
    return itemCart;
}

const getItemCartPromotion = (itemCart) => {
    
    if(promotions.length == 0){
        return itemCart;
    }
    let itemCartPromotion = [];
    let promotionbarcodes = promotions[0].barcodes;
    var item = {};
    for(let i = 0; i < itemCart.length; i++){
        item.barcode = itemCart[i].barcode;
        item.name = itemCart[i].name;
        item.unit = itemCart[i].unit;
        item.price = itemCart[i].price;
        item.count = itemCart[i].count;
        item.sumPrice = itemCart[i].sumPrice;
        if(promotionbarcodes.indexOf(itemCart[i].barcode) != -1 ){
            if(item.count >= 2){
                item.sumPrice -= item.price;
            }
        }
        itemCartPromotion.push(item);
        item = {};
    }
    console.log("itemCartPromotion");
    console.log(itemCartPromotion);
    return itemCartPromotion;
}
//console.log(getAllItemBarcode(allItems));

const createReceipt = (itemCartPromotion) => {
    let receipt = `***<没钱赚商店>收据***`;
    let discount = 0;
    let sumMoney = 0;
    for(let i = 0; i < itemCartPromotion.length; i++){
        receipt += `
 名称：${itemCartPromotion[i].name}，数量:${itemCartPromotion[i].count}${itemCartPromotion[i].unit}，
单价:${itemCartPromotion[i].price}（元），小计：${itemCartPromotion[i].sumPrice}（元）`;
        discount += (itemCartPromotion[i].count * itemCartPromotion[i].price - itemCartPromotion[i].sumPrice);
        sumMoney += itemCartPromotion[i].sumPrice;
    }
    receipt +=`
---------------------
总计：${sumMoney}(元)
节省：${discount}(元)
**********************
`
    return  receipt;
}

const printReceipt = (shopList) =>{
    let allItemBarcode = getAllItemBarcode();
    let shopListChanged = getShopListChanged(shopList);
    if(!isValid(allItemBarcode,shopListChanged))
        return "[ERROR]:no this barcode";
    let shopListCount = getShopListCount(shopListChanged);
    let itemCart = getItemCart(shopListCount,shopListChanged);
    let itemCartPromotion = getItemCartPromotion(itemCart);
    let receipt = createReceipt(itemCartPromotion);
    console.log(receipt);
    return createReceipt;
}

//module.exports = {getAllItemBarcode};
console.log(printReceipt(shopList));