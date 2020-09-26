export const sortData = (data) =>{
    const sortedData = [...data]
    // console.log('a.cases',a.cases);
    // sortedData.sort((a,b) => (a.cases>b.cases ? -1 : 1 ))
    sortedData.sort((a,b) => (b.cases - a.cases ))
        // if(a.cases>b.cases){
        //     return -1
        // }else{
        //     return 1
        // }
    
    return sortedData

}