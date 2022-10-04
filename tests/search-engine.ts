import { Selector, } from 'testcafe';

fixture `search-engine`
    .page `https://jobgether.com/search-offers?sort=relevance&page=1`;


test('Search offers by Full remote filter', async (t: TestController) => {
    await t
        .click('#full_remote') 
        .wait(4000)
    const offers = await Selector('.card.match-card.shadow-sm.w-100.clickable.p-0.mb-2.new-opportunity.rounded-12')
    const countOffer = await offers.count
    await t.expect(countOffer).gt(0)

    for(let i = 0; i < countOffer; i++) {
        const elementSelector = offers.nth(i);
        await t.expect(await elementSelector.find('span').withText('Full remote').exists).ok()
    }
    await t
        .click('#full_remote')
});

test('Search offers by Hybrid filter', async (t: TestController) => {
    await t
        .click('#hybrid') 
        .wait(4000)
    const offers = await Selector('.card.match-card.shadow-sm.w-100.clickable.p-0.mb-2.new-opportunity.rounded-12')
    const countOffer = await offers.count
    await t.expect(countOffer).gt(0)

    for(let i = 0; i < countOffer; i++) {
        const elementSelector = offers.nth(i);
        await t.expect(await elementSelector.find('span').withText('Hybrid').exists).ok()
    }
});

test('Search offers by location filter - NA', async (t: TestController) => {

        await t
            .click('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]')

        await t
            .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'France')
            

        const locationSelect = await Selector('#pv_id_1_list li').nth(0).innerText
        
        await t
            .click(Selector('#pv_id_1_list .p-autocomplete-item').nth(0))
            .wait(3000)

        await t
            .expect(await Selector('[class^="badge clickable rounded-pill fs-14 me-2 py-2 mt-2"]').innerText).eql(locationSelect)

        const offers = await Selector('.card.match-card.shadow-sm.w-100.clickable.p-0.mb-2.new-opportunity.rounded-12')
        const countOffer = await offers.count
        await t.expect(countOffer).gt(0)
});

test('Search offers by Nomad Digital filter', async (t: TestController) => {
    await t
        .click('#check_top')

    const cb_fullremote = await Selector('#full_remote')
    const cb_hybrid = await Selector('#hybrid')
    await t
        .expect(cb_fullremote.checked).ok()
        .expect(cb_hybrid.checked).notOk()
        .expect(cb_hybrid.withAttribute('disabled')).ok()
        .expect(Selector('#search-engine__filters span').withText('Worldwide').exists).ok()
});

test('Keyword filter - NA', async (t: TestController) => {  

    const array_search = ['Developer', 'Marketing', 'Sales']

    for await(let search of array_search){
        await t
            .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')    
        await t
            .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', search)
            .wait(4000)

        const offers = await Selector('.card.match-card.shadow-sm.w-100.clickable.p-0.mb-2.new-opportunity.rounded-12')
        const countOffer = await offers.count
        await t.expect(countOffer).gt(0)

        for(let i = 0; i < countOffer; i++) {
            const elementSelector = offers.nth(i);
            await t.expect(await elementSelector.find('[class^="mb-0 fs-20 d-flex flex-column flex-md-row align-it"] span').innerText).contains(search)
        }
    }
})

test('Jobreference Filter', async (t: TestController) => {
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')    
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT & Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Development'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(10))
        .expect(Selector('#search-engine__filters span').withText('Frontend Dev...').nth(1).exists).ok()

        const Jobreference = Selector('#opportunities span').withText('Frontend Developer')

        await t.expect(Jobreference.exists).ok()

});

test('Industries Filter', async (t: TestController) => {
    await t
        .click(Selector('#search-engine__filters p').withText('Industry'))    
        .click(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(2))
        .click(Selector('#searchable-list__content-scroll li').withText('Advisory'))
        .click('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14')
    await t
        .expect(Selector('#search-engine__filters span').withText('Management C...').exists).ok()
    await t
        .click(Selector('#search-engine__filters .svg-inline--fa.fa-times.fa-w-11.ms-1'))
        .click(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(2))
        .click('#searchable-list__content-scroll .svg-inline--fa.fa-angle-left.fa-w-6')
        .click(Selector('#searchable-list__content-scroll li').withText('Technology & Internet'))
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(5))
    await t
        .expect(Selector('#search-engine__filters span').withText('Cybersecurit...').exists).ok()
    await t
        .click(Selector('#search-engine__filters .svg-inline--fa.fa-times.fa-w-11.ms-1'))
});

