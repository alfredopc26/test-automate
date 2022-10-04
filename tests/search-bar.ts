import { Selector, } from 'testcafe';

fixture `Search Bar - Home page`
    .page `https://jobgether.com`;

test('Puedo iniciar una búsqueda sin seleccionar ninguna opción', async (t: TestController) => {
    await t
        .click(Selector('#search-bar div div').nth(11).find('button svg'))

    await t
        .click('#search-engine__filters')

    await t.expect(await Selector('#search-engine__filters').exists).ok('Estoy en la pagina de search-engine');
    await t.expect(await Selector('.offer-card-container').count).eql(18, 'Es igual a 18');
});
    
test('Puedo buscar un cargo de referencia a partir de un término', async (t: TestController) => {
    const array_search = ['Deve', 'Sale', 'Prod', 'Mark']

    for await(let search of array_search){
        await t
            .click(Selector('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]'))
        await t    
            .typeText('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]', search, { replace: true})
            .wait(3000)
        await t
            .click(Selector('#pv_id_1_list div').withText('- Job -'))            
        await t
            .click(Selector('#pv_id_1_list li').withText('- Category -'))

        const options = await Selector('#pv_id_1_list .p-autocomplete-item')
        const countOptions = await options.count
        await t.expect(countOptions).gt(0)
        await t.expect(await options.nth(0).innerText).contains(search)

    }

});

test('Puedo buscar una localización a partir de un término', async (t: TestController) => {

    const array_search = ['Franc', 'Colom', 'Belgiu', 'Madr']

    for await(let search of array_search){
        await t
            .click(Selector('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]').nth(1))
        await t
            .typeText(Selector('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]').nth(1), search)
            .wait(3000)

        const options = await Selector('#pv_id_2_list .p-autocomplete-item')
        const countOptions = await options.count
        await t.expect(countOptions).gt(0)
        await t.expect(await options.nth(0).innerText).contains(search)
        await t
        .click('#hero-section')
    }

});

test('Puedo seleccionar una localizacion dentro de la lista', async (t: TestController) => {
    const array_search = ['United', 'Lond', 'Carta', 'Bogot']

    for await(let search of array_search){
        await t
            .click(Selector('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]').nth(1))
        await t
            .typeText(Selector('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]').nth(1), search, { replace: true })
            .wait(3000)
        await t
        .click(Selector('#pv_id_2_list [data-index="0"]'))
    }
});

test('Puedo seleccionar el tipo de trabajo Full remote', async (t: TestController) => {
    await t
        .click('#full-remote')

    const full_remote = await Selector('#full-remote')
    const flex_hours = await Selector('#flexible-hours')

    await t
        .expect(full_remote.checked).ok()
    await t
        .expect(flex_hours.checked).notOk()
    
});

test('Puedo seleccionar el tipo de trabajo Horario flexible', async (t: TestController) => {
    await t
        .click('#flexible-hours')

    const full_remote = await Selector('#full-remote')
    const flex_hours = await Selector('#flexible-hours')

    await t
        .expect(flex_hours.checked).ok()
    await t
        .expect(full_remote.checked).notOk()
    
   
    
});

test('Puedo seleccionar ambos tipos de trabajo remoto', async (t: TestController) => {
    await t
        .click('#flexible-hours')

    await t
        .click('#full-remote')

    const full_remote = await Selector('#full-remote')
    const flex_hours = await Selector('#flexible-hours')

    await t
        .expect(flex_hours.checked).ok()
    await t
        .expect(full_remote.checked).ok()
    
});

test('Existen elementos del search Bar', async (t: TestController) => {
    await t
        .click('#search-bar')
        .wait(1000)
        .expect(await Selector('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]').exists).ok()
        .expect(await Selector('#search-bar [class^="p-autocomplete-input p-inputtext p-component form-"]').nth(1).exists).ok()
        .expect(await Selector('#search-bar div').withText('Full-remote').nth(4).exists).ok()
        .expect(await Selector('#search-bar div').withText('Flexible hours').nth(4).exists).ok()
        .expect(await Selector('#search-bar [class^="btn text-white bg-green-app w-100 px-2 py-2 search"]').exists).ok()    
});

