'use strict';
var allText = "";
var lista = new Array();
var numLineas = 0;
var txtJson = "";
var coma = ",";
var jsontemp = "";
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, '../../skuSeller.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);
        allText = data.toString();
        allText = allText.replace(/(\r\n|\n|\r)/gm,"");
        console.log('texto convertido: ' + allText);
        lista = allText.split(",");
        numLineas = lista.length;
        console.log('número de lineas: ' + numLineas);
    } else {
        console.log(err);
    }
});

exports.list_all_sku = function(req, res) {
    txtJson = "";
    jsontemp = "";
    var jsonObj = [];
    for (var i = 0; i<numLineas; i = i + 2){
        jsontemp  =  '{"MarketPlace":"SI","SKU":"' + lista[i] + '","SELLER":"' + lista[i+1] + '"}';
        jsonObj.push(jsontemp);
    }
    txtJson = JSON.stringify(jsonObj);
    console.log("JSON:" + txtJson);
    res.json(JSON.parse(txtJson));
};

exports.list_sku = function(req, res) {
    txtJson = "";
    jsontemp = "";
    var i = 0;
    var existe = false;
    console.log("Numero de Lineas: " + numLineas);
    while(i<numLineas){
        console.log("Entre al ciclo: " + i);
        if(lista[i] == req.params.skuId.toString()){
            jsontemp  =  '{"MarketPlace":"SI","SKU":"' + lista[i] + '","SELLER":"' + lista[i+1] + '"}';
            existe = true;
        }
            i = i+2;
    }
    if (!existe){
        jsontemp  =  '{"MarketPlace":"NO","SKU":"","SELLER":""}';
    }
        //console.log("String antes de Json: " + jsontemp);
        //txtJson = JSON.stringify(jsontemp);
        //console.log("JSON:" + jsontemp);
        res.json(JSON.parse(jsontemp));
};