# Getting Started with the API

This API has two endpoint.

## Endpoints

### /

It runs a get request showing that the server is live.


### /split-payments/compute`

A post request and it take an object containing payments to spilt as a REQ and returns the spilted payments.

**Example**

Request body sample

{
    "ID": 13092,
    "Amount": 4500,
    "Currency": "NGN",
    "CustomerEmail": "anon8@customers.io",
    "SplitInfo": [
        {
            "SplitType": "FLAT",
            "SplitValue": 450,
            "SplitEntityId": "LNPYACC0019"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0011"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0015"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 2,
            "SplitEntityId": "LNPYACC0016"
        },
        {
            "SplitType": "FLAT",
            "SplitValue": 2450,
            "SplitEntityId": "LNPYACC0029"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 10,
            "SplitEntityId": "LNPYACC0215"
        },
    ]
}


Response sample

{
    "ID": 13092,
    "Balance": 0,
    "SplitBreakdown": [
        {
            "SplitEntityId": "LNPYACC0019",
            "Amount": 450
        },
        {
            "SplitEntityId": "LNPYACC0011",
            "Amount": 2450
        },
        {
            "SplitEntityId": "LNPYACC0015",
            "Amount": 48
        },
        {
            "SplitEntityId": "LNPYACC0215",
            "Amount": 155.2
        },
        {
            "SplitEntityId": "LNPYACC0011",
            "Amount": 838.08
        },
        {
            "SplitEntityId": "LNPYACC0016",
            "Amount": 558.72
        }

    ]
}