import { Selector } from 'testcafe';

fixture `Offert create`
    .page `https://company-admin-dev.jobgether.com`;

test('Ingresar al admin-company', async (t: TestController) => {
    await t
        .click('#mui-1')    
        .typeText('#mui-1', 'daniel.bohorquez@')
    await t
        .typeText('#mui-1', 'jobgether.com')
        .typeText('#mui-2', 'Camp79918')
        .click(Selector('#__next div div').nth(2).find('div form'))
        .click(Selector('#__next button').withText('SIGN IN'))
        .wait(5000)
    
    
    const ingresar = Selector('#__next span').withText('Dashboard')
    await t
        .expect(ingresar.exists).ok()
});

test('Company', async (t: TestController) => {
        await t
        .click('#mui-1')    
        .typeText('#mui-1', 'daniel.bohorquez@')
    await t
        .typeText('#mui-1', 'jobgether.com')
        .typeText('#mui-2', 'Camp79918')
        .click(Selector('#__next div div').nth(2).find('div form'))
        .click(Selector('#__next button').withText('SIGN IN'))
        .wait(5000)
    
    const ingresar = Selector('#__next span').withText('Dashboard')

    await t
        .expect(ingresar.exists).ok()
    await t
        .click(Selector('#__next span').withText('Company'))
    
    const companyName = Selector('#mui-2')
    const Website = Selector('#mui-3')
    const contactEmail = Selector('#mui-4')
    const contactName = Selector('#mui-5')
    const Number = Selector('#mui-6')
    const Logo = Selector('#__next div').withText('Add a logo by dragging and dropping an image file')
    const Banner = Selector('#__next div').withText('Add a banner by dragging & dropping an image file')
    const flexScore = Selector('#__next div').withText('Your flexibility score')

    await t
        .expect(companyName.exists).ok()
        .expect(Website.exists).ok()
        .expect(contactEmail.exists).ok()
        .expect(contactName.exists).ok()
        .expect(Number.exists).ok()
        .expect(Banner.exists).ok()
        .expect(flexScore.exists).ok()
    // await t
    //     .click(Selector('#mui-4'))
    //     .typeText('#mui-4','alexandre.hernandez@jobgether.com')
    //     .click(Selector('#mui-5'))
    //     .typeText('#mui-5','Alexandre Hernandez')
    //     .click(Selector('#mui-6'))
    //     .typeText('#mui-6','+34659942273')
    // await t
    //     .click('#mui-6')
    //     .click(Selector('#__next button').withText('SAVE CHANGES'))
});