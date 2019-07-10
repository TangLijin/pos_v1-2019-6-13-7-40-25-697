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

const getAllItemBarcode = () =>{
    let allItemBarcode = [];
    for(let i = 0; i < allItems.length; i++){
        allItemBarcode.push(allItems[i].barcode);
    }
    return allItemBarcode;
}

const isValid = (allItemBarcode,shopList) => {
    for(let i = 0; i < shopList.length; i++){
        if(allItemBarcode.indexOf(shopList[i]) == -1)
            console.log("false");
            return false;
    }
    console.log("true");
    return true;
}

const getShopListCount = (shopList) => {
    let shopListCount = [];
    shopList.sort();
    var temp = {};
    for(let i = 0; i < shopList.length - 1; i++) {
        if(i == 0){
            temp.barcode = shopList[i];
            temp.count = 1;
            if(shopList[0] === shopList[1])
                ++ temp.count;
            continue;
        }
        if(shopList[i] === shopList[i+1]){
            ++temp.count;
        }else{
            shopListCount.push(temp);
            temp = {};
            temp.barcode = shopList[i+1];
            temp.count = 1;
        }
    }
    if(temp.length != 0)
        shopListCount.push(temp);
    return shopListCount;
}

const getItemCart = (shopListCount) => {
    let itemCart = [];
    
    for(let i = 0; i < shopListCount.length; i++){
        let item = {};
        for(let j = 0; j < allItems.length; j++){
            if(shopListCount[i] == allItems[j].barcode){
                item.barcode = shopList[i];
                item.name = allItems[j].name;
                item.unit = allItems[j].unit;
                item.price = allItems[j].price;
                item.count = shopListCount[i];
                item.sumPrice = shopListCount[i] * allItems[j].price;
                /*item.barcode = shopList[i];
                item.名称 = allItems[j].name;
                item.数量 = 1;
                item.名称 = allItems[j].name;*/
            }
        }
        itemCart.push(item);
    }
    return itemCart;
}

const getItemCartPromotion = (itemCart) => {
    let itemCartPromotion = [];
    if(promotions.length == 0){
        return itemCart;
    }
    let promotionbarcodes = promotions[0].barcodes;
    var item = {}
    for(let i = 0; i < itemCart.length; i++){
        item.barcode = itemCart[i].barcode;
        item.name = itemCart[i].name;
        item.unit = itemCart[i].unit;
        item.price = itemCart[i].price;
        item.count = itemCart[i].count;
        item.sumPrice = itemCart[i].sumPrice;
        if(promotionbarcodes.indexOf(itemCart[i].barcode) != -1 ){
            if(item.count >= 2){
                item.sumPrice -= item.price
            }
        }
        itemCartPromotion.push(item);
    }
    return itemCartPromotion;
}
//console.log(getAllItemBarcode(allItems));

const createReceipt = (itemCartPromotion) => {
    let receipt = `***<没钱赚商店>收据***`;
    let discount = 0;
    let sumMoney = 0;
    for(let i = 0; i < itemCartPromotion.length; i++){
        receipt += `名称：${itemCartPromotion[i].name}，数量:${itemCartPromotion[i].count}${itemCartPromotion[i].unit}，
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
    if(!isValid(allItemBarcode))
        return "[ERROR]:no this barcode";
    let shopListCount = getShopListCount(shopList);
    let itemCart = getItemCart(shopListCount);
    let itemCartPromotion = getItemCartPromotion(itemCart);
    let receipt = createReceipt(itemCartPromotion);
    console.log(receipt);
    return createReceipt;
}

module.exports = {getAllItemBarcode};