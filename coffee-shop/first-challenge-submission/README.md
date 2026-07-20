## Overview

You have been hired by a company that builds an app for coffee addicts. You are
responsible for taking the user's location and returning a list of the three closest coffee shops.

## Input

The coffee shop list comes from an API defined in: https://api-challenge.agilefreaks.com/swagger/index.html?url=/v1/docs.json#/ 

It also requires a token, given by the same API.

The response of this API may fail occasionally. The program should handle the different responses.

Your program will be executed directly from the command line and will be provided two arguments in the following order: `<user x coordinate> <user y coordinate>`, such as

```
yarn start <user x coordinate> <user y coordinate>
```

## Output

Write a program that takes the user's coordinates encoded as listed above and prints out a newline ­separated list of the three closest coffee shops (including distance from the user) in order of closest to farthest. These distances should be rounded to four decimal places.

Assume all coordinates lie on a flat plane.

The output should be very simple. No UI is required.

## Starting point

Please fork:

https://github.com/Agilefreaks/js-interview-starting-point 

Create branch for the solution and make a pr on your fork

## Tests

You are encouraged to provide a test suite to prove that your application works as intended. A starting point is provided in the given app skeleton.

## Example

**Input**

`yarn start 47.6 -122.4`

**Example output**

```
Starbucks Seattle2, 0.0645
Starbucks Seattle, 0.0861
Starbucks SF, 10.0793
```

---

### What was implemented

**1. Euclidean Distance**  
- I used `Math.hypot()` straight-line distance since it's a flat plane.

**2. Input Validation with Zod**
- Used Zod to validate the input coordonates

**3. Retry with Exponential Backoff**  
- Implemented retry mechanism in case the api fails because of the server with 5xx errors with a number of retries.

**4. Tests**
- Added tests for sorting logic, interceptor and validator.
