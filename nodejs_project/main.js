#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs=require("fs");
let path =require("path");
let helpObj=require("./command/help");
let treeObj=require("./command/tree");
let OrgObj=require("./command/organise");

let command=inputArr[0];
switch(command)
{
    case  "tree" :
        treeObj.treeKey(inputArr[1]);   
    //treeFn(inputArr[1]);
        break;
    case  "organise" :
        OrgObj.organizeKey(inputArr[1]);
        break;
    case  "help" :
        helpObj.helpkey();
        //helpFn();
        break; 
    default :
        heloFn();
        console.log("Please input command");
        break;

}

