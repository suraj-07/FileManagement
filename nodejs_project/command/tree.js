let fs=require("fs");
let path =require("path");

function treeFn(dirPath){
    let destPath; 
   if(dirPath==undefined)
   {
       
       treeHelper(process.cwd(),"");
       console.log("kindly enter the path");
       return;

   }
   else
   {
      let doesexist = fs.existsSync(dirPath);
      if(doesexist)
      {
        treeHelper(dirPath,"");
      }
      else
      {
        console.log("Kindly enter the correct path");
        return;  
      }
   }
}

function treeHelper(dirPath,indent)
{
    //is file or folder
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile==true)
    {
        let fileName =path.basename(dirPath);
        console.log(indent+"|-- "+fileName);
    }
    else
    {
        let dirName=path.basename(dirPath)
        console.log(indent+"\--"+dirName);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++)
        {
            let childpath=path.join(dirPath,childrens[i]);
            treeHelper(childpath,indent +"\t");
        }
    }
}
module.exports={
    treeKey:treeFn
}