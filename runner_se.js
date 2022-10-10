(async () => {
    const createTestCafe        = require('testcafe');
    const selfSignedSertificate = require('openssl-self-signed-certificate');

    const sslOptions = {
        key:  selfSignedSertificate.key,
        cert: selfSignedSertificate.cert,
    };

    const testCafeOptions = {
        hostname: 'localhost',
        sslOptions,
    };

    const testcafe = await createTestCafe(testCafeOptions);

    await testcafe.createRunner()
        .src('./tests')
        // Browsers restrict self-signed certificate usage unless you
        // explicitly set a flag specific to each browser.
        // For Chrome, this is '--allow-insecure-localhost'.
        .browsers('chrome:headless --config-file')
        .reporter('html', 'reporter/all_test.html')
        .run();

    await testcafe.close();
})();