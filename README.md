## Architecture

The code style is based  [Airbnb JS style guide](https://github.com/airbnb/javascript) as is.

## How to build: first of all
```bash
make build
```

## How to Run

You'll need the `.env` file: just copy the `.env.example` available in `src` directory

- Use [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/);
- Use [VSCode](https://code.visualstudio.com/) and the debugger config (`launch.json`);

```bash
# Will run with DEV environment definition
make dev
```

## Other Utilities
```bash
make seed # Run seeds, who adds dummmy data to database
make lint # Check lint once
make lint/watch # Check lint in every change
make test # Run all tests
make test/watch # Watch all tests in every change
```
# How to contribute
- See [How To Handle with Errors](src/lib/commom/error_handler)

# SEARCH LOCATION API ENDPOINTS

  <_http://localhost:3030/partner_>

  * **Method:**

   `POST`

  * **EXAMPLE BODY REQUEST**

 ```javascript
    {
      "tradingName": "Trading Name",
      "ownerName": "owner name",
      "document": "69.487.919/0001-58",
      "coverageArea": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -46.71746,
                -23.50814
              ],
              [
                -46.72013,
                -23.50895
              ],
              [
                -46.72331,
                -23.51276
              ]
            ]
          ]
        ]
      },
      "address": {
        "type": "Point",
        "coordinates": [
          -46.689537,
          -23.560505
        ]
      }
    }
```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : Partner was created" }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
    "message": "INVALID_DOCUMENT",
    "status": 500"
}`

  <_http://localhost:3030/partner/:id_>


* **Method:**

   `GET`

   

   * **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "pdvs": {
        "id": "72117a28-f20e-4d5b-9468-020e9095755b",
        "tradingName": "Adega Emporio",
        "ownerName": "Ronaldinho gaucho",
        "document": "09.444.848/0001-84",
        "coverageArea": {
            "type": "MultiPolygon",
            "coordinates": [
                [
                    [
                        [
                            -46.61026,
                            -23.66622
                        ],
                        [
                            -46.62596,
                            -23.66985
                        ],
                        [
                            -46.63481,
                            -23.6749
                        ],
                        [
                            -46.64012,
                            -23.69742
                        ],
                        [
                            -46.63566,
                            -23.71857
                        ],
                        [
                            -46.63154,
                            -23.74041
                        ],
                        [
                            -46.63078,
                            -23.75411
                        ],
                        [
                            -46.61701,
                            -23.75216
                        ],
                        [
                            -46.59878,
                            -23.74832
                        ],
                        [
                            -46.58076,
                            -23.73916
                        ],
                        [
                            -46.56257,
                            -23.73662
                        ],
                        [
                            -46.55038,
                            -23.73378
                        ],
                        [
                            -46.54404,
                            -23.73016
                        ],
                        [
                            -46.53368,
                            -23.72612
                        ],
                        [
                            -46.52488,
                            -23.71453
                        ],
                        [
                            -46.52502,
                            -23.70481
                        ],
                        [
                            -46.52786,
                            -23.69098
                        ],
                        [
                            -46.5573,
                            -23.66818
                        ],
                        [
                            -46.57335,
                            -23.66606
                        ],
                        [
                            -46.61026,
                            -23.66622
                        ]
                    ]
                ]
            ]
        },
        "address": {
            "type": "Point",
            "coordinates": [
                -46.588654,
                -23.709635
            ]
        },
        "createdAt": "2019-10-25T23:34:10.476Z",
        "updatedAt": "2019-10-25T23:34:10.476Z",
        "deletedAt": null
    }
}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
    "message": "INVALID_ID_PARTNER",
    "status": 500
}`


  <_http://localhost:3030/partner_>


* **Method:**

   `GET`

* **EXAMPLE BODY REQUEST**

 ```javascript
    {
      "lat":  -46.588654,
      "long":  -23.709635
    }
```   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "pdvs": [
        {
            "id": "72117a28-f20e-4d5b-9468-020e9095755b",
            "tradingName": "Adega Emporio",
            "ownerName": "Ronaldinho gaucho",
            "document": "09.444.848/0001-84",
            "coverageArea": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                -46.61026,
                                -23.66622
                            ],
                            [
                                -46.62596,
                                -23.66985
                            ],
                            [
                                -46.63481,
                                -23.6749
                            ],
                            [
                                -46.64012,
                                -23.69742
                            ],
                            [
                                -46.63566,
                                -23.71857
                            ],
                            [
                                -46.63154,
                                -23.74041
                            ],
                            [
                                -46.63078,
                                -23.75411
                            ],
                            [
                                -46.61701,
                                -23.75216
                            ],
                            [
                                -46.59878,
                                -23.74832
                            ],
                            [
                                -46.58076,
                                -23.73916
                            ],
                            [
                                -46.56257,
                                -23.73662
                            ],
                            [
                                -46.55038,
                                -23.73378
                            ],
                            [
                                -46.54404,
                                -23.73016
                            ],
                            [
                                -46.53368,
                                -23.72612
                            ],
                            [
                                -46.52488,
                                -23.71453
                            ],
                            [
                                -46.52502,
                                -23.70481
                            ],
                            [
                                -46.52786,
                                -23.69098
                            ],
                            [
                                -46.5573,
                                -23.66818
                            ],
                            [
                                -46.57335,
                                -23.66606
                            ],
                            [
                                -46.61026,
                                -23.66622
                            ]
                        ]
                    ]
                ]
            },
            "address": {
                "type": "Point",
                "coordinates": [
                    -46.588654,
                    -23.709635
                ]
            },
            "createdAt": "2019-10-25T23:34:10.476Z",
            "updatedAt": "2019-10-25T23:34:10.476Z",
            "deletedAt": null
        }
    ]
}`
 
* **Error Response:**

  * **Code:** 406 <br />
    **Content:** `{
    "message": "EMPTY_ARGUMENT_LAT_AND_LONG",
    "status": 406}`

