const express = require('express');
const port = process.env.PORT || 8800;
const dotenv = require("dotenv");
const { operations } = require("./docs/operations");
const cors = require('cors');
const app = express();

app.use(cors({
    origin: "*",
}));

const bodyParser = require('body-parser');
dotenv.config();

app.use(bodyParser.json());

//middleware
app.get("/", (req,res) => {
    res.status = 200;
    res.json({response: "server is live"});
});


app.post("/split-payments/compute", async (req,res) => {
    if (Object.keys(req.body).length === 0) {
        res.status = 404;
        res.json({response: 'Please provide split payment entities'});
    } else {
        if(req.body.SplitInfo.length > 0){
            if(req.body.SplitInfo.length > 20){
                res.status = 200;
                res.json({response: 'the SplitInfo array must exceed 20 elements '});
            }else{

                const { newarray, Finalbalance} = await operations(req.body);
                // console.log(req.body.SplitInfo);
                const response = {
                    ID: req.body["ID"],
                    Balance: Finalbalance,
                    SplitBreakdown: newarray
                }
                res.status = 200;
                res.json({response});

            }
        }else{
            res.status = 200;
            res.json({response: 'the SplitInfo array must contain an element '});
        }
    }
        
   
});

app.use((req,res,next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.json({success:"false" , error:err.message})
});







app.listen(port, () => {
    console.log('live');
});