test('Company Filter_1', async (t: TestController) => {
    await t
        .click(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(3))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('GitLab'))
        .wait(3000)
        .click(Selector('#searchable-list__content-scroll li').withText('PandaDoc'))
        .wait(3000)
    await t
        .click(Selector('#search-engine__filters .svg-inline--fa.fa-times.fa-w-11.ms-1').nth(1))
        .click(Selector('#search-engine__filters .svg-inline--fa.fa-times.fa-w-11.ms-1'))
    await t
        .click(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(3))
    await t
        .typeText(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(3), 'Job')
    await t
        .click(Selector('#search-engine__filters li').withText('Jobgether'))
        .wait(3000)
        .expect(Selector('#match-offer-card-62aa68911ac6bab6e1b73c71 p').withText('Jobgether').exists).ok()
});

test('Company Filter', async (t: TestController) => {
    await t
        .click(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(3))    
    await t
        .typeText(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(3), 'Job')
    await t
        .click(Selector('#search-engine__filters div').nth(5).find('div').nth(61).find('div div ul div div').nth(2).find('div div div li').nth(2).find('span svg path'))

    const Company = Selector('p').withText('Jobgether')

    await t.expect(Company.exists).ok()
});

test('Top Flex companies', async (t: TestController) => {
    await t
        .click('#check_top_company')
        .wait(3000)
        .click('#check_top_company')
    await t
        .click('#check_top_company')
    
    .wait(3000)

    let offers = Selector('bg-blue-app-20 me-2 ms-3 px-2 py-1 rounded-8 fs-14 fw-500')
    let topFlex = await offers.count

    for(let i = 0; i < topFlex; i++) {
        const elementSelector = offers.nth(i);
        await t.expect(await elementSelector.find('span').withText('Top Flex').checked).ok()
    }
});

test('Contract Filter', async (t: TestController) => {
    await t
        .click('#filter-contrat .svg-inline--fa.fa-angle-down.fa-w-10')
    await t
        .click(Selector('#filter-contrat span').withText('Fixed term'))
        .wait(3000)
    
    const Contract_1 = Selector('span').withText('Fixed-term contract')

    await t
        .expect(Contract_1.exists).ok()
        .wait(1000)
        .click(Selector('#filter-contrat .svg-inline--fa.fa-times.fa-w-11.ms-1'))

    await t
        .click('#filter-contrat .svg-inline--fa.fa-angle-down.fa-w-10')
    await t
        .click(Selector('#filter-contrat span').withText('Permanent'))
        .wait(3000)
    
    const Contract_2 = Selector('span').withText('Permanent contract')

    await t
        .expect(Contract_2.exists).ok()
        .wait(1000)
        .click(Selector('#filter-contrat .svg-inline--fa.fa-times.fa-w-11.ms-1'))
    await t
        .click('#filter-contrat .svg-inline--fa.fa-angle-down.fa-w-10')
    await t
        .click(Selector('#filter-contrat span').withText('Freelance'))
        .wait(3000)
    
    const Contract_3 = Selector('span').withText('Freelance')

    await t
        .expect(Contract_3.exists).ok()
        .wait(1000)
        .click(Selector('#filter-contrat .svg-inline--fa.fa-times.fa-w-11.ms-1'))
    await t
        .click('#filter-contrat .svg-inline--fa.fa-angle-down.fa-w-10')
    await t
        .click(Selector('#filter-contrat span').withText('Part time'))
        .wait(3000)

    const Contract_4 = Selector('span').withText('Part-time')

    await t
        .expect(Contract_4.exists).ok()
        .wait(1000)
        .click(Selector('#filter-contrat .svg-inline--fa.fa-times.fa-w-11.ms-1'))
});

test('Experience Filter', async (t: TestController) => { 
    await t
        .click(Selector('#search-engine__filters div').withText('Level (all)').nth(3))
    await t
        .click(Selector('#search-engine__filters div').withText('Internships').nth(4))
        .wait(3000)
        .expect(Selector('#search-engine__filters span').withText('Internships').nth(1).exists).ok()
        .click(Selector('#search-engine__filters .svg-inline--fa.fa-times.fa-w-11.ms-1'))
});

test('Language filter', async (t: TestController) => {
    await t
        .click(Selector('#search-engine__filters .form-control.searchable-list__input.mb-1').nth(4))
    await t
        .click('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14')
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(1))
        .wait(3000)
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(4))
        .wait(3000)
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
        .wait(3000)
        .click(Selector('#search-engine__filters div').nth(5).find('div').nth(150).find('p').nth(1).find('span svg path'))
        .click(Selector('#search-engine__filters div').nth(5).find('div').nth(150).find('p').nth(1).find('span svg path'))
        .click(Selector('#search-engine__filters div').nth(5).find('div').nth(150).find('p').nth(1).find('span svg path'))
        .click(Selector('#search-engine__filters div').nth(5).find('div').nth(150).find('p').nth(1).find('span svg path'))
});

test('Delete filter', async (t: TestController) => {
    await t
        .click('#full_remote')
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'Par')
        .wait(2000)
        .click(Selector('#pv_id_1_list li').nth(0))
    await t
        .click(Selector('#search-engine__filters span').withText('Delete'))
        .click(Selector('#search-engine__filters div').withText('Filters'))
});