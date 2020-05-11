function computedData(data) {
    let keys = [];
    let rowSpan = [];
    let arr = [];
    data.map((a,b) => {
        if (keys.length == 0) {
            keys.push(a.name)
            rowSpan.push(b)
        }else{
            if (keys.indexOf(a.name) <0) {
                keys.push(a.name)
                rowSpan.push(b)

            }
        }
        arr=[...arr,a.name];
    });
    arr = [...new Set([...arr])];
    let values = {};
    data.map(a => {
        if (arr.indexOf(a.name) >= 0) {
            if(values[a.name]){
                values[a.name].push(a.hair);
            }else{
                values[a.name]=[a.hair]
            }
        }
    });
    test.list = values;
    let columnArr = [];
    for(let a in values) {
        columnArr.push(values[a].length);
    }
    return{
        rowSpan,
        columnArr
    }
}