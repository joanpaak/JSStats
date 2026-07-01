function runTest(f, args, expected, tol, transformResult){
    console.log(`Testing function ${f.name}.`);

    let out = f(...args);

    if(transformResult != undefined){
        out = transformResult(out);
    }

    if(Math.abs(out - expected) < tol){
        console.log("Test passed");
    } else {
        console.warn("Test failed");
    }
}

runTest(Stats.dnorm, [0, 0, 1], 0.39, 0.01);
runTest(Stats.dnorm, [0, 1, 1], 0.24, 0.01);
runTest(Stats.dnorm, [0, 0, 2], 0.19, 0.01);
runTest(Stats.dnorm, [0, 1, 2], 0.17, 0.01);

runTest(Stats.pnorm, [0, 0, 1], 0.5, 0.01);
runTest(Stats.pnorm, [1, 0, 1], 0.84, 0.01);
runTest(Stats.pnorm, [-1, 0, 1], 0.15, 0.01);
runTest(Stats.pnorm, [0, 1, 2], 0.30, 0.01);

runTest(Stats.qnorm, [0.5, 0, 1], 0, 0.01);
runTest(Stats.qnorm, [0.25, 0, 1], -0.67, 0.01);
runTest(Stats.qnorm, [0.75, 0, 1], 0.67, 0.01);
runTest(Stats.qnorm, [0.5, 1, 2], 1, 0.01);

runTest(Stats.dlogis, [0, 0, 1], 0.25, 0.001);
runTest(Stats.dlogis, [1, 0, 1], 0.1966119, 0.001);
runTest(Stats.dlogis, [1, 1, 1], 0.25, 0.001);
runTest(Stats.dlogis, [-1, 1, 2], 0.09830597, 0.001);


runTest(Stats.plogis, [0, 0, 1], 0.5, 0.01);
runTest(Stats.plogis, [-1, 0, 1], 0.2689, 0.01);
runTest(Stats.plogis, [1, 0, 1], 0.731, 0.01);
runTest(Stats.plogis, [0, 1, 2], 0.377, 0.01);

runTest(Stats.qlogis, [0.5, 0, 1], 0.0, 0.01);
runTest(Stats.qlogis, [0.25, 0, 1], -1.0986, 0.01);
runTest(Stats.qlogis, [0.75, 0, 1], 1.0986, 0.01);
runTest(Stats.qlogis, [0.5, 1, 2], 1, 0.01);

runTest(Stats.dt, [0, 0, 1, 10], 0.389, 0.01);
runTest(Stats.dt, [-1, 0, 1, 20], 0.2368, 0.01);
runTest(Stats.dt, [1, 0, 1, 10], 0.238, 0.01);
runTest(Stats.dt, [0, 1, 2, 30], 0.3478786, 0.01);

runTest(Stats.dbeta, [0.5, 3, 3], 1.875, 0.01);
runTest(Stats.dbeta, [0.25, 3, 3], 1.05469, 0.01);
runTest(Stats.dbeta, [0.30, 30, 80], 7.25, 0.01);

runTest(Stats.dgamma, [0, 3, 1], 0.0, 0.01);
runTest(Stats.dgamma, [1, 3, 1], 0.1839, 0.01);
runTest(Stats.dgamma, [5, 3, 1], 0.084, 0.01);

runTest(Stats.dbinom, [1, 10, 0.5], 0.00976, 0.01);
runTest(Stats.dbinom, [4, 10, 0.25], 0.145998, 0.01);
runTest(Stats.dbinom, [10, 50, 0.1], 0.01518333, 0.01);

runTest(Stats.ddirichlet, [[0.2, 0.3, 0.5], [4, 5, 6]], 10.21621, 0.01);
runTest(Stats.ddirichlet, [[0.25, 0.25, 0.5], [10, 10, 10]], 5.258961, 0.01);
runTest(Stats.ddirichlet, [[0.25, 0.75], [1, 10]], 0.7508469, 0.01);

runTest(Stats.dcategorical, [1, [0.2, 0.2, 0.6]], 0.2, 0.0001);

runTest(Stats.dbernoulli, [0, 0.2], 0.8, 0.0001);
runTest(Stats.dbernoulli, [1, 0.2], 0.2, 0.0001);

runTest(Stats.rnorm, [1e5, 0, 1], 0, 0.1, (x) => Functions.mean(x));
runTest(Stats.rnorm, [1e5, 0, 1], 1, 0.1, (x) => Functions.sd(x));
runTest(Stats.rnorm, [1e5, 10, 3], 10, 0.1, (x) => Functions.mean(x));
runTest(Stats.rnorm, [1e5, -10, 0.5], 0.5, 0.1, (x) => Functions.sd(x));

runTest(Stats.rt, [1e5, 0, 1, 10], 1.11559, 0.01, (x) => Functions.sd(x));
runTest(Stats.rt, [1e5, -3, 1, 10], -3, 0.01, (x) => Functions.mean(x));

runTest(Stats.rbeta, [1e5, 3, 3], 0.5, 0.01, (x) => Functions.mean(x));
runTest(Stats.rbeta, [1e5, 3, 3], 0.18, 0.01, (x) => Functions.sd(x));
runTest(Stats.rbeta, [1e5, 30, 1], 0.96, 0.01, (x) => Functions.mean(x));
runTest(Stats.rbeta, [1e5, 30, 1], 0.031, 0.01, (x) => Functions.sd(x));

runTest(Stats.rgamma, [1e5, 3, 1], 3, 0.01, (x) => Functions.mean(x));
runTest(Stats.rgamma, [1e5, 3, 1], 1.73, 0.05, (x) => Functions.sd(x));

runTest(Stats.rdirichlet, [1e5, [10, 5]], 0.66, 0.01, (x) => {
    let y = new Array(x.length);

    for(let i = 0; i < x.length; i++){
        y[i] = x[i][0];
    }

    return Functions.mean(y);
});

runTest(Stats.rcategorical, [1e5, [0.2, 0.8]], 0.8, 0.01, function(x) {
    return x.reduce((a, b) => a + b) / 1e5;
} );

runTest(Stats.rbinom, [1e5, 1, 0.2], 0.2, 0.01, function(x){
    return x.reduce((a, b) => a + b) / 1e5;
});

runTest(Stats.rbernoulli, [1e5, 0.2], 0.2, 0.01, function(x){
    return x.reduce((a, b) => a + b) / 1e5;
});
