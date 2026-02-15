const http = require('http');

const data = JSON.stringify({
    name: "Test User",
    email: "testuser999@example.com",
    password: "password123",
    location: "Test City",
    soilDetails: {
        N: 10,
        P: 20,
        K: 30,
        ph: 6.5
    }
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
