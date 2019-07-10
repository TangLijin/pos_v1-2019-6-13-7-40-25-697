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

//TODO: 请在该文件中实现练习要求并删除此注释

let allItems = loadAllItems();
//console.log(allItems);
let promotions = loadPromotions();

const getAllItemBarcode = (allItems) =>{
    let allItemBarcode = [];
    for(let i = 0; i < allItems.length; i++){
        allItemBarcode.push(allItems[i].barcode);
    }
    return allItemBarcode;
}

const isValid = (allItemBarcode,shopList) => {
    for(let i = 0; i < shopList.length; i++){
        if(allItemBarcode.indexOf(shopList[i]) == -1)
            return false;
    }
    return true;
}

//console.log(getAllItemBarcode(allItems));

module.exports = {getAllItemBarcode};