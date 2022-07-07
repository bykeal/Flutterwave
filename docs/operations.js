let Amount;
let Balance = 0;
let rateamount = 0;
let flatarray = [];
let ratioarray = [];
let percentarray = [];
let resdata =[];

const calculateflat = ({SplitValue}) =>{
	Amount = Amount - SplitValue;
	console.log(Amount);
	return SplitValue;
}

const calculatepercent = ({SplitValue}) =>{
	const percent = (SplitValue/100)* Amount;
	Amount = Amount - percent;
	console.log(Amount);
	return percent;
}
const calculateratio = (SplitValue, totalratio) =>{
	const share = (SplitValue/totalratio)*Amount;
	rateamount += share;
	Balance = Amount - share;
	console.log(Balance);
	return share;
	
}
const totalratios = (arr) => {
	let acc = 0;
	for (let i = 0; i < arr.length; i++) {
		acc += arr[i].SplitValue;
	}
	return acc;
}




const operations = async (data) => {
    Amount = data.Amount;
    const spiltarray = data.SplitInfo;
    console.log(spiltarray);

    for (let i = 0; i < spiltarray.length; i++) {
        if (spiltarray[i]["SplitType"].includes("FLAT")) {
            flatarray.push(spiltarray[i]);
        }
        if (spiltarray[i]["SplitType"].includes("RATIO")) {
            ratioarray.push(spiltarray[i]);
        }
        if (spiltarray[i]["SplitType"].includes("PERCENTAGE")) {
            percentarray.push(spiltarray[i]);
        }		
    }
    
    for (let i = 0; i < flatarray.length; i++) {
        // calculateflat(flatarray[i]);
        resdata.push( {
            "SplitEntityId": flatarray[i].SplitEntityId,
            "Amount": calculateflat(flatarray[i])
        })
    
    }


    for (let i = 0; i < percentarray.length; i++) {
        // calculatepercent(percentarray[i]);
        resdata.push( {
            "SplitEntityId": percentarray[i].SplitEntityId,
            "Amount": calculatepercent(percentarray[i])
        })
    }


    const rate = totalratios(ratioarray);
    for (let i = 0; i < ratioarray.length; i++) {
        let result = calculateratio(ratioarray[i].SplitValue, rate);
        resdata.push( {
            "SplitEntityId": ratioarray[i].SplitEntityId,
            "Amount": result
        })
    }

    const newarray = {...resdata};


    const Finalbalance = Amount-rateamount;

    Amount = 0;
    Balance = 0;
    rateamount=0;
    flatarray = [];
    ratioarray = [];
    percentarray = [];
    resdata =[];

    return { newarray, Finalbalance };
}









module.exports = {
    operations,
}