const express = require('express')
const wordService = require('../services/wordService');
const fs = require('fs');
const http = require('http');
const router = new express.Router()

router.get('/words', async(req, res, next)=>{
    try{
        var file = 'file.txt';
        const writeFile = fs.createWriteStream(file);
        http.get("http://norvig.com/big.txt", response => {
            var stream = response.pipe(writeFile);

            stream.on('finish', ()=>{
                console.log('done');
                fs.readFile(file, 'utf-8', async(err, data)=>{
                    if(err){
                        throw new Error(err)
                    }else{
                        var wordsMap = await wordService.splitAndMap(data);
                        var sortedWords = await wordService.sort(wordsMap);
                        res.send(sortedWords);
                    }
                })
                
            })
        })
    }catch(err){
        return next(err)
    }

})

module.exports = router;