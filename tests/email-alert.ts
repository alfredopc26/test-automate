import { Selector, } from 'testcafe';

fixture `email-alert`
    .page `https://jobgether.com/search-offers?sort=relevance`;

test('El CTA funciona al escribir un keyword y contiene los elementos correctos', async (t: TestController) => {
    const keyword = 'developer'
    await t
        .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')  
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', keyword)
        .wait(3000)
    const element = await Selector('.CTAAlert__container.flex-md-row.align-items-center')
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

test('El usuario selecciona solo el cargo de referencia y este se muestra en el card alert setup', async (t: TestController) => {
    await t
        .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')    
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT, Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
    await t
        .click(Selector('#opportunities div').withText('Développeur Backend').nth(16))
    await t
        Selector('#opportunities div').withText('Développeur Backend').nth(5)
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
});

test('El usuario escribe un keyword y selecciona un cargo de referencia y ambos se muestran en el CAS.', async (t: TestController) => {
    await t
        .click(Selector('#search-engine__filters div').withText('Mot-clé').nth(1))    
    await t
        .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', 'Developer')
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT, Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll div div').nth(2).find('div div div li').nth(6).find('div').nth(1).find('span svg path'))
    await t
        .click(Selector('#opportunities div').withText('Développeur BackendDeveloper').nth(4))
    await t
        Selector('#opportunities span').withText('Développeur Backend')
        Selector('#opportunities span').withText('Developer')
    await t

    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
    await t
        .click('#saveAlertModal div div div button svg path')
});

test('El usuario escribe un keyword y tiene seleccionado un tipo de remoto y ambos se muestran en el CAS.', async (t: TestController) => {
    await t
        .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', 'Developer')
    await t
        .click('#full_remote')
    await t
        .click(Selector('#opportunities div').withText('Developer100% télétravail').nth(4))
    await t
        Selector('#opportunities span').withText('Developer')
        Selector('#opportunities span').withText('100% télétravail')
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
});

test('El usuario selecciona un cargo de referencia y tiene un tipo de remoto y ambos se muestran en el CAS.', async (t: TestController) => {
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')  
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT, Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
    await t
        .click('#full_remote')
    await t
        Selector('#opportunities span').withText('Développeur Backend')
        Selector('#opportunities span').withText('100% télétravail')
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
});

test('El usuario escribe un keyword, selecciona un cargo de referencia y tiene un tipo de remoto y todo se muestra en el CAS.', async (t: TestController) => {
    await t
        .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', 'Developer')
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT, Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
    await t
        .click('#full_remote')
    await t
        .click(Selector('#opportunities div').withText('Développeur BackendDeveloper100% télétravail').nth(4))
    await t
        Selector('#opportunities span').withText('Développeur Backend')
        Selector('#opportunities span').withText('Developer')
        Selector('#opportunities span').withText('100% télétravail')
    await t
        .click(Selector('#opportunities div').withText('Développeur BackendDeveloper100% télétravail').nth(4))
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
    await t
        .click('#saveAlertModal .svg-inline--fa.fa-times.fa-w-10')
});

test('El usuario escribe un keyword y tiene una ubicación seleccionada y ambos se muestran en el CAS', async (t: TestController) => {
    await t
        .click('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]')
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'France')
        .click(Selector('#pv_id_1_list li').withText('France'))
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', 'Developer')
    await t
        .click(Selector('#opportunities div').withText('DeveloperFrance').nth(4))
    await t
        Selector('#opportunities div').withText('DeveloperFrance').nth(5)
    await t
        Selector('#opportunities span').withText('Developer')
        Selector('#opportunities span').withText('France').nth(1)
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
});

test('El usuario selecciona un cargo de referencia y tiene una ubicacion seleccionada y ambos se muestran en el CAS.', async (t: TestController) => {
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-angle-right.fa-w-6').nth(2))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'France')
        .click(Selector('#pv_id_1_list li').withText('France'))
    await t
        .click(Selector('#opportunities p').withText('Développeur BackendFrance'))
    await t
        .click(Selector('#opportunities div').withText('Développeur BackendFrance').nth(4))
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
    await t
        Selector('#opportunities span').withText('Développeur Backend')
        Selector('#opportunities span').withText('France').nth(1)
});

test('El usuario escribe un keyword, tiene una ubicación seleccionada y tiene un tipo de remoto seleccionado y todos se muestran en el CAS', async (t: TestController) => {
    await t
        .click('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]')
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', 'Developer')
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'France')
        .click(Selector('#pv_id_1_list li').withText('France'))
    await t
        .click('#full_remote')
    await t
        .click(Selector('#opportunities p').withText('Developer100% télétravailFrance'))
    await t
        Selector('#opportunities span').withText('Developer')
        Selector('#opportunities span').withText('100% télétravail')
        Selector('#opportunities span').withText('France').nth(1)
    await t
        .click(Selector('#opportunities div').withText('Developer100% télétravailFrance').nth(4))
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
    
});

