(async () => {
    const createTestCafe        = require('testcafe');
    const selfSignedSertificate = require('openssl-self-signed-certificate');

    const sslOptions = {
        key:  selfSignedSertificate.key,
        cert: selfSignedSertificate.cert,
    };

    const testCafeOptions = {
        hostname: 'localhost',
        port1:    1337,
        port2:    1338,
        sslOptions,
    };

    const testcafe = await createTestCafe(testCafeOptions);

    await testcafe.createRunner()
        .src('./tests')
        // Browsers restrict self-signed certificate usage unless you
        // explicitly set a flag specific to each browser.
        // For Chrome, this is '--allow-insecure-localhost'.
        .browsers('chrome --autoplay-policy=no-user-gesture-required --allow-insecure-localhost --ignore-certificate-errors')
        .run();

    await testcafe.close();
})();