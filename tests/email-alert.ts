import { Selector, } from 'testcafe';

fixture `email-alert`
    .page `https://staging.jobgether.com/search-offers?sort=relevance`;

test('Aparece el CTA al agregar un keyword', async (t: TestController) => {
    const keyword = 'developer'
    await t
            .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')    
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', keyword)
        .wait(4000)

    const element = await Selector('.CTAAlert.animate-opacity.mt-4.mt-md-0.bg-top.show')
    //Existe el elemento
    await t
        .expect(element.exists).ok('El elemento CTA existe')

    //Existe el titulo
    await t
        .expect(await element.find('.CTAAlert__title').innerText).contains(keyword)

    //Existe el subtitulo
    await t
        .expect(await element.find('.CTAAlert__sub-title').innerText).contains('Get notified by email when new jobs become available!')

    
});  

test('Aparece el CTA al agregar un jobreference', async (t: TestController) => { 
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll div').withText('Administration').nth(5))
    await t
        .click(Selector('#searchable-list__content-scroll div').withText('Administration (All options)').nth(6))
        .wait(4000)
        
    const element = await Selector('.CTAAlert.animate-opacity.mt-4.mt-md-0.bg-top.show')
    //Existe el elemento
    await t
        .expect(element.exists).ok('El elemento CTA existe')

    //Existe el titulo
    await t
        .expect(await element.find('.CTAAlert__title').innerText).contains('Administration')

    //Existe el subtitulo
    await t
        .expect(await element.find('.CTAAlert__sub-title').innerText).contains('Get notified by email when new jobs become available!')
});

test('Aparece el CTA al agregar un keyword y un jobreference', async (t: TestController) => {
    const keyword = 'developer'
    await t
            .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')    
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', keyword)
        .wait(4000)

    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll div').withText('Administration').nth(5))
    await t
        .click(Selector('#searchable-list__content-scroll div').withText('Administration (All options)').nth(6))
        .wait(4000)

    const element = await Selector('.CTAAlert.animate-opacity.mt-4.mt-md-0.bg-top.show')
    //Existe el elemento
    await t
        .expect(element.exists).ok('El elemento CTA existe')

    //Existe el titulo
    await t
        .expect(await element.find('.CTAAlert__title').innerText).contains('Administration')

    await t
        .expect(await element.find('.CTAAlert__title').innerText).contains(keyword)

    //Existe el subtitulo
    await t
        .expect(await element.find('.CTAAlert__sub-title').innerText).contains('Get notified by email when new jobs become available!')   
});

test('Aparece el Modal al presionar el boton del CTA', async (t: TestController) => {
    const keyword = 'developer'
    await t
            .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')    
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', keyword)
        .wait(4000)

    const element = await Selector('.CTAAlert.animate-opacity.mt-4.mt-md-0.bg-top.show')
    //Existe el elemento
    await t
        .expect(element.exists).ok('El elemento CTA existe')

    await t
        .click(Selector('#opportunities [class^="btn btn-outline-dark fs-14 tracking_set_alert_clic"]'))
        
    Selector('#saveAlertModal p').withText('You will receive fresh job offers by email.')
    Selector('#saveAlertModal div div div').nth(1).find('div p')
    Selector('#saveAlertModal p').withText('You will be able to manage this alert at any time')
    Selector('div').withText('SAVE').nth(13)
    Selector('.input-group.mb-3 [name="email"]')

});  