test('El usuario tiene seleccionado un cargo de referencia, tiene una ubicacion seleccionada y tiene un tipo de remoto seleccionado y todos se muestran en el CAS', async (t: TestController) => {
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT, Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
    await t
        .click('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]')
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'France')
        .click(Selector('#pv_id_1_list li').withText('France'))
    await t
        .click('#full_remote')
    await t
        .click(Selector('#opportunities p').withText('Développeur Backend100% télétravailFrance'))
    await t
        Selector('#opportunities span').withText('Développeur Backend')
        Selector('#opportunities span').withText('100% télétravail')
        Selector('#opportunities span').withText('France').nth(1)
    await t
        .click(Selector('#opportunities div').withText('Développeur Backend100% télétravailFrance').nth(4))
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
    
});

test('El usuario tiene seleccionado un cargo de referencia, escribe un keyword, tiene una ubicación seleccionada y tiene un tipo de remoto seleccionado y todos se muestran en el CAS.', async (t: TestController) => {
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT, Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', 'Developer')
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'France')
        .click(Selector('#pv_id_1_list li').withText('France'))
    await t
        .click('#full_remote')
    await t
        .click(Selector('#opportunities div').withText('Développeur BackendDeveloper100% télétravailFrance').nth(4))
    await t
        Selector('#opportunities span').withText('Développeur Backend')
        Selector('#opportunities span').withText('Developer')
        Selector('#opportunities span').withText('100% télétravail')
        Selector('#opportunities span').withText('France').nth(1)
    await t
        .click(Selector('#opportunities div').withText('Développeur BackendDeveloper100% télétravailFrance').nth(4))
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
    
});

test('El usuario tiene dos o mas ubicaciones, tiene ambos tipos de remoto seleccionados y escribe un keyword o selecciona un cargo o tiene ambos seleccionado', async (t: TestController) => {
    await t
        .click('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]')
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'France')
        .click(Selector('#pv_id_1_list li').withText('France'))
    await t
        .typeText('#search-engine__filters [class^="p-autocomplete-input p-inputtext p-component form-"]', 'Colorad')
    await t
        .click(Selector('#pv_id_1_list li').withText('Colorado États-Unis'))
    await t
        .click('#full_remote')
    await t
        .click('#hybrid')
    await t
        .typeText('#search-engine__filters [class^="p-inputtext p-component w-100 keyword-input w-100"]', 'Developer')
    await t
        .click('#search-engine__filters .form-control.searchable-list__input.mb-1')
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Data, IT, Product'))
    await t
        .click(Selector('#searchable-list__content-scroll li').withText('Développement'))
    await t
        .click(Selector('#searchable-list__content-scroll .svg-inline--fa.fa-square.fa-w-14').nth(6))
    await t
        .click(Selector('#opportunities p').withText('Recevez les nouvelles offres disponibles.'))
    await t
        Selector('#opportunities span').withText('Développeur Backend')
        Selector('#opportunities span').withText('Developer')
        Selector('#opportunities span').withText('100% télétravail, Hybride')
        Selector('#opportunities span').withText('France, Colorado')
    await t
        .click(Selector('#opportunities p').withText('Recevez les nouvelles offres disponibles.'))
    await t
        .click(Selector('#opportunities button').withText('CRÉER UNE ALERTE'))
});