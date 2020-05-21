const axios = require('axios');

function splitAndMap(data){
    var words = data.split(/\s+/)
    var wordMap = {};

    words.forEach(key => {
        if(wordMap.hasOwnProperty(key)){
            wordMap[key]++;
        }else{
            wordMap[key] = 1;
        }
    });

    return wordMap;
};

function sort(wordMap){
    var sortedWords = Object.keys(wordMap).map(key=>{
        if(key.length > 4){
            return{
                word: key,
                count: wordMap[key]
            }
        }  
    })

    sortedWords.sort((a,b)=>{
        return b.count - a.count;
    })

    sortedWords = sortedWords.slice(0,10);
    var finalList = sortedWords.map(word=>{
        return axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf&lang=en-ru&text=${word.word}`)
        .then(response=>{
            console.log(response.data.def[0])
            return{
                word: word.word,
                count: word.count,
                pos: (response.data.def[0] === undefined)? undefined : response.data.def[0].pos,
                syn: (response.data.def[0].tr[0] === undefined) ? undefined : response.data.def[0].tr[0].syn || response.data.def[0].tr[0].mean
            }
        }).catch(err=>{
            throw new Error(err)
        })
            
    })
    
    return Promise.all(finalList);
}

module.exports = {
    splitAndMap,
    sort
}