#!/usr/bin/env node
let fs = require("fs")


let inputArr = process.argv.slice(2);
//console.log(inputArr);


//options ko identify krenge
  let optionsArr =[];
  let filesArr =[];
  for(let i=0;i<inputArr.length;i++){
    let firstChar =  inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }

  }
// option check
  if(optionsArr.includes("-b")&&optionsArr.includes("-n")){
      console.log("Enter Only One between (-n) And (-b)");
      return;
  }

  // file existance check

  for(let i=0;i<filesArr.length;i++){
      let ifExist = fs.existsSync(filesArr[i]);
      if(!ifExist){
       console.log("File "+inputArr[i]+" Not Found");
       return;
      }
  }



  //content ko read krna hai
  let content ="";
  for(let i=0;i<filesArr.length;i++){
         content=content+fs.readFileSync(filesArr[i])+"\n";
  }
  //console.log(content);

  let contentArr =content.split("\n");
  //console.log(contentArr);
  //console.log(contentArr[2])

  // -s ki command
  let sOption =optionsArr.includes("-s");
   if(sOption){
     for(let i=1;i<contentArr.length;i++){
         if(contentArr[i]==''&&contentArr[i-1]==''){
              contentArr[i]= null;
         }else if(contentArr[i]==""&&contentArr[i-1]==null){
             contentArr[i]=null;
         }
     }
     let tempArr=[];
     for(let i=0;i<contentArr.length;i++){
         if(contentArr[i]!=null){
             tempArr.push(contentArr[i]);
         }

     } 
      contentArr= tempArr;

  }
 // console.log(contentArr.join("\n"));

  let nOption =optionsArr.includes("-n");
  if(nOption){
      for(let i=0;i<contentArr.length;i++){
          contentArr[i]=(i+1)+" "+contentArr[i];
      }

  }
 // console.log(contentArr.join("\n"));


 let bOption =optionsArr.includes("-b");
 if(bOption){
     let count =1;
    for(let i=0;i<contentArr.length;i++){
       if(contentArr[i]!=""){
           contentArr[i]= count+" "+contentArr[i];
           count++;
       }
    }

}
console.log(contentArr.join("\n"));


                            //  Symbols
                            //    \ /
                            //     |
//node wcat.js -s -b f1.txt f2.txt > newfile.txt ==> isse f1 aur f2 ka saara content new file me chala jayega
//node wcat.js -s -b f1.txt f2.txt >> newfile.txt ==> isse f1 aur f2 ka saara content new file me append ho jayega
//For Global sudo npm link..