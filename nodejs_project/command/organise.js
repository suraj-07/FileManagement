let fs=require("fs");
let path =require("path");
let types = {
    media: ["mp4","mkv","png","jpg"],
    archives: ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xslx','xls','odt','ods','odp','odg','ofd','txt','ps'],
    app: ['exe','dmg','pkg','deb']
}
function organiseFn(dirPath){
    // console.log("organise command implemented for ", dirPath);
    
    // 1 input -> directory path given
    let destPath; 
    if(dirPath==undefined)
    {
        destPath=process.cwd();
        return;
 
    }
    else{
       let doesexist = fs.existsSync(dirPath);
       if(doesexist)
       {
         destPath=path.join(dirPath,"organized_files");
         if(fs.existsSync(destPath)==false)
         {
             fs.mkdirSync(destPath);
         }
         
       }
       else
       {
         console.log("Kindly enter the correct path");
         return;  
       }
 
 
    }
    // 2 create -> organized_files -> directory
    organizeHelper(dirPath,destPath);
    
    
 }
 
 function organizeHelper(src ,dest)
 {
     // 3 identify categories of all files present in that input directory ->
     let childNames =fs.readdirSync(src);
   //  console.log(childNames);
     for(let i=0;i<childNames.length;i++)
     {
         let childAddress = path.join(src,childNames[i]);
         let isFile = fs.lstatSync(childAddress).isFile();
 
         if(isFile)
         {
             //console.log(childNames[i]);
             let category=getCategory(childNames[i]);
            // console.log(childNames[i]," belong to -> ",category);
             // 4 copy/cut file to that organized directory inside any of the category folder
             sendFiles(childAddress,dest,category);
 
         }
 
     }
     
 
 }
 
 function sendFiles(srcFilePath,dest,category)
 {
     let categortypath =path.join(dest,category);
     if(fs.existsSync(categortypath)==false)
     {
         fs.mkdirSync(categortypath);
     }
 
     let fileName =path.basename(srcFilePath);
     let destFilePath= path.join(categortypath,fileName);
     fs.copyFileSync(srcFilePath,destFilePath);
     fs.unlinkSync(srcFilePath);
     console.log(fileName," copied to ",category);
 
 
 }
 
 function getCategory(name)
 {
    let ext= path.extname(name);
    ext=ext.slice(1);
    for(let type in types)
    {
        let ctypesArray=types[type];
        for(let i=0;i<ctypesArray.length;i++)
        {
            if(ext==ctypesArray[i])
            {
                return type; 
            }
        }
 
    }
    return "others";
    //console.log(ext);
 }

 module.exports={
    organizeKey:organiseFn
 }